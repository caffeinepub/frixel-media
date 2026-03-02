import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, loginStatus, isLoggingIn, isLoginError, identity } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: "/dashboard" });
    }
  }, [identity, navigate]);

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
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to your Frixel Media account
            </p>
          </div>

          {/* Error */}
          {isLoginError && (
            <div className="mb-5 flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">
                Login failed. Please try again.
              </p>
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={login}
            disabled={isLoggingIn || loginStatus === "initializing"}
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
                Sign In with Internet Identity
              </>
            )}
          </Button>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              New here?{" "}
              <Link
                to="/register"
                className="text-gold font-semibold hover:text-gold-dark transition-colors"
              >
                Create your account
              </Link>
            </p>
          </div>

          <div className="mt-5 text-center">
            <p className="text-muted-foreground/50 text-xs">
              Secured by Internet Identity. No password needed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
