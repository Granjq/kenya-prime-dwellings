import { AgentCard } from "./AgentCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

// Mock data for Kenyan real estate agents
const topAgents = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    location: "Westlands, Nairobi",
    rating: 4.9,
    reviews: 284,
    totalListings: 35,
    priceRange: "KSh 2.5M",
    specialization: "Luxury Homes",
  },
  {
    id: "2", 
    name: "James Kimani",
    location: "Karen, Nairobi",
    rating: 4.8,
    reviews: 197,
    totalListings: 28,
    priceRange: "KSh 5.2M",
    specialization: "Family Homes",
  },
  {
    id: "3",
    name: "Grace Achieng",
    location: "Kilimani, Nairobi",
    rating: 4.9,
    reviews: 156,
    totalListings: 22,
    priceRange: "KSh 1.8M",
    specialization: "Apartments",
  },
  {
    id: "4",
    name: "David Mwangi",
    location: "Runda, Nairobi", 
    rating: 4.7,
    reviews: 203,
    totalListings: 31,
    priceRange: "KSh 8.5M",
    specialization: "Executive Villas",
  },
];

export function BestAgentsSection() {
  const navigate = useNavigate();

  const handleJoinAsAgent = (e: React.MouseEvent) => {
    e.preventDefault();
    // Always redirect to auth page first, then to agents dashboard
    navigate("/auth?redirect=/agents/dashboard?view=profile&mode=agent");
  };

  const AgentCardWrapper = ({ agent, index }: { agent: typeof topAgents[0]; index: number }) => (
    <div 
      className="animate-scale-in w-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <AgentCard agent={agent} />
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Top Listing Agents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our highly rated property experts who have helped thousands of clients 
            find their perfect homes across Nairobi and beyond.
          </p>
        </div>

        {/* Agents Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {topAgents.map((agent, index) => (
                <CarouselItem key={agent.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                  <AgentCardWrapper agent={agent} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
            <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
          </Carousel>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 text-center relative overflow-hidden rounded-3xl">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.3),transparent_50%)]"></div>
          
          <div className="relative backdrop-blur-sm bg-card/30 p-10 md:p-16 border border-border/30 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy homeowners who found their perfect property 
              through KenyaHomes trusted agents. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleJoinAsAgent}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Join as Agent
              </button>
              <button className="px-8 py-3 border-2 border-primary/30 hover:border-primary text-foreground hover:bg-primary/10 rounded-lg font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}