import { AgentCard } from "./AgentCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

        {/* Agents Grid/Carousel */}
        {isMobile ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {topAgents.map((agent, index) => (
                  <CarouselItem key={agent.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2">
                    <AgentCardWrapper agent={agent} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAgents.map((agent, index) => (
              <AgentCardWrapper key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of happy homeowners who found their perfect property 
              through KenyaHomes trusted agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Join as Agent
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}