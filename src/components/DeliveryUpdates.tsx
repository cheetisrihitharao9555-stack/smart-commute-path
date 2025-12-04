import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Package, CheckCircle2, Clock, Truck, MapPin, AlertCircle } from "lucide-react";

interface Delivery {
  id: string;
  orderNumber: string;
  customer: string;
  address: string;
  status: "pending" | "picked-up" | "in-transit" | "delivered" | "delayed";
  eta: string;
  driver: string;
  timestamp: string;
}

const DeliveryUpdates = () => {
  const deliveries: Delivery[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: "Priya Sharma",
      address: "C-12, Hauz Khas Enclave",
      status: "delivered",
      eta: "Delivered",
      driver: "Rajesh Kumar",
      timestamp: "10:45 AM",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: "Arun Mehta",
      address: "B-45, Green Park Extension",
      status: "in-transit",
      eta: "12 min",
      driver: "Amit Singh",
      timestamp: "11:20 AM",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customer: "Neha Gupta",
      address: "A-23, Safdarjung Enclave",
      status: "delayed",
      eta: "35 min (delayed)",
      driver: "Suresh Sharma",
      timestamp: "11:45 AM",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      customer: "Rahul Verma",
      address: "D-78, Saket",
      status: "picked-up",
      eta: "45 min",
      driver: "Vikram Patel",
      timestamp: "12:00 PM",
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      customer: "Anjali Singh",
      address: "F-34, Vasant Kunj",
      status: "pending",
      eta: "Scheduled 2:00 PM",
      driver: "—",
      timestamp: "—",
    },
  ];

  const getStatusConfig = (status: Delivery["status"]) => {
    switch (status) {
      case "delivered":
        return {
          icon: CheckCircle2,
          color: "bg-success/20 text-success border-success/30",
          label: "Delivered",
        };
      case "in-transit":
        return {
          icon: Truck,
          color: "bg-primary/20 text-primary border-primary/30",
          label: "In Transit",
        };
      case "delayed":
        return {
          icon: AlertCircle,
          color: "bg-destructive/20 text-destructive border-destructive/30",
          label: "Delayed",
        };
      case "picked-up":
        return {
          icon: Package,
          color: "bg-logistics-blue/20 text-logistics-blue border-logistics-blue/30",
          label: "Picked Up",
        };
      case "pending":
        return {
          icon: Clock,
          color: "bg-muted text-muted-foreground border-border",
          label: "Pending",
        };
    }
  };

  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    inProgress: deliveries.filter((d) => ["in-transit", "picked-up"].includes(d.status)).length,
    delayed: deliveries.filter((d) => d.status === "delayed").length,
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Delivery</span> Updates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time status updates for all ongoing deliveries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
          {[
            { label: "Total Orders", value: stats.total, color: "text-foreground" },
            { label: "Delivered", value: stats.delivered, color: "text-success" },
            { label: "In Progress", value: stats.inProgress, color: "text-primary" },
            { label: "Delayed", value: stats.delayed, color: "text-destructive" },
          ].map((stat) => (
            <Card key={stat.label} variant="glass" className="p-4 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Deliveries List */}
        <Card variant="glow" className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Today's Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {deliveries.map((delivery, index) => {
                const statusConfig = getStatusConfig(delivery.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={delivery.id}
                    className="p-4 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Status Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${statusConfig.color}`}
                      >
                        <StatusIcon className="h-5 w-5" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-medium">
                            {delivery.orderNumber}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{delivery.customer}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {delivery.address}
                        </div>
                      </div>

                      {/* ETA & Driver */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium">{delivery.eta}</p>
                        <p className="text-xs text-muted-foreground">{delivery.driver}</p>
                        <p className="text-xs text-muted-foreground">{delivery.timestamp}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DeliveryUpdates;
