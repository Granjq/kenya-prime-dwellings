import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopHeaderBar } from "@/components/TopHeaderBar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsSection } from "@/components/StatsSection";
import { BestAgentsSection } from "@/components/BestAgentsSection";
import { BestLocationsSection } from "@/components/BestLocationsSection";
import { BuyAbilitySection } from "@/components/BuyAbilitySection";
import { LandServicesSection } from "@/components/LandServicesSection";
import { NewsBlogSection } from "@/components/NewsBlogSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background animate-fade-in">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <TopHeaderBar />
          <DashboardHeader />
          <StatsSection />
          <BestAgentsSection />
          <BestLocationsSection />
          <BuyAbilitySection />
          <LandServicesSection />
          <FAQSection />
          <NewsBlogSection />
          <Footer />
          <ScrollToTop />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
