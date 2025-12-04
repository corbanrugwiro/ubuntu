import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Coins } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-up opacity-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Earn while you share</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            Grow Your Wealth
            <span className="block text-gradient">Through Community</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 stagger-2">
            Deposit 2,000 RWF to join Ubuntu and earn 20% commission (400 RWF) for every friend you refer. 
            Build your network, build your income.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up opacity-0 stagger-3">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Start Earning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/#how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-up opacity-0 stagger-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">2,000 RWF</p>
              <p className="text-sm text-muted-foreground">Entry Deposit</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">20%</p>
              <p className="text-sm text-muted-foreground">Per Referral</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">RWF</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">400 RWF</p>
              <p className="text-sm text-muted-foreground">Earn Per Friend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
