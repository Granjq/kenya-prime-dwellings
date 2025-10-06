import { useState, useMemo } from "react";
import { TopHeaderBar } from "@/components/TopHeaderBar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsSection } from "@/components/StatsSection";
import { BestAgentsSection } from "@/components/BestAgentsSection";
import { BestLocationsSection } from "@/components/BestLocationsSection";
import { BuyAbilitySection } from "@/components/BuyAbilitySection";
import { LandServicesSection } from "@/components/LandServicesSection";
import { NewsBlogSection } from "@/components/NewsBlogSection";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home } from "lucide-react";

// Import property images
import houseNairobi1 from "@/assets/house-nairobi-1.jpg";
import apartmentWestlands from "@/assets/apartment-westlands.jpg";
import bungalowKaren from "@/assets/bungalow-karen.jpg";
import villaLavington from "@/assets/villa-lavington.jpg";
import houseRunda from "@/assets/house-runda.jpg";
import apartmentKilimani from "@/assets/apartment-kilimani.jpg";

// Mock data for properties
const mockProperties = [
  {
    id: "1",
    title: "Modern 3-Bedroom House in Nairobi",
    price: "KSh 15,000,000",
    location: "Karen, Nairobi",
    image: houseNairobi1,
    beds: 3,
    baths: 2,
    sqm: 250,
    type: "For Sale" as const,
    status: "sale" as const,
    isHighGrowth: true,
    propertyType: "house"
  },
  {
    id: "2",
    title: "Luxury Apartment in Westlands",
    price: "KSh 25,000/month",
    location: "Westlands, Nairobi",
    image: apartmentWestlands,
    beds: 2,
    baths: 2,
    sqm: 120,
    type: "For Rent" as const,
    status: "rent" as const,
    isHighGrowth: true,
    propertyType: "apartment"
  },
  {
    id: "3",
    title: "Beautiful Bungalow with Garden",
    price: "KSh 22,000,000",
    location: "Karen, Nairobi",
    image: bungalowKaren,
    beds: 4,
    baths: 3,
    sqm: 350,
    type: "For Sale" as const,
    status: "sale" as const,
    isHighGrowth: false,
    propertyType: "bungalow"
  },
  {
    id: "4",
    title: "Executive Villa with Pool",
    price: "KSh 45,000,000",
    location: "Lavington, Nairobi",
    image: villaLavington,
    beds: 4,
    baths: 3,
    sqm: 350,
    type: "For Sale" as const,
    status: "sale" as const,
    isHighGrowth: true,
    propertyType: "villa"
  },
  {
    id: "5",
    title: "Spacious Family Home",
    price: "KSh 18,500,000",
    location: "Runda, Nairobi",
    image: houseRunda,
    beds: 3,
    baths: 2,
    sqm: 280,
    type: "For Sale" as const,
    status: "sale" as const,
    isHighGrowth: false,
    propertyType: "house"
  },
  {
    id: "6",
    title: "Modern City Apartment",
    price: "KSh 35,000/month",
    location: "Kilimani, Nairobi",
    image: apartmentKilimani,
    beds: 2,
    baths: 2,
    sqm: 120,
    type: "For Rent" as const,
    status: "rent" as const,
    isHighGrowth: true,
    propertyType: "apartment"
  }
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const isMobile = useIsMobile();

  // Filter properties based on search term, status filter, and type filter
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.price.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status (sale/rent)
    if (activeFilter !== "all") {
      filtered = filtered.filter((property) => property.status === activeFilter);
    }

    // Filter by property type
    if (activeType !== "all") {
      filtered = filtered.filter((property) => property.propertyType === activeType);
    }

    return filtered;
  }, [searchTerm, activeFilter, activeType]);

  const growthCount = filteredProperties.filter(p => p.isHighGrowth).length;

  const PropertyCardWrapper = ({ property, index }: { property: typeof mockProperties[0]; index: number }) => (
    <div 
      className="animate-scale-in w-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <PropertyCard property={property} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopHeaderBar />
      <DashboardHeader />
      <StatsSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Filters */}
          <PropertyFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            activeType={activeType}
            setActiveType={setActiveType}
            propertyCount={filteredProperties.length}
            growthCount={growthCount}
          />

          {/* Properties Grid/Carousel */}
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
                  {filteredProperties.map((property, index) => (
                    <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/4">
                      <PropertyCardWrapper property={property} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCardWrapper key={property.id} property={property} index={index} />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters to find more properties.
              </p>
            </div>
          )}
        </div>
      </main>
      
        <BestAgentsSection />
        <BestLocationsSection />
        <BuyAbilitySection />
        <LandServicesSection />
        <NewsBlogSection />
    </div>
  );
}