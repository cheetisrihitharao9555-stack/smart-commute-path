import { ArrowRight, MapPin, Zap, Clock } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-logistics-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-logistics-blue/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">AI-Powered Route Optimization for IIT Delhi Area</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Smart Logistics for</span>
            <br />
            <span className="gradient-text">Faster Deliveries</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Beat traffic congestion with AI-powered route optimization. Track vehicles in real-time and ensure on-time deliveries around IIT Delhi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Optimize Routes Now
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="glass" size="xl">
              Track Deliveries
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Zap, label: "Faster Routes", value: "40%" },
              { icon: Clock, label: "Time Saved", value: "25 min" },
              { icon: MapPin, label: "Areas Covered", value: "50+" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border/50 backdrop-blur-sm"
              >
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
