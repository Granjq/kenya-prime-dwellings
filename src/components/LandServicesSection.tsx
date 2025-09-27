import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Users, MapPin, Home, Handshake, Building, Landmark } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface LandService {
  id: string;
  name: string;
  icon: any;
  averagePrice: string;
  growth: string;
  listings: number;
  description: string;
  details: string;
}

const landServicesData = {
  all: [
    {
      id: "1",
      name: "Land Selling",
      icon: Landmark,
      averagePrice: "KSh 2.5M/acre",
      growth: "+18%",
      listings: 342,
      description: "Professional land selling services with market expertise",
      details: "Premium locations with verified titles and legal documentation"
    },
    {
      id: "2", 
      name: "Land Buying",
      icon: Home,
      averagePrice: "KSh 1.8M/acre",
      growth: "+22%",
      listings: 456,
      description: "Expert guidance for secure land acquisition processes",
      details: "Due diligence, valuation, and transaction support services"
    },
    {
      id: "3",
      name: "Land Brokerage", 
      icon: Handshake,
      averagePrice: "3.5% commission",
      growth: "+25%",
      listings: 278,
      description: "Connecting buyers and sellers with professional mediation",
      details: "Transparent processes with legal compliance and fast transactions"
    },
    {
      id: "4",
      name: "Land Leasing",
      icon: Building,
      averagePrice: "KSh 15K/month",
      growth: "+14%", 
      listings: 189,
      description: "Flexible leasing options for agricultural and commercial use",
      details: "Short and long-term agreements with competitive rental rates"
    }
  ],
  selling: [
    {
      id: "1",
      name: "Premium Land Selling",
      icon: Landmark,
      averagePrice: "KSh 3.2M/acre",
      growth: "+20%",
      listings: 125,
      description: "High-value land selling in prime locations",
      details: "Exclusive properties with maximum market exposure"
    },
    {
      id: "5",
      name: "Agricultural Land Sales",
      icon: Landmark,
      averagePrice: "KSh 1.8M/acre", 
      growth: "+15%",
      listings: 98,
      description: "Fertile agricultural land with water access",
      details: "Verified soil quality and irrigation potential"
    },
    {
      id: "6", 
      name: "Commercial Land Sales",
      icon: Landmark,
      averagePrice: "KSh 4.5M/acre",
      growth: "+28%",
      listings: 67,
      description: "Strategic commercial plots for development",
      details: "Prime locations with development approvals"
    }
  ],
  buying: [
    {
      id: "2",
      name: "Investment Land Purchase",
      icon: Home,
      averagePrice: "KSh 2.1M/acre",
      growth: "+24%",
      listings: 234,
      description: "Strategic land acquisition for investment portfolios",
      details: "Market analysis and future growth potential assessment"
    },
    {
      id: "7",
      name: "Residential Land Buying",
      icon: Home, 
      averagePrice: "KSh 1.5M/acre",
      growth: "+18%",
      listings: 156,
      description: "Perfect plots for building your dream home",
      details: "Residential zones with utility connections available"
    },
    {
      id: "8",
      name: "Industrial Land Purchase", 
      icon: Home,
      averagePrice: "KSh 2.8M/acre",
      growth: "+21%",
      listings: 89,
      description: "Industrial plots with excellent infrastructure access",
      details: "Strategic locations near transport hubs and utilities"
    }
  ],
  brokerage: [
    {
      id: "3",
      name: "Premium Brokerage",
      icon: Handshake,
      averagePrice: "4% commission", 
      growth: "+30%",
      listings: 145,
      description: "High-end land transaction facilitation services",
      details: "White-glove service for luxury land transactions"
    },
    {
      id: "9",
      name: "Standard Brokerage",
      icon: Handshake,
      averagePrice: "3% commission",
      growth: "+22%",
      listings: 198,
      description: "Professional mediation for all land transactions",
      details: "Efficient processes with transparent fee structure"
    },
    {
      id: "10",
      name: "Bulk Land Brokerage",
      icon: Handshake, 
      averagePrice: "2.5% commission",
      growth: "+18%",
      listings: 76,
      description: "Specialized services for large-scale land deals", 
      details: "Volume discounts and expedited processing"
    }
  ],
  leasing: [
    {
      id: "4",
      name: "Agricultural Leasing",
      icon: Building,
      averagePrice: "KSh 12K/month",
      growth: "+16%",
      listings: 98,
      description: "Productive farmland for seasonal and long-term use",
      details: "Flexible terms with optional equipment inclusion"
    },
    {
      id: "11", 
      name: "Commercial Land Lease",
      icon: Building,
      averagePrice: "KSh 25K/month",
      growth: "+19%", 
      listings: 65,
      description: "Prime commercial plots for business development",
      details: "Strategic locations with high visibility and foot traffic"
    },
    {
      id: "12",
      name: "Event Space Leasing",
      icon: Building,
      averagePrice: "KSh 8K/day",
      growth: "+12%",
      listings: 43,
      description: "Spacious venues for events and temporary installations",
      details: "Flexible daily, weekly, and monthly rental options"
    }
  ]
};

const categoryLabels = {
  all: "All Services",
  selling: "Land Selling",
  buying: "Land Buying", 
  brokerage: "Brokerage",
  leasing: "Land Leasing"
};

export function LandServicesSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof landServicesData>("all");
  const isMobile = useIsMobile();

  const currentServices = landServicesData[activeCategory];

  const ServiceCard = ({ service, index }: { service: LandService; index: number }) => {
    const IconComponent = service.icon;
    
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50 overflow-hidden w-full"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground mb-2">
                  {service.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {service.growth}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Average Rate</span>
              <span className="text-lg font-bold text-foreground flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {service.averagePrice}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Active Listings</span>
              <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                {service.listings} available
              </span>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">{service.details}</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((parseInt(service.growth.replace('%', '').replace('+', '')) * 3), 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Market performance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Land Services in Kenya
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive land solutions for selling, buying, brokerage, and leasing with expert guidance and market insights
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                onClick={() => setActiveCategory(key as keyof typeof landServicesData)}
                className="px-6 py-2"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

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
                {currentServices.map((service, index) => (
                  <CarouselItem key={service.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/4">
                    <ServiceCard service={service} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}