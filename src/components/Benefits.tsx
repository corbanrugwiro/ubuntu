import { Shield, Zap, Clock, Gift, HeartHandshake, BadgeCheck, Play, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Earnings",
      description: "Your task rewards and referral commissions are credited instantly to your account.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your funds and data are protected with bank-level security measures.",
    },
    {
      icon: Clock,
      title: "5-Minute Withdrawals",
      description: "Withdraw your earnings directly to your MTN Mobile Money within 5 minutes.",
    },
    {
      icon: Play,
      title: "Fun Tasks",
      description: "Earn by watching TikTok videos and Instagram reels - it doesn't feel like work!",
    },
    {
      icon: Instagram,
      title: "Social Rewards",
      description: "Get paid to follow interesting Instagram accounts and discover new content.",
    },
    {
      icon: Gift,
      title: "No Limits",
      description: "There's no cap on how much you can earn. Complete more tasks to earn more.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Benefits of Joining
          </h2>
          <p className="text-muted-foreground text-lg">
            Ubuntu offers multiple ways to earn money. Here's why thousands trust us.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-background border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-soft">
                <benefit.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/benefits">
            <Button variant="outline" size="lg">
              See All Benefits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
