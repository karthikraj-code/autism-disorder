
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Loader2 } from "lucide-react";
import { toast } from "sonner";

const UserButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Get a consistent color for each user based on their email or ID
  const getUserColor = (user: any): string => {
    if (!user) return "#9b87f5"; // Default purple if no user
    
    // Use the user's email or ID to generate a consistent color
    const str = user.email || user.id || "";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Choose from a set of vibrant, accessible colors
    const colors = ["#9b87f5", "#8B5CF6", "#0EA5E9", "#F97316", "#10B981"];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
      toast.success("You have been signed out");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="sr-only">Loading</span>
      </Button>
    );
  }

  if (!user) {
    // Use Button component with better text contrast
    return (
      <div 
        onClick={() => navigate("/auth")}
        className="border border-gray-300 rounded-md py-2 px-4 flex items-center gap-2 cursor-pointer bg-white text-gray-800 hover:bg-gray-100"
      >
        <User size={16} className="text-gray-800" />
        <p className="m-0 font-semibold text-gray-800">Sign In</p>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0" aria-label="User menu">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.user_metadata?.avatar_url} alt="User avatar" />
            <AvatarFallback 
              style={{ backgroundColor: getUserColor(user) }} 
              className="text-white"
            >
              {getUserInitials(user)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getUserDisplayName(user)}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Helper functions
const getUserInitials = (user: any): string => {
  const name = getUserDisplayName(user);
  return name.split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

const getUserDisplayName = (user: any): string => {
  if (user.user_metadata?.full_name) return user.user_metadata.full_name;
  if (user.user_metadata?.name) return user.user_metadata.name;
  return user.email?.split("@")[0] || "User";
};

export default UserButton;
