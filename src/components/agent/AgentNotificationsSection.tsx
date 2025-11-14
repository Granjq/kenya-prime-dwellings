import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  AlertCircle,
  Info,
  Trash2,
  MarkAsRead
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NotificationType = "listing" | "message" | "verification" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export function AgentNotificationsSection() {
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "listing",
      title: "Listing Approved",
      message: "Your listing 'Modern 3-Bedroom House in Westlands' has been approved and is now live.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "You have a new message from a potential buyer regarding 'Luxury Apartment in Kilimani'",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "listing",
      title: "Listing Rejected",
      message: "Your listing 'Executive Villa' was rejected. Reason: Missing required documents.",
      time: "1 day ago",
      read: false,
    },
    {
      id: "4",
      type: "verification",
      title: "Verification Approved",
      message: "Congratulations! Your agent profile has been verified.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "system",
      title: "System Update",
      message: "New features have been added to your dashboard. Check them out!",
      time: "3 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "listing":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "verification":
        return <AlertCircle className="w-5 h-5 text-primary" />;
      case "system":
        return <Info className="w-5 h-5 text-accent" />;
    }
  };

  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case "listing":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Listing</Badge>;
      case "message":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">Message</Badge>;
      case "verification":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Verification</Badge>;
      case "system":
        return <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">System</Badge>;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your listings, messages, and account activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {unreadCount} unread
            </Badge>
          )}
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              <MarkAsRead className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200",
                !notification.read && "border-primary/30 bg-primary/5 shadow-sm shadow-primary/5"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            "font-semibold text-foreground",
                            !notification.read && "font-bold"
                          )}>
                            {notification.title}
                          </h3>
                          {getNotificationBadge(notification.type)}
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 text-xs"
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

