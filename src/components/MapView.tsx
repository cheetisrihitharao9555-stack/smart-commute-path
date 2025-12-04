import { useState } from "react";
import { Card } from "./ui/card";
import { MapPin, Navigation, AlertTriangle, CheckCircle } from "lucide-react";

interface RoutePoint {
  id: string;
  name: string;
  type: "origin" | "destination" | "waypoint" | "congestion";
  x: number;
  y: number;
}

const MapView = () => {
  const [selectedRoute, setSelectedRoute] = useState<"fast" | "eco" | "standard">("fast");

  const points: RoutePoint[] = [
    { id: "1", name: "IIT Delhi Main Gate", type: "origin", x: 20, y: 50 },
    { id: "2", name: "Hauz Khas", type: "waypoint", x: 35, y: 35 },
    { id: "3", name: "Green Park", type: "congestion", x: 50, y: 45 },
    { id: "4", name: "AIIMS", type: "waypoint", x: 65, y: 55 },
    { id: "5", name: "Connaught Place", type: "destination", x: 80, y: 40 },
  ];

  const congestionAreas = [
    { x: 45, y: 40, level: "high" },
    { x: 55, y: 60, level: "medium" },
    { x: 30, y: 55, level: "low" },
  ];

  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Live Traffic</span> & Route Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time traffic visualization around IIT Delhi with AI-optimized delivery routes
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map */}
          <Card variant="glass" className="lg:col-span-3 p-4 min-h-[500px] relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 map-grid opacity-50" />
            
            {/* Map Content */}
            <div className="relative h-full">
              {/* Route Path - SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Optimal Route */}
                <path
                  d={`M ${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y - 10} ${points[1].x} ${points[1].y} Q ${points[2].x - 5} ${points[2].y + 5} ${points[3].x} ${points[3].y} Q ${points[4].x - 5} ${points[4].y + 5} ${points[4].x} ${points[4].y}`}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="2,1"
                  className="animate-route-dash"
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(187 85% 53%)" />
                    <stop offset="100%" stopColor="hsl(217 91% 60%)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Congestion Areas */}
              {congestionAreas.map((area, index) => (
                <div
                  key={index}
                  className={`absolute w-12 h-12 rounded-full opacity-40 ${
                    area.level === "high"
                      ? "bg-destructive"
                      : area.level === "medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse-ring bg-inherit" />
                </div>
              ))}

              {/* Route Points */}
              {points.map((point) => (
                <div
                  key={point.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Point Marker */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-125 ${
                      point.type === "origin"
                        ? "bg-success"
                        : point.type === "destination"
                        ? "bg-primary"
                        : point.type === "congestion"
                        ? "bg-warning"
                        : "bg-secondary border border-border"
                    }`}
                  >
                    {point.type === "origin" && <Navigation className="h-4 w-4 text-success-foreground" />}
                    {point.type === "destination" && <MapPin className="h-4 w-4 text-primary-foreground" />}
                    {point.type === "congestion" && <AlertTriangle className="h-4 w-4 text-warning-foreground" />}
                    {point.type === "waypoint" && <div className="w-2 h-2 rounded-full bg-foreground" />}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-popover border border-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {point.name}
                  </div>
                </div>
              ))}

              {/* Vehicle Icons */}
              <div
                className="absolute animate-float"
                style={{ left: "42%", top: "42%", transform: "translate(-50%, -50%)" }}
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center glow-cyan">
                  <span className="text-xs">🚚</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="text-muted-foreground">Heavy Traffic</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <span className="text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="text-muted-foreground">Clear</span>
              </div>
            </div>
          </Card>

          {/* Route Options */}
          <div className="space-y-4">
            <Card variant="glow" className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Route Options
              </h3>
              <div className="space-y-2">
                {[
                  { id: "fast", label: "Fastest Route", time: "18 min", distance: "8.2 km" },
                  { id: "eco", label: "Eco Route", time: "24 min", distance: "7.1 km" },
                  { id: "standard", label: "Standard", time: "22 min", distance: "7.8 km" },
                ].map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id as any)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedRoute === route.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50 border border-transparent hover:border-border"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{route.label}</span>
                      {selectedRoute === route.id && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{route.time}</span>
                      <span>•</span>
                      <span>{route.distance}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="glass" className="p-4">
              <h3 className="font-semibold mb-3">Traffic Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Heavy congestion</p>
                    <p className="text-xs text-muted-foreground">Green Park area - 15 min delay</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-warning/10">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Road work ahead</p>
                    <p className="text-xs text-muted-foreground">Ring Road - Single lane</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapView;
