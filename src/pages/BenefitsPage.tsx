import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock, Gift, HeartHandshake, BadgeCheck, Smartphone, ArrowLeft, Play, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BenefitsPage = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Earnings",
      description: "Your task rewards and referral commissions are credited to your account instantly upon completion.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your funds and data are protected with bank-level security measures and encryption.",
    },
    {
      icon: Clock,
      title: "Quick Withdrawals",
      description: "Withdraw your earnings directly to your MTN Mobile Money within 5 minutes.",
    },
    {
      icon: Gift,
      title: "No Earning Limits",
      description: "There's no cap on how much you can earn. Complete more tasks and refer more friends to maximize income.",
    },
    {
      icon: HeartHandshake,
      title: "Community Support",
      description: "Join a thriving community of earners and get support whenever you need it.",
    },
    {
      icon: BadgeCheck,
      title: "Transparent System",
      description: "Track all your tasks, referrals, earnings, and withdrawals in real-time on your dashboard.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access the platform from any device. Complete tasks and earn money on the go.",
    },
    {
      icon: Play,
      title: "Fun Tasks",
      description: "Earn by watching entertaining TikTok videos and Instagram reels - it doesn't feel like work!",
    },
    {
      icon: Instagram,
      title: "Social Rewards",
      description: "Get paid to follow interesting Instagram accounts and discover new content creators.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Ubuntu?
            </h1>
            <p className="text-muted-foreground text-lg">
              Ubuntu offers more than just earnings. Here's why thousands of users trust us to grow their income.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group bg-gradient-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-soft">
                  <benefit.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">3,000+</p>
                <p className="text-primary-foreground/80">Active Users</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">50M+</p>
                <p className="text-primary-foreground/80">RWF Paid Out</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">5 min</p>
                <p className="text-primary-foreground/80">Avg. Withdrawal</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">24/7</p>
                <p className="text-primary-foreground/80">Platform Access</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of users already earning with Ubuntu.
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BenefitsPage;