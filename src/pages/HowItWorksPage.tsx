import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Share2, Wallet, TrendingUp, Play, Instagram, Users, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Deposit",
      description: "Create your account and make an initial deposit starting from 3,000 RWF via MTN Mobile Money to activate your membership.",
      step: "01",
    },
    {
      icon: Play,
      title: "Complete Tasks",
      description: "Watch TikTok videos, follow Instagram accounts, and watch Instagram reels to earn rewards for each completed task.",
      step: "02",
    },
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Get your unique referral code and share it with friends, family, and your network to earn referral commissions.",
      step: "03",
    },
    {
      icon: Wallet,
      title: "Earn Commissions",
      description: "Receive 40% commission instantly for every person who joins using your referral code and completes their deposit.",
      step: "04",
    },
    {
      icon: TrendingUp,
      title: "Grow & Withdraw",
      description: "Watch your earnings grow and withdraw your funds (minimum 10,000 RWF) via MTN Mobile Money within 5 minutes.",
      step: "05",
    },
  ];

  const earningMethods = [
    {
      icon: Play,
      title: "Watch TikTok Videos",
      description: "Watch short TikTok videos posted by our partners and earn rewards for each video watched.",
      reward: "50+ RWF per video",
    },
    {
      icon: Instagram,
      title: "Follow Instagram Accounts",
      description: "Follow Instagram accounts shared by admin and earn rewards instantly.",
      reward: "100+ RWF per follow",
    },
    {
      icon: Instagram,
      title: "Watch Instagram Reels",
      description: "Watch engaging Instagram reels and earn rewards for your time.",
      reward: "50+ RWF per reel",
    },
    {
      icon: Users,
      title: "Refer Friends",
      description: "Share your unique referral code and earn 40% of every deposit made by your referrals.",
      reward: "40% of deposits",
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
              How It Works
            </h1>
            <p className="text-muted-foreground text-lg">
              Getting started with Ubuntu is easy. Follow these simple steps to begin earning money from your phone.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative group"
              >
                <div className="relative bg-gradient-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                  <span className="absolute -top-3 -right-3 text-5xl font-bold text-primary/10 select-none">
                    {step.step}
                  </span>

                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Earning Methods */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
                Multiple Ways to Earn
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How You Can Earn
              </h2>
              <p className="text-muted-foreground">
                We offer multiple ways to earn money. Complete tasks, refer friends, and watch your balance grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earningMethods.map((method) => (
                <div
                  key={method.title}
                  className="bg-background border border-border rounded-2xl p-6 flex gap-4 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <method.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {method.description}
                    </p>
                    <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                      {method.reward}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/register">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Start Earning Today
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;