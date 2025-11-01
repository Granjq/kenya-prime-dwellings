import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  onViewProfile: () => void;
  collapsed?: boolean;
}

export function ProfileCard({ onViewProfile, collapsed = false }: ProfileCardProps) {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-3 mx-2 mb-2 rounded-lg backdrop-blur-xl bg-card/40 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/20">
        <div className="flex flex-col items-center gap-2">
          {!collapsed && (
            <p className="text-xs text-muted-foreground text-center">Sign in to continue</p>
          )}
          <Button 
            asChild 
            size={collapsed ? "icon" : "sm"}
            className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          >
            <Link to="/auth">
              {collapsed ? "→" : "Sign In"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  if (collapsed) {
    return (
      <div className="p-2 mx-2 mb-2 rounded-lg backdrop-blur-xl bg-card/40 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/20 group">
        <button
          onClick={onViewProfile}
          className="w-full flex items-center justify-center"
        >
          <Avatar className="h-10 w-10 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300 group-hover:animate-pulse-glow">
            <AvatarImage src="" alt={user?.name} />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 mx-2 mb-2 rounded-lg backdrop-blur-xl bg-card/40 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 group">
      <div className="flex items-center gap-3">
        <button onClick={onViewProfile} className="flex-shrink-0">
          <Avatar className="h-12 w-12 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300 group-hover:animate-pulse-glow">
            <AvatarImage src="" alt={user?.name} />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>

        <button 
          onClick={onViewProfile}
          className="flex-1 min-w-0 text-left"
        >
          <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-primary/70 truncate">
            {user?.email || "user@example.com"}
          </p>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 backdrop-blur-xl bg-card/95 border-primary/20"
          >
            <DropdownMenuItem 
              onClick={onViewProfile}
              className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onViewProfile}
              className="cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
            >
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={logout}
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
