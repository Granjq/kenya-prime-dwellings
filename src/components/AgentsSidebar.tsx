import { 
  LayoutDashboard, 
  User, 
  Home, 
  PlusCircle, 
  Bell, 
  Settings, 
  LogOut,
  Shield
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type DashboardView = "overview" | "profile" | "listings" | "add-listing" | "notifications" | "settings";

interface AgentsSidebarProps {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
}

export function AgentsSidebar({ activeView, setActiveView }: AgentsSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "overview" as DashboardView,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "profile" as DashboardView,
      label: "My Profile",
      icon: User,
      badge: null,
    },
    {
      id: "listings" as DashboardView,
      label: "My Listings",
      icon: Home,
      badge: null,
    },
    {
      id: "add-listing" as DashboardView,
      label: "Add New Listing",
      icon: PlusCircle,
      badge: null,
    },
    {
      id: "notifications" as DashboardView,
      label: "Notifications",
      icon: Bell,
      badge: 3, // Mock notification count
    },
    {
      id: "settings" as DashboardView,
      label: "Account Settings",
      icon: Settings,
      badge: null,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Agent Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      className={cn(
                        "w-full justify-start gap-3 h-12 px-4 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary shadow-sm shadow-primary/20"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="default" 
                          className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 h-12 px-4 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

