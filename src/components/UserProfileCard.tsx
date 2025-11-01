import { useState } from "react";
import { User, Settings, LogOut, Heart, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { MoreVertical } from "lucide-react";

interface UserProfileCardProps {
  className?: string;
}

export function UserProfileCard({ className }: UserProfileCardProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/20 hover:bg-sidebar-accent/50 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-glow)/0.3)] ${className}`}
        onClick={() => navigate("/auth")}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30">
          <User className="w-5 h-5 text-primary" />
        </div>
        {!isCollapsed && (
          <span className="text-sm font-medium text-sidebar-foreground">Sign in to continue</span>
        )}
      </Button>
    );
  }

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full h-12 p-0 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/20 hover:bg-sidebar-accent/50 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-glow)/0.3)] animate-pulse-glow"
                >
                  <Avatar className="w-10 h-10 border-2 border-primary/50">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DrawerTrigger>
              <ProfileDrawerContent user={user} onLogout={logout} />
            </Drawer>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-popover border-primary/20">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">Buyer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div
        className={`group relative rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/20 p-3 transition-all duration-300 hover:bg-sidebar-accent/50 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(var(--primary-glow)/0.3)] hover:-translate-y-0.5 ${className}`}
      >
        <DrawerTrigger asChild>
          <button className="w-full flex items-center gap-3 text-left">
            <Avatar className="w-10 h-10 border-2 border-primary/50 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(var(--primary-glow)/0.5)] animate-pulse-glow">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-primary/80 font-medium">Buyer</p>
            </div>
          </button>
        </DrawerTrigger>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4 text-sidebar-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-primary/20">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDrawerOpen(true)}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ProfileDrawerContent user={user} onLogout={logout} />
    </Drawer>
  );
}

function ProfileDrawerContent({
  user,
  onLogout,
}: {
  user: { name: string; email: string };
  onLogout: () => void;
}) {
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DrawerContent className="bg-background/95 backdrop-blur-xl border-primary/20">
      <DrawerHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-[0_0_20px_rgba(var(--primary-glow)/0.4)]">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-2xl font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
        <DrawerTitle className="text-2xl">{user.name}</DrawerTitle>
        <DrawerDescription className="text-primary/80 font-medium">Buyer</DrawerDescription>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
      </DrawerHeader>

      <div className="px-6 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/10">
            <Heart className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
          <div className="p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/10">
            <MessageSquare className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
          <div className="p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm border border-primary/10">
            <User className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Visits</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <DrawerFooter>
        <Button
          variant="destructive"
          onClick={onLogout}
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
