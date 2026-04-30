import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Stethoscope, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/find-doctors", label: "Find Doctors" },
  { to: "/emergency", label: "Emergency" },
  { to: "/medicines", label: "Medicines" },
  { to: "/lab-tests", label: "Lab Tests" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate({ to: "/" });
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-smooth ${
        scrolled ? "bg-background/85 backdrop-blur-lg shadow-soft" : "bg-background"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-soft">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold text-foreground">MediBook</div>
            <div className="text-[10px] text-muted-foreground">Online Doctor's Appointment</div>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-smooth hover:bg-secondary hover:text-primary"
                activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-primary bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          {profile ? (
            <>
              <Button asChild variant="outline">
                <Link to={profile.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}>
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="hero"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button asChild variant="hero">
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "block rounded-lg px-3 py-2 text-sm font-medium text-primary bg-secondary" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 space-y-2">
              {profile ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={profile.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleLogout}
                    className="w-full gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Button asChild variant="hero" className="w-full">
                  <Link to="/auth">Login / Sign Up</Link>
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
