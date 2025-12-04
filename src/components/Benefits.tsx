import { Shield, Zap, Clock, Gift, HeartHandshake, BadgeCheck } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Earnings",
      description: "Your 20% commission is credited to your account instantly when your referral completes their deposit.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your funds and data are protected with bank-level security measures and encryption.",
    },
    {
      icon: Clock,
      title: "Quick Withdrawals",
      description: "Withdraw your earnings at any time directly to your bank account within 24 hours.",
    },
    {
      icon: Gift,
      title: "No Limits",
      description: "There's no cap on how much you can earn. The more you refer, the more you make.",
    },
    {
      icon: HeartHandshake,
      title: "Community Support",
      description: "Join a thriving community of earners and get support whenever you need it.",
    },
    {
      icon: BadgeCheck,
      title: "Transparent System",
      description: "Track all your referrals, earnings, and withdrawals in real-time on your dashboard.",
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
            Ubuntu offers more than just referral bonuses. Here's why thousands trust us.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default Benefits;
