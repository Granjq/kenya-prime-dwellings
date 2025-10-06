import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, TrendingUp } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Import property images
import houseThikaRoad from "@/assets/house-thika-road.jpg";
import apartmentRiverside from "@/assets/apartment-riverside.jpg";
import houseSyokimau from "@/assets/house-syokimau.jpg";
import apartmentParklands from "@/assets/apartment-parklands.jpg";

const buyAbilityProperties = [
  {
    id: "ba-1",
    image: houseThikaRoad,
    price: "KSh 12,500,000",
    location: "Thika Road, Nairobi",
    beds: 3,
    baths: 2,
    sqm: 220,
  },
  {
    id: "ba-2",
    image: apartmentRiverside,
    price: "KSh 8,900,000",
    location: "Riverside, Nairobi",
    beds: 2,
    baths: 2,
    sqm: 150,
  },
  {
    id: "ba-3",
    image: houseSyokimau,
    price: "KSh 6,750,000",
    location: "Syokimau, Machakos",
    beds: 3,
    baths: 2,
    sqm: 180,
  },
  {
    id: "ba-4",
    image: apartmentParklands,
    price: "KSh 10,200,000",
    location: "Parklands, Nairobi",
    beds: 2,
    baths: 2,
    sqm: 140,
  },
];

export function BuyAbilitySection() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Know Your BuyAbility
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
            Discover what you can afford and explore properties within your budget
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Mortgage Calculator Card */}
          <div className="flex">
            <Card className="h-full border border-border/50 shadow-sm hover:shadow-lg transition-all duration-500 bg-card">
              <CardContent className="p-8 space-y-8">
                {/* Logo Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-lg">PropertyHub Loans</span>
                </div>

                {/* Data Rows */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Suggested target price</p>
                    <p className="text-3xl font-bold text-foreground tracking-tight">KSh 12,500,000</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Monthly payment</p>
                    <p className="text-3xl font-bold text-foreground tracking-tight">KSh 95,750</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Today's rate / APR</p>
                    <p className="text-3xl font-bold text-primary tracking-tight">12.5% / 13.2%</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full h-14 text-base font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-primary hover:bg-primary/90"
                >
                  Let's get started
                </Button>

                {/* Info Badge */}
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pre-qualify in minutes with no impact to your credit score
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Property Cards Carousel */}
          <div className="flex">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                })
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {buyAbilityProperties.map((property, index) => (
                  <CarouselItem key={property.id} className="pl-4 md:basis-1/2">
                    <PropertyCardItem property={property} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg border-border/50" />
              <CarouselNext className="right-0 translate-x-1/2 bg-background/95 backdrop-blur-sm hover:bg-background shadow-lg border-border/50" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyCardItem({ 
  property, 
  index 
}: { 
  property: typeof buyAbilityProperties[0]; 
  index: number;
}) {
  return (
    <Card 
      className="overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 animate-fade-in group cursor-pointer bg-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={property.image}
          alt={property.location}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Badge Overlay */}
        <div className="absolute top-4 left-4">
          <Badge 
            className="px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm"
            style={{ 
              backgroundColor: "hsl(24, 100%, 50%)", 
              color: "white",
              border: "none"
            }}
          >
            Within BuyAbility
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 space-y-4">
        {/* Price */}
        <div className="space-y-1.5">
          <p className="text-2xl font-bold text-foreground tracking-tight">{property.price}</p>
          <p className="text-sm text-muted-foreground font-medium">{property.location}</p>
        </div>

        {/* Features */}
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{property.beds}</span> beds
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{property.baths}</span> baths
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{property.sqm}</span> sqm
          </span>
        </div>

        {/* Placeholder Text Bars */}
        <div className="space-y-2.5 pt-2">
          <div className="h-2 bg-muted/60 rounded-full w-full" />
          <div className="h-2 bg-muted/60 rounded-full w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
