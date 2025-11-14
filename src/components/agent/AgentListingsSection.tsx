import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ListingStatus = "approved" | "pending" | "rejected";

interface Listing {
  id: string;
  title: string;
  price: string;
  location: string;
  status: ListingStatus;
  views: number;
  image: string;
  createdAt: string;
}

interface AgentListingsSectionProps {
  onAddNewListing?: () => void;
}

export function AgentListingsSection({ onAddNewListing }: AgentListingsSectionProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock listings data
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Modern 3-Bedroom House in Westlands",
      price: "KSh 15,000,000",
      location: "Westlands, Nairobi",
      status: "approved",
      views: 1247,
      image: "/api/placeholder/400/300",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Luxury Apartment in Kilimani",
      price: "KSh 25,000/month",
      location: "Kilimani, Nairobi",
      status: "pending",
      views: 0,
      image: "/api/placeholder/400/300",
      createdAt: "2024-01-20",
    },
    {
      id: "3",
      title: "Executive Villa with Pool",
      price: "KSh 45,000,000",
      location: "Karen, Nairobi",
      status: "rejected",
      views: 0,
      image: "/api/placeholder/400/300",
      createdAt: "2024-01-18",
    },
    {
      id: "4",
      title: "Spacious Family Home",
      price: "KSh 18,500,000",
      location: "Runda, Nairobi",
      status: "approved",
      views: 892,
      image: "/api/placeholder/400/300",
      createdAt: "2024-01-10",
    },
  ]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(prev => prev.filter(l => l.id !== id));
      toast.success("Listing deleted successfully");
    }
  };

  const getStatusBadge = (status: ListingStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const stats = {
    total: listings.length,
    approved: listings.filter(l => l.status === "approved").length,
    pending: listings.filter(l => l.status === "pending").length,
    rejected: listings.filter(l => l.status === "rejected").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage all your property listings</p>
        </div>
        <Button 
          className="bg-gradient-hero text-white hover:shadow-lg hover:shadow-primary/50"
          onClick={() => {
            if (onAddNewListing) {
              onAddNewListing();
            }
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Listings</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Home className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first listing"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button 
                className="bg-gradient-hero text-white"
                onClick={() => {
                  if (onAddNewListing) {
                    onAddNewListing();
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card 
              key={listing.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30 overflow-hidden group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Home className="w-16 h-16 text-muted-foreground" />
                </div>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(listing.status)}
                </div>
                {listing.status === "approved" && (
                  <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {listing.views.toLocaleString()} views
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <span>{listing.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary">{listing.price}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => toast.info("Edit functionality coming soon")}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

