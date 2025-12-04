import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    category: "delivery",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }
    
    if (!formData.feedback.trim()) {
      toast.error("Please provide your feedback");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you for your feedback!");
  };

  const categories = [
    { value: "delivery", label: "Delivery Experience" },
    { value: "route", label: "Route Accuracy" },
    { value: "tracking", label: "Vehicle Tracking" },
    { value: "app", label: "App Experience" },
    { value: "other", label: "Other" },
  ];

  if (isSubmitted) {
    return (
      <section id="feedback" className="py-20">
        <div className="container mx-auto px-4">
          <Card variant="glow" className="max-w-2xl mx-auto p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Your feedback has been submitted successfully. We'll use it to improve our services.
            </p>
            <Button variant="outline" onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setFormData({
                name: "",
                email: "",
                orderId: "",
                category: "delivery",
                feedback: "",
              });
            }}>
              Submit Another Feedback
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="feedback" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Your Feedback</span> Matters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us improve our route optimization and delivery accuracy with your valuable feedback
          </p>
        </div>

        <Card variant="glow" className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Share Your Experience
            </CardTitle>
            <CardDescription>
              Your input helps our AI learn and improve delivery predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="space-y-2">
                <Label>Overall Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-warning text-warning"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-secondary/50"
                  />
                </div>
              </div>

              {/* Order ID & Category */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID (optional)</Label>
                  <Input
                    id="orderId"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    placeholder="ORD-2024-XXX"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  placeholder="Tell us about your experience... Was the route accurate? Was the delivery on time? Any suggestions for improvement?"
                  className="bg-secondary/50 min-h-[120px] resize-none"
                />
              </div>

              {/* Quick Tags */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Quick Tags (click to add)</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Fast Delivery",
                    "Accurate ETA",
                    "Helpful Driver",
                    "Route Issue",
                    "Delayed",
                    "Excellent Service",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const newFeedback = formData.feedback
                          ? `${formData.feedback} #${tag.replace(" ", "")}`
                          : `#${tag.replace(" ", "")}`;
                        setFormData({ ...formData, feedback: newFeedback });
                      }}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackForm;
