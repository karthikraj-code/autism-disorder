
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  refreshSession: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check the URL for OAuth response handling
    const handleOAuthResponse = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const hasAuthParams = 
        hashParams.get('access_token') || 
        hashParams.get('error_description');
      
      if (hasAuthParams) {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error processing OAuth response", error);
        } else if (data.session) {
          console.log("OAuth session retrieved successfully");
        }
      }
    };
    
    // Process any OAuth responses in the URL
    handleOAuthResponse();
    
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
        
        // Show toast notifications for auth events
        switch (event) {
          case 'SIGNED_IN':
            toast.success("Signed in successfully!");
            break;
          case 'SIGNED_OUT':
            toast.info("Signed out successfully");
            break;
          case 'USER_UPDATED':
            toast.success("User profile updated");
            break;
          case 'PASSWORD_RECOVERY':
            toast.info("Password recovery email sent");
            break;
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error("Error signing out");
      console.error("Sign out error:", error);
    }
  };
  
  const refreshSession = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      console.error("Session refresh error:", error);
      toast.error("Failed to refresh session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
