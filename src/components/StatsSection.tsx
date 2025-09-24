import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, MapPin, TrendingUp } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Home,
      label: "Properties Listed",
      value: "1,200+",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Users,
      label: "Trusted Agents",
      value: "200+",
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      icon: MapPin,
      label: "Locations",
      value: "50+",
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge className="bg-success/10 text-success border-success/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Kenya's #1 Property Platform
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect{" "}
            <span className="text-primary relative">
              Home
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-hero rounded-full"></div>
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover premium properties across Kenya with our intelligent platform.
            Connect with trusted agents and find your dream home today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="group relative overflow-hidden bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* Decorative gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Market Growth Badge */}
        <div className="text-center mt-8 animate-fade-in">
          <Badge className="bg-success/10 text-success border-success/20 px-4 py-2 text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Growing Market - Join thousands of satisfied customers
          </Badge>
        </div>
      </div>
    </section>
  );
}