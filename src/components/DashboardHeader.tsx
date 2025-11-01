import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  MapPin, 
  Users, 
  TrendingUp, 
  Menu,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useState } from "react";

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleNotifications = () => {
    toast.info("No new notifications");
  };

  const handleSettings = () => {
    toast.info("Settings coming soon!");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-background/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu and Logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-button">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-foreground">KenyaHomes</h1>
                      <p className="text-xs text-muted-foreground">Find Your Dream Property</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                      <Home className="w-4 h-4 mr-3" />
                      Properties
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                      <MapPin className="w-4 h-4 mr-3" />
                      Locations
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                      <Users className="w-4 h-4 mr-3" />
                      Agents
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                      <TrendingUp className="w-4 h-4 mr-3" />
                      Growing Market
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-button">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">KenyaHomes</h1>
                <p className="text-xs text-muted-foreground">Find Your Dream Property</p>
              </div>
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Home className="w-4 h-4 mr-2" />
              Properties
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <MapPin className="w-4 h-4 mr-2" />
              Locations
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Users className="w-4 h-4 mr-2" />
              Agents
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Growing Market
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              className="relative hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}