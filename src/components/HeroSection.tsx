import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Coins, Play, Instagram } from "lucide-react";

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
            <span className="text-sm font-medium">Earn while you scroll</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            Watch, Follow & Earn
            <span className="block text-gradient">Real Money</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 stagger-2">
            Watch TikTok videos, follow Instagram accounts, and watch reels to earn money. 
            Plus earn 40% commission for every friend you refer!
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
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up opacity-0 stagger-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5">
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">3,000</p>
              <p className="text-xs text-muted-foreground">RWF Min Deposit</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5">
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">50+</p>
              <p className="text-xs text-muted-foreground">RWF Per Task</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5">
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">40%</p>
              <p className="text-xs text-muted-foreground">Referral Bonus</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5">
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">5 min</p>
              <p className="text-xs text-muted-foreground">Withdrawal Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
