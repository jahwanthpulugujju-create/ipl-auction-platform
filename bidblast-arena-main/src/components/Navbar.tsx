import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Players", path: "/players" },
  { label: "Auction", path: "/auction/live" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Register", path: "/register" },
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const countdown = useCountdown(new Date("2026-04-05T10:00:00+05:30"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-foreground tracking-wider">BVRIT</span>
              <span className="text-xs font-accent font-semibold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 animate-pulse-glow">
                IPL AUCTION 2026
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-heading font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              <div className="font-mono text-xs text-muted-foreground flex gap-1">
                <span className="bg-muted px-1.5 py-0.5 rounded">{pad(countdown.days)}d</span>
                <span className="bg-muted px-1.5 py-0.5 rounded">{pad(countdown.hours)}h</span>
                <span className="bg-muted px-1.5 py-0.5 rounded">{pad(countdown.minutes)}m</span>
                <span className="bg-muted px-1.5 py-0.5 rounded">{pad(countdown.seconds)}s</span>
              </div>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-heading font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-cyan"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-heading font-semibold transition-colors ${
                location.pathname === link.path ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 text-lg font-heading font-semibold rounded-lg bg-primary text-primary-foreground glow-cyan"
          >
            Register Now
          </Link>
          <div className="font-mono text-sm text-muted-foreground mt-4">
            {pad(countdown.days)}:{pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
