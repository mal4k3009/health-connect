import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Stethoscope, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authIllustration from "@/assets/auth-illustration.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Sign Up — MediBook" },
      { name: "description", content: "Sign in to MediBook to book appointments, order medicines and manage your healthcare." },
      { property: "og:title", content: "Login or Sign Up — MediBook" },
      { property: "og:description", content: "Sign in to MediBook." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(tab === "login" ? "Welcome back!" : "Account created!");
    setTimeout(() => navigate({ to: "/" }), 800);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] gradient-hero">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:px-8">
        <div className="hidden lg:block">
          <Link to="/" className="mb-8 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary"><Stethoscope className="h-5 w-5 text-primary-foreground" /></div>
            <span className="text-lg font-bold">MediBook</span>
          </Link>
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={authIllustration} alt="Healthcare illustration" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Healthcare made simple.</h2>
          <p className="mt-2 text-muted-foreground">Join over 1 million patients already using MediBook.</p>
        </div>

        <div className="rounded-3xl bg-card p-8 shadow-elevated md:p-10">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            <button onClick={() => setTab("login")} className={`rounded-lg py-2.5 text-sm font-semibold transition-smooth ${tab === "login" ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Login</button>
            <button onClick={() => setTab("signup")} className={`rounded-lg py-2.5 text-sm font-semibold transition-smooth ${tab === "signup" ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Sign Up</button>
          </div>

          <h1 className="mt-6 text-2xl font-bold">{tab === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tab === "login" ? "Sign in to access your account" : "Start your healthcare journey with MediBook"}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {tab === "signup" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required placeholder="First Name" className="h-12 rounded-xl pl-10" /></div>
                  <div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required placeholder="Last Name" className="h-12 rounded-xl pl-10" /></div>
                </div>
                <div className="relative"><Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="tel" placeholder="Mobile Number" className="h-12 rounded-xl pl-10" /></div>
              </>
            )}
            <div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="email" placeholder={tab === "login" ? "Email or Mobile" : "Email Address"} className="h-12 rounded-xl pl-10" /></div>
            <div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="password" placeholder="Password" className="h-12 rounded-xl pl-10" /></div>
            {tab === "signup" && (
              <div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="password" placeholder="Confirm Password" className="h-12 rounded-xl pl-10" /></div>
            )}

            {tab === "login" && (
              <div className="text-right text-xs"><a href="#" className="text-primary hover:underline">Forgot password?</a></div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full">{tab === "login" ? "Login" : "Sign Up"}</Button>

            <div className="relative my-4 text-center text-xs text-muted-foreground"><span className="bg-card px-3 relative z-10">OR</span><div className="absolute inset-x-0 top-1/2 h-px bg-border" /></div>

            <button type="button" onClick={() => toast.info("Google sign-in coming soon")} className="flex w-full items-center justify-center gap-2 rounded-xl border bg-background px-4 py-3 text-sm font-medium transition-smooth hover:bg-secondary">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              {tab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => setTab(tab === "login" ? "signup" : "login")} className="font-semibold text-primary hover:underline">
                {tab === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
