
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, cleanupAuthState } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navigate, useLocation } from "react-router-dom";

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
        console.log('Auth state change event:', event);
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
      // Clean up auth state first
      cleanupAuthState();
      // Then sign out
      await supabase.auth.signOut({ scope: 'global' });
      // Force page reload for a clean state
      window.location.href = '/auth';
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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};
