import { useState } from "react";
import {
  Home,
  MapPin,
  Users,
  TrendingUp,
  Settings,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

const menuItems = [
  {
    title: "Properties",
    url: "/",
    icon: Home,
  },
  {
    title: "Locations",
    url: "/locations",
    icon: MapPin,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: Users,
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-primary/10 z-50">
        <SidebarContent className="bg-background/95 backdrop-blur-xl">
          {/* Logo Section */}
          <SidebarGroup>
            <div className="px-4 py-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <Home className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      PropertyHub
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Find Your Dream Property
                    </p>
                  </div>
                )}
              </Link>
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
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
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
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                          {!isCollapsed && <span>{item.title}</span>}
                        </Link>
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
          <UserProfileCard onOpenProfile={() => setIsProfileDrawerOpen(true)} />
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
