import { Link } from "@tanstack/react-router";
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-base font-bold">MediBook</div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Trusted online doctor appointments, medicines, and lab tests — all in one place.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary shadow-soft transition-smooth hover:gradient-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/find-doctors" className="hover:text-primary">Find Doctors</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/emergency" className="hover:text-primary">Emergency</Link></li>
              <li><Link to="/medicines" className="hover:text-primary">Medicines</Link></li>
              <li><Link to="/lab-tests" className="hover:text-primary">Lab Tests</Link></li>
              <li><a href="#" className="hover:text-primary">Health Packages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Get In Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 1234 Healthcare Ave, Suite 500</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (800) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@medibook.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} MediBook. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
