import { useState } from "react";
import { Home, Search, Heart, PlusCircle, Settings, Menu } from "lucide-react";
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
  { title: "Search", icon: Search, url: "/search" },
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
        className="border-r border-primary/10 backdrop-blur-xl bg-sidebar/95"
      >
        <SidebarHeader className="border-b border-primary/10 p-4">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <h2 className="text-lg font-bold text-primary">PropertyHub</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                      className="hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/20 data-[active=true]:text-primary transition-all duration-300"
                    >
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto">
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
