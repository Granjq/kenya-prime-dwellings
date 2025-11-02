import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Bell,
  Moon,
  Sun
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const handleNotifications = () => {
    toast.info("No new notifications");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-background/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              className="relative hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
              </span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}