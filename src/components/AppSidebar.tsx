import { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  TrendingUp,
  Heart,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProfileCard } from "./ProfileCard";
import { ProfileDrawer } from "./ProfileDrawer";

const mainItems = [
  { title: "Properties", url: "/", icon: Home },
  { title: "Locations", url: "/locations", icon: MapPin },
  { title: "Agents", url: "/agents", icon: Users },
  { title: "Growing Market", url: "/market", icon: TrendingUp },
];

const userItems = [
  { title: "Saved Listings", url: "/saved", icon: Heart },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [profileOpen, setProfileOpen] = useState(false);
  const isCollapsed = state === "collapsed";

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <SidebarHeader className="border-b border-border/50 p-4">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-button group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
              <Home className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  PropertyHub
                </h1>
                <p className="text-xs text-muted-foreground">
                  Find Your Dream Property
                </p>
              </div>
            )}
          </NavLink>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/30 shadow-sm shadow-primary/10"
                              : "text-foreground hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/10"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon
                              className={`h-5 w-5 transition-transform duration-300 ${
                                isActive ? "scale-110" : "group-hover:scale-110"
                              }`}
                            />
                            {!isCollapsed && (
                              <span className="flex-1 font-medium">
                                {item.title}
                              </span>
                            )}
                            {!isCollapsed && isActive && (
                              <ChevronRight className="h-4 w-4 opacity-50" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
              Your Activity
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/30 shadow-sm shadow-primary/10"
                              : "text-foreground hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/10"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon
                              className={`h-5 w-5 transition-transform duration-300 ${
                                isActive ? "scale-110" : "group-hover:scale-110"
                              }`}
                            />
                            {!isCollapsed && (
                              <span className="flex-1 font-medium">
                                {item.title}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border/50 p-4">
          <ProfileCard onOpenProfile={() => setProfileOpen(true)} />
        </SidebarFooter>
      </Sidebar>

      <ProfileDrawer open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
