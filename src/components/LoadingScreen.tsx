import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Logo */}
      <div className="mb-8 animate-scale-in">
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center animate-pulse-glow">
            <span className="text-4xl font-bold text-primary-foreground">U</span>
          </div>
          <div className="absolute -inset-2 rounded-3xl border-2 border-primary/20 animate-loader-spin" style={{ borderTopColor: 'hsl(var(--primary))' }} />
        </div>
      </div>

      {/* Brand name */}
      <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-up stagger-1 opacity-0">
        Ubuntu
      </h1>
      <p className="text-muted-foreground mb-8 animate-fade-up stagger-2 opacity-0">
        Community Rewards Platform
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-secondary rounded-full overflow-hidden animate-fade-up stagger-3 opacity-0">
        <div 
          className="h-full bg-gradient-primary rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <p className="mt-4 text-sm text-muted-foreground animate-fade-up stagger-4 opacity-0">
        Loading... {progress}%
      </p>
    </div>
  );
};

export default LoadingScreen;
