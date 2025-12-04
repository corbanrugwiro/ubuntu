import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-card border border-border rounded-3xl p-12 md:p-16 shadow-elevated">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start
            <span className="text-gradient"> Earning?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join Ubuntu today with just 2,000 RWF and start earning 400 RWF for every friend you refer. 
            Your network is your net worth.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Trust badge */}
          <p className="mt-8 text-sm text-muted-foreground">
            🔒 Secure & Trusted by 10,000+ Members
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
