import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative border-t border-border bg-surface">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + tagline */}
        <div>
          <span className="font-display text-lg font-bold text-foreground">BVRIT</span>
          <span className="ml-2 font-display text-lg font-bold text-secondary">E-Cell</span>
          <p className="mt-3 text-sm text-muted-foreground font-body">
            Build Your Dynasty. Bid Your Way. The ultimate college cricket auction experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Player Pool", path: "/players" },
              { label: "Live Auction", path: "/auction/live" },
              { label: "Leaderboard", path: "/leaderboard" },
              { label: "Register", path: "/register" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>ecell@bvrit.ac.in</span>
            <span>+91 8415 000 000</span>
            <span>BVRIT Hyderabad College of Engineering for Women</span>
            <span>Narsapur, Medak District, Telangana — 502313</span>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {["Instagram", "LinkedIn", "Twitter/X"].map((s) => (
              <a key={s} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md border border-border hover:border-primary/30">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-muted-foreground">© 2026 BVRIT E-Cell. All Rights Reserved.</p>
        <p className="text-xs text-muted-foreground">Virtual currency only. No real monetary value.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
