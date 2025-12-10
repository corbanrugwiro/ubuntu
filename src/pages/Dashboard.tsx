import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
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
  TrendingUp,
  Play,
  Instagram,
  ExternalLink,
  ArrowDownToLine
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

interface Task {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  link: string;
  reward_amount: number;
  thumbnail_url: string | null;
}

interface TaskCompletion {
  task_id: string;
  completed_at: string;
}

const MTN_MERCHANT_CODE = "1905537";
const MIN_DEPOSIT = 3000;
const MIN_WITHDRAWAL = 10000;
const MIN_BALANCE = 3000;

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralFromUrl = searchParams.get("ref") || "";
  const [profile, setProfile] = useState<Profile | null>(null);
  const [referrals, setReferrals] = useState<ReferralEarning[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [dailyTasksCompleted, setDailyTasksCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState("3000");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPhone, setWithdrawPhone] = useState("");
  const [activeTab, setActiveTab] = useState<"tasks" | "referrals" | "withdraw">("tasks");

  useEffect(() => {
    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
      setWithdrawPhone(profileData.phone || "");
    } else if (!profileData && session.user) {
      // Profile doesn't exist (Google OAuth user) - create one
      let referrerId = null;
      
      // If there's a referral code, find the referrer
      if (referralFromUrl) {
        const { data: referrerData } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referralFromUrl)
          .maybeSingle();
        
        if (referrerData) {
          referrerId = referrerData.id;
        }
      }

      // Generate a unique referral code
      const { data: newReferralCode } = await supabase.rpc("generate_referral_code");
      
      // Create profile for Google OAuth user
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "User",
          phone: session.user.phone || "",
          referral_code: newReferralCode || `REF${Date.now()}`,
          referred_by: referrerId,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating profile:", createError);
      } else if (newProfile) {
        setProfile(newProfile);
      }
    }

    // Fetch referral earnings
    const { data: referralData } = await supabase
      .from("referral_earnings")
      .select("*")
      .eq("referrer_id", session.user.id)
      .order("created_at", { ascending: false });

    if (referralData) {
      setReferrals(referralData);
    }

    // Fetch tasks
    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (tasksData) {
      setTasks(tasksData);
    }

    // Fetch completed tasks
    const { data: completionsData } = await supabase
      .from("task_completions")
      .select("task_id, completed_at")
      .eq("user_id", session.user.id);

    if (completionsData) {
      setCompletedTasks(new Set(completionsData.map(c => c.task_id)));
      
      // Count today's completions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayCount = completionsData.filter(c => {
        const completedDate = new Date(c.completed_at);
        return completedDate >= today;
      }).length;
      setDailyTasksCompleted(todayCount);
    }

    setIsLoading(false);
  };

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

  const handleDeposit = async () => {
    const amount = parseInt(depositAmount);
    if (isNaN(amount) || amount < MIN_DEPOSIT) {
      toast({
        title: "Invalid Amount",
        description: `Minimum deposit is ${MIN_DEPOSIT.toLocaleString()} RWF`,
        variant: "destructive",
      });
      return;
    }

    // Create deposit record
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from("deposits").insert({
        user_id: session.user.id,
        amount,
        phone_number: profile?.phone || "",
        status: "pending",
      });
    }

    // Create USSD code and redirect
    const ussdCode = `*182*8*1*${MTN_MERCHANT_CODE}*${amount}%23`;
    window.location.href = `tel:${ussdCode}`;
    
    toast({
      title: "Dialing MTN Mobile Money",
      description: "Complete the payment on your phone to activate your account.",
    });
  };

  const handleCompleteTask = async (task: Task) => {
    if (!profile?.is_active) {
      toast({
        title: "Account Not Active",
        description: "Please make a deposit to activate your account first.",
        variant: "destructive",
      });
      return;
    }

    if (completedTasks.has(task.id)) {
      toast({
        title: "Already Completed",
        description: "You've already completed this task.",
        variant: "destructive",
      });
      return;
    }

    if (dailyTasksCompleted >= 20) {
      toast({
        title: "Daily Limit Reached",
        description: "You've completed your 20 tasks for today. Come back tomorrow!",
        variant: "destructive",
      });
      return;
    }

    // Open link in new tab
    window.open(task.link, "_blank");

    // Call database function to complete task
    const { data, error } = await supabase.rpc("complete_task", { p_task_id: task.id });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data) {
      toast({
        title: "Task Completed!",
        description: `You earned ${task.reward_amount} RWF!`,
      });
      
      setCompletedTasks(prev => new Set([...prev, task.id]));
      fetchData(); // Refresh balance
    }
  };

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    
    if (!profile?.is_active) {
      toast({
        title: "Account Not Active",
        description: "Please make a deposit to activate your account first.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(amount) || amount < MIN_WITHDRAWAL) {
      toast({
        title: "Invalid Amount",
        description: `Minimum withdrawal is ${MIN_WITHDRAWAL.toLocaleString()} RWF`,
        variant: "destructive",
      });
      return;
    }

    const balanceAfterWithdrawal = (profile?.balance || 0) - amount;
    if (balanceAfterWithdrawal < MIN_BALANCE) {
      toast({
        title: "Insufficient Balance",
        description: `Your balance cannot go below ${MIN_BALANCE.toLocaleString()} RWF after withdrawal.`,
        variant: "destructive",
      });
      return;
    }

    if (!withdrawPhone || withdrawPhone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid MTN number.",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Create withdrawal request
    const { error } = await supabase.from("withdrawal_requests").insert({
      user_id: session.user.id,
      amount,
      phone_number: withdrawPhone,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Deduct from balance
    await supabase
      .from("profiles")
      .update({ balance: balanceAfterWithdrawal })
      .eq("id", session.user.id);

    toast({
      title: "Withdrawal Requested!",
      description: "You'll receive your earnings to your MTN Mobile Money within 5 minutes.",
    });

    setWithdrawAmount("");
    fetchData();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return <Play className="h-5 w-5" />;
      case "instagram_follow":
      case "instagram_reel":
        return <Instagram className="h-5 w-5" />;
      default:
        return <Play className="h-5 w-5" />;
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "TikTok";
      case "instagram_follow":
        return "Instagram Follow";
      case "instagram_reel":
        return "Instagram Reel";
      default:
        return platform;
    }
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
              ? "Complete tasks and refer friends to earn!" 
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

        {/* Deposit Section for inactive users */}
        {!profile?.is_active && (
          <div className="bg-background border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Activate Your Account
            </h2>
            <p className="text-muted-foreground mb-6">
              Make a deposit of at least {MIN_DEPOSIT.toLocaleString()} RWF via MTN Mobile Money to activate your account and start earning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="amount">Amount (RWF)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={MIN_DEPOSIT}
                  placeholder={`Minimum ${MIN_DEPOSIT.toLocaleString()} RWF`}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                className="sm:self-end"
                onClick={handleDeposit}
              >
                <Phone className="h-5 w-5 mr-2" />
                Pay with MTN MoMo
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === "tasks" ? "default" : "outline"}
            onClick={() => setActiveTab("tasks")}
          >
            <Play className="h-4 w-4 mr-2" />
            Earn Tasks
          </Button>
          <Button
            variant={activeTab === "referrals" ? "default" : "outline"}
            onClick={() => setActiveTab("referrals")}
          >
            <Users className="h-4 w-4 mr-2" />
            Referrals
          </Button>
          <Button
            variant={activeTab === "withdraw" ? "default" : "outline"}
            onClick={() => setActiveTab("withdraw")}
          >
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </div>

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="bg-background border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Available Tasks
              </h2>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-foreground">
                  {dailyTasksCompleted}/20 today
                </span>
                {dailyTasksCompleted >= 20 && (
                  <span className="text-xs text-primary">Limit reached</span>
                )}
              </div>
            </div>

            {!profile?.is_active && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  ⚠️ Activate your account with a deposit to start completing tasks and earning!
                </p>
              </div>
            )}

            {dailyTasksCompleted >= 20 && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                <p className="text-primary text-sm">
                  🎉 Great job! You've completed all 20 tasks for today. Come back tomorrow for more!
                </p>
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tasks available right now. Check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => {
                  const isCompleted = completedTasks.has(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border ${
                        isCompleted 
                          ? "bg-green-500/5 border-green-500/20" 
                          : "bg-card border-border hover:border-primary/50"
                      } transition-colors`}
                    >
                      <div className="flex items-start gap-4">
                        {task.thumbnail_url ? (
                          <img 
                            src={task.thumbnail_url} 
                            alt={task.title}
                            className="h-12 w-12 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isCompleted ? "bg-green-500/10" : "bg-primary/10"
                          }`}>
                            {getPlatformIcon(task.platform)}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{task.title}</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {getPlatformLabel(task.platform)}
                            </span>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">+{task.reward_amount} RWF</span>
                            <Button
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              disabled={isCompleted || !profile?.is_active || dailyTasksCompleted >= 20}
                              onClick={() => handleCompleteTask(task)}
                            >
                              {isCompleted ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Done
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Complete
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === "referrals" && (
          <div className="space-y-6">
            {/* Referral Link */}
            <div className="bg-background border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Your Referral Link
              </h2>
              <p className="text-muted-foreground mb-6">
                Share your unique referral link and earn 20% for every friend who joins and deposits!
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
            <div className="bg-background border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
                Referral Earnings
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
        )}

        {/* Withdraw Tab */}
        {activeTab === "withdraw" && (
          <div className="bg-background border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ArrowDownToLine className="h-5 w-5 text-primary" />
              Withdraw Earnings
            </h2>
            <p className="text-muted-foreground mb-6">
              Withdraw your earnings to your MTN Mobile Money. Minimum withdrawal is {MIN_WITHDRAWAL.toLocaleString()} RWF. 
              Balance must remain at least {MIN_BALANCE.toLocaleString()} RWF after withdrawal.
            </p>

            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="withdrawPhone">MTN Number</Label>
                <Input
                  id="withdrawPhone"
                  type="tel"
                  placeholder="078XXXXXXX"
                  value={withdrawPhone}
                  onChange={(e) => setWithdrawPhone(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Amount (RWF)</Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  min={MIN_WITHDRAWAL}
                  placeholder={`Minimum ${MIN_WITHDRAWAL.toLocaleString()} RWF`}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Available: {profile?.balance?.toLocaleString() || 0} RWF | Max withdrawal: {Math.max(0, (profile?.balance || 0) - MIN_BALANCE).toLocaleString()} RWF
                </p>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleWithdraw}
                disabled={!profile?.is_active}
              >
                <ArrowDownToLine className="h-5 w-5 mr-2" />
                Request Withdrawal
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You'll receive your earnings within 5 minutes to your MTN Mobile Money.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;