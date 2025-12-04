import { UserPlus, Share2, Wallet, TrendingUp, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Deposit",
      description: "Create your account and make an initial deposit starting from 3,000 RWF via MTN Mobile Money.",
      step: "01",
    },
    {
      icon: Play,
      title: "Complete Tasks",
      description: "Watch TikToks, follow Instagram accounts, and watch reels to earn rewards.",
      step: "02",
    },
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Get your unique referral code and share it with friends to earn 20% commission.",
      step: "03",
    },
    {
      icon: Wallet,
      title: "Withdraw Earnings",
      description: "Withdraw your earnings (min 10,000 RWF) via MTN Mobile Money within 5 minutes.",
      step: "04",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Getting started with Ubuntu is easy. Follow these simple steps to begin earning.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative bg-gradient-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                {/* Step number */}
                <span className="absolute -top-4 -right-4 text-6xl font-bold text-primary/10 select-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
