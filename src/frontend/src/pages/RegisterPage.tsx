import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

export default function RegisterPage() {
  const { login, identity, isLoggingIn, isLoginError } = useInternetIdentity();
  const navigate = useNavigate();
  const { mutateAsync: saveProfile, isPending } = useSaveCallerUserProfile();

  const [displayName, setDisplayName] = useState("");
  const [step, setStep] = useState<"connect" | "profile">("connect");

  useEffect(() => {
    if (identity && step === "connect") {
      setStep("profile");
    }
  }, [identity, step]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Please enter a display name.");
      return;
    }
    try {
      await saveProfile({
        displayName: displayName.trim(),
        roleLabel: "Team Member",
      });
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <section className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-20 bg-secondary/20">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-card border border-border p-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img
                src="/assets/generated/frixel-logo-mark-transparent.png"
                alt="Frixel Media"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="font-display font-black text-2xl text-foreground">
              {step === "connect" ? "Create Account" : "Set Up Your Profile"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {step === "connect"
                ? "Join Frixel Media's team portal"
                : "Just one more step — tell us your name"}
            </p>
          </div>

          {isLoginError && (
            <div className="mb-5 flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">
                Login failed. Please try again.
              </p>
            </div>
          )}

          {step === "connect" ? (
            <>
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full py-6 bg-gold text-gold-foreground hover:bg-gold-dark font-bold text-base rounded-xl shadow-gold transition-all duration-200"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Connect with Internet Identity
                  </>
                )}
              </Button>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-gold font-semibold hover:text-gold-dark transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="displayName"
                  className="text-sm font-semibold text-foreground"
                >
                  Display Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name or team alias"
                  required
                  autoFocus
                  className="border-border focus:border-gold"
                />
              </div>

              <div className="bg-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Connected:</strong>{" "}
                  {identity?.getPrincipal().toString().slice(0, 20)}...
                </p>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-6 bg-gold text-gold-foreground hover:bg-gold-dark font-bold text-base rounded-xl shadow-gold transition-all duration-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
