import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TopHeaderBar } from "@/components/TopHeaderBar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AgentsSidebar } from "@/components/AgentsSidebar";
import { AgentDashboardOverview } from "@/components/agent/AgentDashboardOverview";
import { AgentProfileSection } from "@/components/agent/AgentProfileSection";
import { AgentListingsSection } from "@/components/agent/AgentListingsSection";
import { AgentNotificationsSection } from "@/components/agent/AgentNotificationsSection";
import { AgentSettingsSection } from "@/components/agent/AgentSettingsSection";
import { AddNewListing } from "@/components/agent/AddNewListing";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

type DashboardView = "overview" | "profile" | "listings" | "add-listing" | "notifications" | "settings";

export default function AgentsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view") as DashboardView | null;
  const [activeView, setActiveView] = useState<DashboardView>(viewParam || "overview");

  useEffect(() => {
    if (viewParam && ["overview", "profile", "listings", "add-listing", "notifications", "settings"].includes(viewParam)) {
      setActiveView(viewParam);
    }
  }, [viewParam]);

  const handleViewChange = (view: DashboardView) => {
    setActiveView(view);
    setSearchParams({ view });
  };

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <AgentDashboardOverview />;
      case "profile":
        return <AgentProfileSection />;
      case "listings":
        return <AgentListingsSection onAddNewListing={() => handleViewChange("add-listing")} />;
      case "add-listing":
        return <AddNewListing onComplete={() => handleViewChange("listings")} />;
      case "notifications":
        return <AgentNotificationsSection />;
      case "settings":
        return <AgentSettingsSection />;
      default:
        return <AgentDashboardOverview />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AgentsSidebar activeView={activeView} setActiveView={handleViewChange} />
        <SidebarInset className="flex-1 overflow-x-hidden">
          <div className="min-h-screen bg-background">
            <TopHeaderBar />
            <DashboardHeader />
            <div className="pt-[104px]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

