import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MapPin, Navigation, Sparkles, Clock, Fuel, Route, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OptimizedRoute {
  distance: string;
  duration: string;
  fuelSaved: string;
  co2Reduced: string;
  waypoints: string[];
}

const RouteOptimizer = () => {
  const [origin, setOrigin] = useState("IIT Delhi Main Gate");
  const [destination, setDestination] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);

  const handleOptimize = async () => {
    if (!destination) {
      toast.error("Please enter a destination");
      return;
    }

    setIsOptimizing(true);
    
    // Simulate AI optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOptimizedRoute({
      distance: "8.2 km",
      duration: "18 min",
      fuelSaved: "1.2 L",
      co2Reduced: "2.8 kg",
      waypoints: ["Hauz Khas Village", "Green Park Metro", "AIIMS Flyover", destination],
    });
    
    setIsOptimizing(false);
    toast.success("Route optimized successfully!");
  };

  return (
    <section id="optimizer" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">AI Route</span> Optimizer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes real-time traffic data to find the fastest, most fuel-efficient routes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input Form */}
          <Card variant="glow" className="p-6">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Route Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-sm flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-success" />
                  Origin
                </Label>
                <Input
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Enter pickup location"
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter delivery location"
                  className="bg-secondary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Vehicle Type</Label>
                  <select className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Delivery Van</option>
                    <option>Truck</option>
                    <option>Bike</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Priority</Label>
                  <select className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Fastest</option>
                    <option>Eco-friendly</option>
                    <option>Shortest</option>
                  </select>
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full"
                onClick={handleOptimize}
                disabled={isOptimizing}
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Optimizing Route...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Optimize Route with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card variant="glass" className="p-6">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-primary" />
                Optimized Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {optimizedRoute ? (
                <div className="space-y-6 animate-fade-in">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Route, label: "Distance", value: optimizedRoute.distance },
                      { icon: Clock, label: "Duration", value: optimizedRoute.duration },
                      { icon: Fuel, label: "Fuel Saved", value: optimizedRoute.fuelSaved },
                      { icon: Sparkles, label: "CO₂ Reduced", value: optimizedRoute.co2Reduced },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                      >
                        <stat.icon className="h-4 w-4 text-primary mb-2" />
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Waypoints */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Route Waypoints</h4>
                    <div className="relative pl-6">
                      {optimizedRoute.waypoints.map((waypoint, index) => (
                        <div key={index} className="relative pb-4 last:pb-0">
                          {/* Line */}
                          {index !== optimizedRoute.waypoints.length - 1 && (
                            <div className="absolute left-[-18px] top-3 w-0.5 h-full bg-border" />
                          )}
                          {/* Dot */}
                          <div
                            className={`absolute left-[-22px] top-1 w-3 h-3 rounded-full ${
                              index === optimizedRoute.waypoints.length - 1
                                ? "bg-primary"
                                : "bg-secondary border-2 border-border"
                            }`}
                          />
                          <p className="text-sm">{waypoint}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View on Map
                  </Button>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                    <Route className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter your destination and click optimize to see AI-powered route suggestions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RouteOptimizer;
