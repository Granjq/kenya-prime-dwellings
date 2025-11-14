import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell,
  Moon,
  Sun,
  Home,
  User
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const handleNotifications = () => {
    toast.info("No new notifications");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const userName = user?.name || "Guest";
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <header 
        className={cn(
          "w-full bg-background/60 backdrop-blur-xl border-b border-border/50 fixed top-10 z-[60] transition-all duration-300",
          "glass-card"
        )}
        style={{
          boxShadow: "0 4px 6px -1px hsl(0 0% 0% / 0.1), 0 2px 4px -2px hsl(0 0% 0% / 0.1), inset 0 0 20px hsl(var(--primary) / 0.05), 0 0 20px hsl(var(--primary) / 0.1)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
              <SidebarTrigger 
                data-sidebar="trigger" 
                className="hover:bg-primary/10 hover:text-primary transition-colors flex-shrink-0" 
              />
              
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 flex-shrink-0">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden sm:block min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                    PropertyHub
                  </h1>
                  <p className="text-xs text-muted-foreground whitespace-nowrap truncate">
                    Find Your Dream Property
                  </p>
                </div>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Notifications */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNotifications}
                  className="relative hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9 flex-shrink-0"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                  </span>
                </Button>
              )}

              {/* Profile/Avatar */}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsProfileDrawerOpen(true)}
                  className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9 flex-shrink-0 relative"
                >
                  <div className="absolute inset-0 bg-gradient-hero rounded-full opacity-0 hover:opacity-20 transition-opacity"></div>
                  <Avatar className="relative w-8 h-8 border-2 border-primary/30 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                    <AvatarFallback className="bg-gradient-hero text-white font-semibold text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast.info("Please sign in to access your profile")}
                  className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9 flex-shrink-0"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              )}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9 flex-shrink-0"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Drawer */}
      <ProfileDrawer 
        open={isProfileDrawerOpen} 
        onOpenChange={setIsProfileDrawerOpen} 
      />
    </>
  );
}