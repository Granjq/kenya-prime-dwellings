import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, TrendingUp, DollarSign } from "lucide-react";

interface Location {
  id: string;
  name: string;
  averagePrice: string;
  growth: string;
  properties: number;
  description: string;
}

const locationData = {
  rent: [
    {
      id: "1",
      name: "Westlands",
      averagePrice: "KSh 35,000/month",
      growth: "+12%",
      properties: 156,
      description: "Prime business district with modern amenities"
    },
    {
      id: "2",
      name: "Kilimani",
      averagePrice: "KSh 42,000/month",
      growth: "+18%",
      properties: 89,
      description: "Vibrant neighborhood with excellent connectivity"
    },
    {
      id: "3",
      name: "Parklands",
      averagePrice: "KSh 28,000/month",
      growth: "+8%",
      properties: 134,
      description: "Peaceful residential area with good schools"
    }
  ],
  sell: [
    {
      id: "4",
      name: "Karen",
      averagePrice: "KSh 25M",
      growth: "+15%",
      properties: 67,
      description: "Exclusive suburb with luxury properties"
    },
    {
      id: "5",
      name: "Runda",
      averagePrice: "KSh 32M",
      growth: "+22%",
      properties: 43,
      description: "Upscale residential with diplomatic presence"
    },
    {
      id: "6",
      name: "Lavington",
      averagePrice: "KSh 28M",
      growth: "+19%",
      properties: 78,
      description: "Prestigious location with green spaces"
    }
  ],
  shortStay: [
    {
      id: "7",
      name: "CBD Nairobi",
      averagePrice: "KSh 8,500/night",
      growth: "+25%",
      properties: 92,
      description: "Central location perfect for business travelers"
    },
    {
      id: "8",
      name: "Gigiri",
      averagePrice: "KSh 12,000/night",
      growth: "+30%",
      properties: 34,
      description: "Diplomatic quarter with premium accommodations"
    },
    {
      id: "9",
      name: "Riverside",
      averagePrice: "KSh 6,800/night",
      growth: "+14%",
      properties: 56,
      description: "Modern area with shopping and entertainment"
    }
  ],
  buy: [
    {
      id: "10",
      name: "Syokimau",
      averagePrice: "KSh 8.5M",
      growth: "+28%",
      properties: 187,
      description: "Fast-growing area near the airport"
    },
    {
      id: "11",
      name: "Kiambu",
      averagePrice: "KSh 6.2M",
      growth: "+24%",
      properties: 203,
      description: "Affordable options with great potential"
    },
    {
      id: "12",
      name: "Thika Road",
      averagePrice: "KSh 7.8M",
      growth: "+32%",
      properties: 145,
      description: "Rapidly developing corridor with infrastructure"
    }
  ]
};

const categoryLabels = {
  rent: "Best for Rent",
  sell: "Best for Sale", 
  shortStay: "Best for Short Stay",
  buy: "Best to Buy"
};

export function BestLocationsSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof locationData>("rent");
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    const categories = Object.keys(locationData) as Array<keyof typeof locationData>;
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex]);
  };

  const currentLocations = locationData[activeCategory];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Label htmlFor="location-toggle" className="text-lg font-medium">
              {categoryLabels[activeCategory]}
            </Label>
            <Switch
              id="location-toggle"
              checked={isToggled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Top Locations in Nairobi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after areas based on market trends and property performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLocations.map((location, index) => (
            <Card 
              key={location.id} 
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {location.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {location.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Average Price</span>
                    <span className="text-lg font-bold text-foreground flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {location.averagePrice}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Growth Rate</span>
                    <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {location.growth}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Available Properties</span>
                    <span className="text-sm font-semibold text-foreground">
                      {location.properties} listings
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((parseInt(location.growth.replace('%', '').replace('+', '')) * 3), 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Market performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}