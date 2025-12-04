import { UserPlus, Share2, Wallet, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Deposit",
      description: "Create your account and make an initial deposit of ₦2,000 to activate your membership.",
      step: "01",
    },
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Get your unique referral link and share it with friends, family, and your network.",
      step: "02",
    },
    {
      icon: Wallet,
      title: "Earn Commissions",
      description: "Receive 20% (₦400) instantly for every person who joins using your referral link.",
      step: "03",
    },
    {
      icon: TrendingUp,
      title: "Grow & Withdraw",
      description: "Watch your earnings grow and withdraw your funds anytime to your bank account.",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default HowItWorks;
