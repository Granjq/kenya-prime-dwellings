import { useState } from "react";
import { Home, Search, Heart, PlusCircle, Settings, Menu, MapPin, Users, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProfileCard } from "./ProfileCard";
import { ProfileDrawer } from "./ProfileDrawer";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Properties", icon: Search, url: "/properties" },
  { title: "Locations", icon: MapPin, url: "/locations" },
  { title: "Agents", icon: Users, url: "/agents" },
  { title: "Growing Market", icon: TrendingUp, url: "/market" },
  { title: "Saved", icon: Heart, url: "/saved" },
  { title: "Add Listing", icon: PlusCircle, url: "/add-listing" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-primary/20 backdrop-blur-xl bg-sidebar/95 shadow-xl shadow-primary/5"
      >
        <SidebarHeader className="border-b border-primary/20 p-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary-glow to-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                  <Home className="h-4 w-4 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  PropertyHub
                </h2>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-primary/70 font-semibold px-2"}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                      className="group relative hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/20 data-[active=true]:text-primary data-[active=true]:shadow-lg data-[active=true]:shadow-primary/20 transition-all duration-300 rounded-lg border border-transparent hover:border-primary/30 data-[active=true]:border-primary/40"
                    >
                      <a href={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-primary/20 bg-gradient-to-t from-primary/5 to-transparent">
          <ProfileCard
            onViewProfile={() => setProfileDrawerOpen(true)}
            collapsed={isCollapsed}
          />
        </SidebarFooter>
      </Sidebar>

      <ProfileDrawer
        open={profileDrawerOpen}
        onOpenChange={setProfileDrawerOpen}
      />
    </>
  );
}
