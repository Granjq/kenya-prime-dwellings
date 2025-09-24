import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Home, DollarSign } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  totalListings: number;
  priceRange: string;
  avatar?: string;
  specialization: string;
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{agent.rating}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {agent.reviews} Reviews
          </Badge>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <Avatar className="w-20 h-20 ring-2 ring-primary/20">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {getInitials(agent.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Agent Info */}
        <div className="text-center space-y-2 mb-4">
          <h3 className="font-semibold text-lg text-foreground">{agent.name}</h3>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-sm">{agent.location}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {agent.specialization}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Home className="w-3 h-3" />
              <span className="text-xs">Total Listings</span>
            </div>
            <div className="font-bold text-foreground">{agent.totalListings}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <DollarSign className="w-3 h-3" />
              <span className="text-xs">Starts From</span>
            </div>
            <div className="font-bold text-primary">{agent.priceRange}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}