import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Clock, 
  CheckCircle, 
  Eye, 
  MessageSquare, 
  Shield,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function AgentDashboardOverview() {
  // Mock data - in real app, this would come from API
  const metrics = {
    totalListings: 12,
    pendingApproval: 3,
    approved: 8,
    rejected: 1,
    viewsLast7Days: 1247,
    messagesReceived: 23,
    verificationStatus: "verified" as "pending" | "verified" | "rejected",
  };

  const recentActivity = [
    { id: 1, type: "listing", message: "New listing 'Modern Apartment in Westlands' approved", time: "2 hours ago" },
    { id: 2, type: "message", message: "New message from potential buyer", time: "5 hours ago" },
    { id: 3, type: "listing", message: "Listing 'Luxury Villa' needs review", time: "1 day ago" },
  ];

  const statCards = [
    {
      title: "Total Listings",
      value: metrics.totalListings,
      icon: Home,
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+2 this month",
    },
    {
      title: "Pending Approval",
      value: metrics.pendingApproval,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "3 awaiting review",
    },
    {
      title: "Approved Listings",
      value: metrics.approved,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      change: "8 live on site",
    },
    {
      title: "Views (7 Days)",
      value: metrics.viewsLast7Days.toLocaleString(),
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      change: "+12% from last week",
    },
    {
      title: "Messages",
      value: metrics.messagesReceived,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      change: "5 unread",
    },
    {
      title: "Verification",
      value: metrics.verificationStatus === "verified" ? "Verified" : metrics.verificationStatus === "pending" ? "Pending" : "Rejected",
      icon: Shield,
      color: metrics.verificationStatus === "verified" ? "text-green-500" : metrics.verificationStatus === "pending" ? "text-accent" : "text-destructive",
      bgColor: metrics.verificationStatus === "verified" ? "bg-green-500/10" : metrics.verificationStatus === "pending" ? "bg-accent/10" : "bg-destructive/10",
      change: metrics.verificationStatus === "verified" ? "Active agent" : "Under review",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "px-4 py-2 text-sm font-semibold",
            metrics.verificationStatus === "verified" 
              ? "bg-green-500/10 text-green-500 border-green-500/30"
              : metrics.verificationStatus === "pending"
              ? "bg-accent/10 text-accent border-accent/30"
              : "bg-destructive/10 text-destructive border-destructive/30"
          )}
        >
          {metrics.verificationStatus === "verified" ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Verified Agent
            </>
          ) : metrics.verificationStatus === "pending" ? (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Verification Pending
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 mr-2" />
              Verification Rejected
            </>
          )}
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("w-5 h-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Listing Status Breakdown */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Listing Status
            </CardTitle>
            <CardDescription>Your listings breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Approved</span>
                  <span className="text-sm font-semibold text-green-500">{metrics.approved}</span>
                </div>
                <Progress value={(metrics.approved / metrics.totalListings) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Pending</span>
                  <span className="text-sm font-semibold text-accent">{metrics.pendingApproval}</span>
                </div>
                <Progress value={(metrics.pendingApproval / metrics.totalListings) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Rejected</span>
                  <span className="text-sm font-semibold text-destructive">{metrics.rejected}</span>
                </div>
                <Progress value={(metrics.rejected / metrics.totalListings) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

