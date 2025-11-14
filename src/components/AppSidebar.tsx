import { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  TrendingUp,
  Settings,
  FileText,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserProfileCard } from "@/components/UserProfileCard";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Properties",
    url: "/properties",
    icon: MapPin,
  },
  {
    title: "Agents",
    url: "/agents/dashboard?view=overview",
    matchPath: "/agents",
    icon: Users,
    requiresAgentAccess: true,
  },
  {
    title: "Market Trends",
    url: "/market",
    icon: TrendingUp,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const handleNavigation = (item: (typeof menuItems)[number]) => {
    if (item.requiresAgentAccess) {
      const targetAgentPath = "/agents/dashboard?view=overview";
      if (!isAuthenticated) {
        navigate("/auth?redirect=/agents/dashboard?view=overview&mode=agent");
        return;
      }
      navigate(targetAgentPath);
      return;
    }

    navigate(item.url);
  };

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-primary/10 z-40">
        <SidebarContent className="bg-background/95 backdrop-blur-xl">
          {/* Close Button */}
          <SidebarGroup>
            <div className="px-4 py-4 flex justify-end">
              <button
                onClick={() => {
                  const trigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
                  trigger?.click();
                }}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </SidebarGroup>

          {/* Navigation Menu */}
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const activePath = item.matchPath ?? item.url;
                  const isActive = location.pathname.startsWith(activePath);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item)}
                        isActive={isActive}
                        className={`
                          transition-all duration-200
                          ${isActive 
                            ? 'bg-primary/10 text-primary hover:bg-primary/15 font-semibold border-l-2 border-primary' 
                            : 'hover:bg-primary/5 hover:text-primary'
                          }
                        `}
                        tooltip={isCollapsed ? item.title : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile Card at Bottom */}
        <SidebarFooter className="mt-auto border-t border-primary/10 bg-background/95 backdrop-blur-xl">
          <UserProfileCard />
        </SidebarFooter>
      </Sidebar>

      {/* Profile Drawer */}
      <ProfileDrawer 
        open={isProfileDrawerOpen} 
        onOpenChange={setIsProfileDrawerOpen} 
      />
    </>
  );
}
