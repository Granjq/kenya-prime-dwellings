import { Home, Building2, MapPin, Users, TrendingUp, Settings, FileText } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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
import { UserProfileCard } from "./UserProfileCard";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Properties", url: "/properties", icon: Building2 },
  { title: "Locations", url: "/locations", icon: MapPin },
  { title: "Agents", url: "/agents", icon: Users },
  { title: "Growing Market", url: "/market", icon: TrendingUp },
];

const secondaryItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl"
    >
      <SidebarContent>
        {/* Logo Section */}
        <div className={`px-4 py-6 border-b border-sidebar-border/50 ${isCollapsed ? "px-2" : ""}`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-glow)/0.4)]">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">PropertyHub</h2>
                <p className="text-xs text-primary/70 font-medium">Premium Listings</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-glow)/0.4)]">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`
                      transition-all duration-300
                      ${isActive(item.url)
                        ? "bg-primary/10 text-primary border-l-2 border-primary shadow-[0_0_10px_rgba(var(--primary-glow)/0.2)]"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:border-l-2 hover:border-primary/30"
                      }
                    `}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? "text-primary" : ""}`} />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`
                      transition-all duration-300
                      ${isActive(item.url)
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:border-l-2 hover:border-primary/30"
                      }
                    `}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? "text-primary" : ""}`} />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Card at Bottom */}
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <UserProfileCard />
      </SidebarFooter>
    </Sidebar>
  );
}
