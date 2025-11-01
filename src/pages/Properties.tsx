import { TopHeaderBar } from "@/components/TopHeaderBar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Footer } from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Building2 } from "lucide-react";

export default function Properties() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background animate-fade-in">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full overflow-x-hidden">
          <TopHeaderBar />
          <DashboardHeader />
          
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Properties</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our extensive collection of premium properties across Kenya.
              </p>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
