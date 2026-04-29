import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Stethoscope, Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authIllustration from "@/assets/auth-illustration.jpg";
import { signIn, signUp, type UserRole } from "@/lib/auth";

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
  const [loading, setLoading] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tab === "signup") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }
        const profile = await signUp(email, password, `${firstName} ${lastName}`, phone, role);
        toast.success("Account created! Welcome to MediBook 🎉");
        navigate({ to: profile.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient" });
      } else {
        const profile = await signIn(email, password);
        toast.success(`Welcome back, ${profile.name}!`);
        navigate({ to: profile.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient" });
      }
    } catch (err: any) {
      const msg = err?.code === "auth/invalid-credential" || err?.code === "auth/user-not-found"
        ? "Invalid email or password"
        : err?.code === "auth/email-already-in-use"
          ? "Email is already registered"
          : err?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
          {/* Tab switcher */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            <button onClick={() => setTab("login")} className={`rounded-lg py-2.5 text-sm font-semibold transition-smooth ${tab === "login" ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Login</button>
            <button onClick={() => setTab("signup")} className={`rounded-lg py-2.5 text-sm font-semibold transition-smooth ${tab === "signup" ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Sign Up</button>
          </div>

          <h1 className="mt-6 text-2xl font-bold">{tab === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tab === "login" ? "Sign in to access your account" : "Start your healthcare journey with MediBook"}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {tab === "signup" && (
              <>
                {/* Role selector */}
                <div>
                  <div className="mb-2 text-xs font-medium text-muted-foreground">I AM A</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole("patient")}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-smooth ${role === "patient" ? "gradient-primary text-primary-foreground border-transparent" : "hover:bg-secondary"}`}
                    >
                      👤 Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("doctor")}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-smooth ${role === "doctor" ? "gradient-primary text-primary-foreground border-transparent" : "hover:bg-secondary"}`}
                    >
                      🩺 Doctor
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="h-12 rounded-xl pl-10" /></div>
                  <div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="h-12 rounded-xl pl-10" /></div>
                </div>
                <div className="relative"><Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile Number" className="h-12 rounded-xl pl-10" /></div>
              </>
            )}

            <div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tab === "login" ? "Email Address" : "Email Address"} className="h-12 rounded-xl pl-10" /></div>
            <div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="h-12 rounded-xl pl-10" /></div>

            {tab === "signup" && (
              <div className="relative"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="h-12 rounded-xl pl-10" /></div>
            )}

            {tab === "login" && (
              <div className="text-right text-xs"><a href="#" className="text-primary hover:underline">Forgot password?</a></div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait...</> : tab === "login" ? "Login" : "Sign Up"}
            </Button>

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

