import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  LogOut, 
  Play, 
  Instagram, 
  Users,
  Wallet,
  Check,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  link: string;
  reward_amount: number;
  is_active: boolean;
  created_at: string;
}

interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  phone_number: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"tasks" | "withdrawals">("tasks");
  
  // New task form
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    platform: "tiktok",
    link: "",
    reward_amount: "50",
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/login");
      return;
    }

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
    fetchData();
  };

  const fetchData = async () => {
    // Fetch tasks
    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (tasksData) {
      setTasks(tasksData);
    }

    // Fetch withdrawal requests
    const { data: withdrawalData } = await supabase
      .from("withdrawal_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (withdrawalData) {
      setWithdrawals(withdrawalData);
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.link) {
      toast({
        title: "Missing Fields",
        description: "Please fill in title and link.",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase.from("tasks").insert({
      title: newTask.title,
      description: newTask.description || null,
      platform: newTask.platform,
      link: newTask.link,
      reward_amount: parseFloat(newTask.reward_amount),
      created_by: session?.user.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Task Created",
      description: "New task has been added successfully.",
    });

    setNewTask({
      title: "",
      description: "",
      platform: "tiktok",
      link: "",
      reward_amount: "50",
    });

    fetchData();
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Task Deleted",
      description: "Task has been removed.",
    });

    fetchData();
  };

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_active: !currentStatus })
      .eq("id", taskId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    fetchData();
  };

  const handleProcessWithdrawal = async (withdrawalId: string, status: "completed" | "rejected") => {
    const { error } = await supabase
      .from("withdrawal_requests")
      .update({ 
        status, 
        processed_at: new Date().toISOString() 
      })
      .eq("id", withdrawalId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: status === "completed" ? "Withdrawal Approved" : "Withdrawal Rejected",
      description: `Withdrawal has been ${status}.`,
    });

    fetchData();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return <Play className="h-4 w-4" />;
      case "instagram_follow":
      case "instagram_reel":
        return <Instagram className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
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
            <span className="text-xl font-bold text-foreground">Admin Panel</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "tasks" ? "default" : "outline"}
            onClick={() => setActiveTab("tasks")}
          >
            <Play className="h-4 w-4 mr-2" />
            Manage Tasks
          </Button>
          <Button
            variant={activeTab === "withdrawals" ? "default" : "outline"}
            onClick={() => setActiveTab("withdrawals")}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Withdrawals ({withdrawals.filter(w => w.status === "pending").length})
          </Button>
        </div>

        {activeTab === "tasks" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Task Form */}
            <div className="bg-background border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Task
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Watch TikTok Video"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Task description..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select
                    value={newTask.platform}
                    onValueChange={(value) => setNewTask({ ...newTask, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiktok">TikTok Video</SelectItem>
                      <SelectItem value="instagram_follow">Instagram Follow</SelectItem>
                      <SelectItem value="instagram_reel">Instagram Reel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="https://..."
                    value={newTask.link}
                    onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward">Reward (RWF)</Label>
                  <Input
                    id="reward"
                    type="number"
                    min="10"
                    value={newTask.reward_amount}
                    onChange={(e) => setNewTask({ ...newTask, reward_amount: e.target.value })}
                  />
                </div>

                <Button className="w-full" onClick={handleCreateTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </div>

            {/* Tasks List */}
            <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Active Tasks ({tasks.length})
              </h2>

              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No tasks yet. Create your first task!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-4 rounded-xl border ${
                        task.is_active ? "bg-card border-border" : "bg-muted/50 border-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          task.is_active ? "bg-primary/10" : "bg-muted"
                        }`}>
                          {getPlatformIcon(task.platform)}
                        </div>
                        <div>
                          <p className={`font-medium ${task.is_active ? "text-foreground" : "text-muted-foreground"}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {task.reward_amount} RWF • {task.platform.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleTask(task.id, task.is_active)}
                        >
                          {task.is_active ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "withdrawals" && (
          <div className="bg-background border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Withdrawal Requests
            </h2>

            {withdrawals.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No withdrawal requests yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {withdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {withdrawal.amount.toLocaleString()} RWF
                        </p>
                        <p className="text-sm text-muted-foreground">
                          MTN: {withdrawal.phone_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(withdrawal.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {withdrawal.status === "pending" ? (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleProcessWithdrawal(withdrawal.id, "completed")}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleProcessWithdrawal(withdrawal.id, "rejected")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          withdrawal.status === "completed" 
                            ? "bg-green-500/10 text-green-500" 
                            : "bg-red-500/10 text-red-500"
                        }`}>
                          {withdrawal.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;