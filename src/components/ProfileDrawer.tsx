import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { 
  Heart, 
  Home, 
  Settings, 
  CheckCircle2,
  Calendar,
  Mail,
  LogOut
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const handleLogout = () => {
    onOpenChange(false);
    logout();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md backdrop-blur-xl bg-background/95 border-l border-primary/20 p-0 overflow-y-auto"
      >
        <div className="relative">
          {/* Header with gradient background */}
          <div className="relative h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-b border-primary/20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgMTB2LTJoLTJ2Mmgyem0tMiAydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          </div>

          {/* Avatar overlapping header */}
          <div className="absolute left-6 -bottom-16 z-10">
            <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl border-2 border-primary/30">
              <AvatarImage src="" alt={user?.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="pt-20 px-6 pb-6">
            <SheetHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-2xl font-bold text-foreground">
                  {user?.name || "User Name"}
                </SheetTitle>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </SheetHeader>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary/70" />
                <span>{user?.email || "user@example.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary/70" />
                <span>Joined December 2024</span>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Quick Stats */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground mt-1">Listings</div>
              </div>
              <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground mt-1">Saved</div>
              </div>
              <div className="text-center p-4 rounded-lg backdrop-blur-sm bg-card/40 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground mt-1">Reviews</div>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Menu Items */}
          <div className="px-6 py-6 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group text-left">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  My Listings
                </div>
                <div className="text-xs text-muted-foreground">
                  View and manage properties
                </div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group text-left">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Saved Properties
                </div>
                <div className="text-xs text-muted-foreground">
                  Your favorite listings
                </div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group text-left">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Settings & Account
                </div>
                <div className="text-xs text-muted-foreground">
                  Manage your preferences
                </div>
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <div className="px-6 py-6 pt-4">
            <Button
              onClick={handleLogout}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
              size="lg"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
