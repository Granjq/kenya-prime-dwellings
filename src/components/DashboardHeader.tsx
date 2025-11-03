import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Bell,
  Moon,
  Sun,
  Heart,
  Phone,
  ChevronDown,
  Globe,
  Home
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleNotifications = () => {
    toast.info("No new notifications");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-background/95 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-40 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors flex-shrink-0" />
            
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  PropertyHub
                </h1>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  Find Your Dream Property
                </p>
              </div>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Phone */}
            <a
              href="tel:+254700000000"
              className="hidden lg:flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors px-2"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">+254 700 000 000</span>
            </a>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <span className="mr-1">{selectedLanguage.flag}</span>
                  <Globe className="w-4 h-4 lg:hidden" />
                  <span className="hidden lg:inline mr-1 whitespace-nowrap">{selectedLanguage.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-primary/20 z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang)}
                    className="cursor-pointer hover:bg-primary/10"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Notifications */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotifications}
                className="relative hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                </span>
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9"
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
  );
}