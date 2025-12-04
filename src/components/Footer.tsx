import { Truck, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-logistics-cyan to-logistics-blue flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Route</span>
                <span className="text-foreground">Wise</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered logistics solutions for faster, smarter deliveries around IIT Delhi and beyond.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
              <li><a href="#optimizer" className="hover:text-foreground transition-colors">Route Optimizer</a></li>
              <li><a href="#tracking" className="hover:text-foreground transition-colors">Vehicle Tracking</a></li>
              <li><a href="#feedback" className="hover:text-foreground transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">AI Route Planning</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">IoT Fleet Management</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Traffic Analytics</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Delivery Scheduling</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                IIT Delhi, New Delhi - 110016
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                support@routewise.ai
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 RouteWise. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
