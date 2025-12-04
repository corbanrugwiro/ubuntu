import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  Users, 
  Copy, 
  Check, 
  ArrowUpRight, 
  LogOut,
  Phone,
  TrendingUp
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  referral_code: string;
  balance: number;
  total_earned: number;
  is_active: boolean;
}

interface ReferralEarning {
  id: string;
  amount: number;
  created_at: string;
  referred_id: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [referrals, setReferrals] = useState<ReferralEarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState("2000");
  const [mtnCode, setMtnCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else if (profileData) {
        setProfile(profileData);
      }

      // Fetch referral earnings
      const { data: referralData, error: referralError } = await supabase
        .from("referral_earnings")
        .select("*")
        .eq("referrer_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!referralError && referralData) {
        setReferrals(referralData);
      }

      setIsLoading(false);
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const copyReferralLink = () => {
    if (!profile) return;
    const link = `${window.location.origin}/register?ref=${profile.referral_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (isNaN(amount) || amount < 2000) {
      toast({
        title: "Invalid Amount",
        description: "Minimum deposit is 2,000 RWF",
        variant: "destructive",
      });
      return;
    }

    if (!mtnCode) {
      toast({
        title: "MTN Code Required",
        description: "Please enter the MTN merchant code provided by admin",
        variant: "destructive",
      });
      return;
    }

    // Create USSD code and redirect
    const ussdCode = `*182*8*1*${mtnCode}*${amount}%23`;
    window.location.href = `tel:${ussdCode}`;
    
    toast({
      title: "Dialing MTN Mobile Money",
      description: "Complete the payment on your phone to activate your account.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">U</span>
            </div>
            <span className="text-xl font-bold text-foreground">Ubuntu</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {profile?.full_name || "User"}!
          </h1>
          <p className="text-muted-foreground">
            {profile?.is_active 
              ? "Your account is active. Start referring to earn!" 
              : "Make your first deposit to activate your account and start earning."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-foreground">{profile?.balance?.toLocaleString() || 0} RWF</p>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-foreground">{profile?.total_earned?.toLocaleString() || 0} RWF</p>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold text-foreground">{referrals.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deposit Section */}
          {!profile?.is_active && (
            <div className="bg-background border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Make a Deposit
              </h2>
              <p className="text-muted-foreground mb-6">
                Deposit via MTN Mobile Money to activate your account and start earning referral commissions.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mtnCode">MTN Merchant Code</Label>
                  <Input
                    id="mtnCode"
                    type="text"
                    placeholder="Enter code provided by admin"
                    value={mtnCode}
                    onChange={(e) => setMtnCode(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (RWF)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="2000"
                    placeholder="Minimum 2,000 RWF"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Minimum deposit: 2,000 RWF</p>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleDeposit}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Pay with MTN Mobile Money
                </Button>
              </div>
            </div>
          )}

          {/* Referral Section */}
          <div className="bg-background border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Your Referral Link
            </h2>
            <p className="text-muted-foreground mb-6">
              Share your unique referral link and earn 400 RWF for every friend who joins!
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Referral Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={profile?.referral_code || "Loading..."}
                    readOnly
                    className="h-12 font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={copyReferralLink}
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-2">Your referral link:</p>
                <p className="text-sm font-medium text-foreground break-all">
                  {`${window.location.origin}/register?ref=${profile?.referral_code}`}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="bg-background border border-border rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              Recent Referral Earnings
            </h2>

            {referrals.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No referrals yet. Share your link to start earning!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {referrals.map((earning) => (
                  <div 
                    key={earning.id}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Referral Commission</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(earning.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-primary">+{earning.amount} RWF</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
