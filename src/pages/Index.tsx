import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapView from "@/components/MapView";
import RouteOptimizer from "@/components/RouteOptimizer";
import VehicleTracking from "@/components/VehicleTracking";
import DeliveryUpdates from "@/components/DeliveryUpdates";
import FeedbackForm from "@/components/FeedbackForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MapView />
        <RouteOptimizer />
        <VehicleTracking />
        <DeliveryUpdates />
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
