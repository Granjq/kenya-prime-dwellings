import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreVertical } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

interface ProfileCardProps {
  onOpenProfile: () => void;
}

export function ProfileCard({ onOpenProfile }: ProfileCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (!isAuthenticated) {
    return (
      <Link to="/auth">
        <div className="group relative rounded-lg bg-background/40 backdrop-blur-xl border border-border/50 p-3 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <span className="text-xs font-semibold text-primary-foreground">SI</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm font-medium">Sign in to continue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <span className="text-xs font-semibold text-primary-foreground">SI</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    Sign in to continue
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Access your saved listings
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "JD";

  const userRole = "Buyer"; // This would come from user data in a real app

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onOpenProfile}
              className="group relative rounded-lg bg-background/40 backdrop-blur-xl border border-border/50 p-2 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 w-full"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src="" alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-hero text-primary-foreground font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex flex-col gap-1">
            <p className="font-semibold">{user?.name || "John Doe"}</p>
            <p className="text-xs text-primary">{userRole}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="group relative rounded-lg bg-background/40 backdrop-blur-xl border border-border/50 p-3 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-3">
        <Avatar className="h-11 w-11 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105">
          <AvatarImage src="" alt={user?.name || "User"} />
          <AvatarFallback className="bg-gradient-hero text-primary-foreground font-semibold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {user?.name || "John Doe"}
          </p>
          <p className="text-xs text-primary/80 truncate">
            {userRole}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenProfile}
          className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
