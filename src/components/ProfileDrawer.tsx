import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Eye, 
  Star, 
  Settings, 
  LogOut,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
  const { user, logout } = useAuth();

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "JD";

  const userRole = "Buyer";

  const stats = [
    { label: "Saved Listings", value: "12", icon: Heart },
    { label: "Viewed", value: "48", icon: Eye },
    { label: "Reviews", value: "5", icon: Star },
  ];

  const handleEditProfile = () => {
    toast.info("Profile editing coming soon!");
  };

  const handleSettings = () => {
    toast.info("Settings coming soon!");
  };

  const handleLogout = () => {
    logout();
    onOpenChange(false);
    toast.success("Logged out successfully");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:max-w-md bg-background/95 backdrop-blur-xl border-r border-border/50"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Profile Overview</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-background/40 backdrop-blur-xl border border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5" />
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-primary/30 shadow-lg shadow-primary/20">
                <AvatarImage src="" alt={user?.name || "User"} />
                <AvatarFallback className="bg-gradient-hero text-primary-foreground text-2xl font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="relative space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {user?.name || "John Doe"}
              </h3>
              <Badge 
                variant="outline" 
                className="bg-primary/10 text-primary border-primary/30"
              >
                {userRole}
              </Badge>
            </div>
            <Button 
              onClick={handleEditProfile}
              className="relative bg-gradient-hero hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
            >
              Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 p-4 rounded-lg bg-background/40 backdrop-blur-xl border border-border/50">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-foreground">{user?.email || "john@example.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+254 712 345 678</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group p-4 rounded-lg bg-background/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-2">
                  <stat.icon className="h-5 w-5 mx-auto text-primary" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-border/50" />

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-border/50 hover:bg-primary/5 hover:border-primary/30"
              onClick={handleSettings}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
