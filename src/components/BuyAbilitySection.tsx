import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, TrendingUp } from "lucide-react";

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
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Know Your BuyAbility
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what you can afford and explore properties within your budget
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Mortgage Calculator Card */}
          <div className="lg:col-span-4">
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10">
              <CardContent className="p-6 space-y-6">
                {/* Logo Header */}
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Home className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">PropertyHub Loans</span>
                </div>

                {/* Data Rows */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Suggested target price</p>
                    <p className="text-2xl font-bold text-foreground">KSh 12,500,000</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly payment</p>
                    <p className="text-2xl font-bold text-foreground">KSh 95,750</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Today's rate / APR</p>
                    <p className="text-2xl font-bold text-primary">12.5% / 13.2%</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: "hsl(211, 100%, 45%)" }}
                >
                  Let's get started
                </Button>

                {/* Info Badge */}
                <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Pre-qualify in minutes with no impact to your credit score
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Property Cards */}
          <div className="lg:col-span-8">
            {isMobile ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {buyAbilityProperties.map((property, index) => (
                    <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2">
                      <PropertyCardItem property={property} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {buyAbilityProperties.map((property, index) => (
                  <PropertyCardItem key={property.id} property={property} index={index} />
                ))}
              </div>
            )}
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
      className="overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.image}
          alt={property.location}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge 
            className="px-3 py-1 text-xs font-semibold shadow-md"
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
      <CardContent className="p-4 space-y-3">
        {/* Price */}
        <div className="space-y-1">
          <p className="text-xl font-bold text-foreground">{property.price}</p>
          <p className="text-sm text-muted-foreground">{property.location}</p>
        </div>

        {/* Features - Skeleton bars for visual consistency */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium">{property.beds}</span> beds
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{property.baths}</span> baths
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{property.sqm}</span> sqm
          </span>
        </div>

        {/* Placeholder Text Bars */}
        <div className="space-y-2 pt-2">
          <div className="h-2 bg-muted rounded-full w-full" />
          <div className="h-2 bg-muted rounded-full w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
