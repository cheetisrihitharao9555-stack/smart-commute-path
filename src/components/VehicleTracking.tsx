import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck, Battery, Navigation, Clock, ThermometerSun, Gauge } from "lucide-react";
import { Progress } from "./ui/progress";

interface Vehicle {
  id: string;
  name: string;
  driver: string;
  status: "on-route" | "idle" | "loading" | "maintenance";
  location: string;
  battery: number;
  speed: number;
  eta: string;
  temperature?: number;
}

const VehicleTracking = () => {
  const vehicles: Vehicle[] = [
    {
      id: "VH-001",
      name: "Delivery Van #1",
      driver: "Rajesh Kumar",
      status: "on-route",
      location: "Near Green Park Metro",
      battery: 78,
      speed: 35,
      eta: "12 min",
      temperature: 24,
    },
    {
      id: "VH-002",
      name: "Delivery Van #2",
      driver: "Amit Singh",
      status: "loading",
      location: "IIT Delhi Gate 1",
      battery: 92,
      speed: 0,
      eta: "—",
    },
    {
      id: "VH-003",
      name: "Cargo Truck #1",
      driver: "Suresh Sharma",
      status: "on-route",
      location: "Ring Road, AIIMS",
      battery: 45,
      speed: 28,
      eta: "25 min",
      temperature: 22,
    },
    {
      id: "VH-004",
      name: "Delivery Bike #1",
      driver: "Vikram Patel",
      status: "idle",
      location: "Hauz Khas Village",
      battery: 100,
      speed: 0,
      eta: "—",
    },
  ];

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "on-route":
        return "bg-success/20 text-success border-success/30";
      case "idle":
        return "bg-muted text-muted-foreground border-border";
      case "loading":
        return "bg-primary/20 text-primary border-primary/30";
      case "maintenance":
        return "bg-warning/20 text-warning border-warning/30";
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-success";
    if (level > 30) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <section id="tracking" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">IoT Vehicle</span> Tracking
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of all delivery vehicles with IoT sensors
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          {[
            { label: "Total Vehicles", value: "12", icon: Truck },
            { label: "On Route", value: "7", icon: Navigation },
            { label: "Avg Speed", value: "32 km/h", icon: Gauge },
            { label: "Active Time", value: "8.5 hrs", icon: Clock },
          ].map((stat) => (
            <Card key={stat.label} variant="glass" className="p-4 text-center">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <Card
              key={vehicle.id}
              variant="glow"
              className="overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{vehicle.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${getStatusColor(vehicle.status)}`}
                  >
                    {vehicle.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{vehicle.location}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Battery */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Battery className="h-3 w-3" />
                      Battery
                    </div>
                    <Progress
                      value={vehicle.battery}
                      className="h-2"
                      indicatorClassName={getBatteryColor(vehicle.battery)}
                    />
                    <p className="text-xs font-medium">{vehicle.battery}%</p>
                  </div>

                  {/* Speed */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Gauge className="h-3 w-3" />
                      Speed
                    </div>
                    <p className="text-lg font-bold">{vehicle.speed}</p>
                    <p className="text-xs text-muted-foreground">km/h</p>
                  </div>

                  {/* ETA */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      ETA
                    </div>
                    <p className="text-lg font-bold">{vehicle.eta}</p>
                    <p className="text-xs text-muted-foreground">to dest</p>
                  </div>
                </div>

                {/* Temperature (if available) */}
                {vehicle.temperature && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 text-sm">
                    <ThermometerSun className="h-4 w-4 text-warning" />
                    <span className="text-muted-foreground">Cargo Temp:</span>
                    <span className="font-medium">{vehicle.temperature}°C</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleTracking;
