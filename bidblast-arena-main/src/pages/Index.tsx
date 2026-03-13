import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, BarChart3, Shield, Trophy, Smartphone, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-primary">{count}{suffix}</span>;
};

/* ─── Floating Orbs ─── */
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { top: "10%", left: "5%", size: 300, color: "primary", delay: "0s" },
      { top: "60%", right: "10%", size: 250, color: "secondary", delay: "10s" },
      { top: "30%", right: "30%", size: 200, color: "primary", delay: "20s" },
    ].map((orb, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float-orb opacity-20 blur-3xl"
        style={{
          top: orb.top,
          left: orb.left,
          right: (orb as any).right,
          width: orb.size,
          height: orb.size,
          background: orb.color === "primary" ? "hsl(191 100% 50%)" : "hsl(25 100% 50%)",
          animationDelay: orb.delay,
        }}
      />
    ))}
  </div>
);

/* ─── Features ─── */
const FEATURES = [
  { icon: Zap, title: "Live Auction", desc: "Real-time bidding with sub-second updates and bot competition" },
  { icon: Wallet, title: "Smart Budget Tracker", desc: "Automated purse management with role-based warnings" },
  { icon: BarChart3, title: "Player Analytics", desc: "Detailed ratings, stats, and comparison tools" },
  { icon: Shield, title: "Admin Control Panel", desc: "Full auctioneer command center with override capabilities" },
  { icon: Trophy, title: "Live Leaderboard", desc: "Rankings update in real-time after every sale" },
  { icon: Smartphone, title: "Mobile Ready", desc: "Fully responsive — bid from anywhere on any device" },
];

/* ─── Timeline ─── */
const TIMELINE = [
  { date: "Mar 15, 2026", title: "Registration Opens", desc: "Teams can register and start strategizing" },
  { date: "Mar 25, 2026", title: "Player Pool Released", desc: "Full list of 220+ players with stats available" },
  { date: "Apr 1, 2026", title: "Strategy Session", desc: "Workshop on auction strategy and team building" },
  { date: "Apr 5, 2026", title: "🔴 Live Auction Day", desc: "The main event — build your dynasty!", active: true },
  { date: "Apr 6, 2026", title: "Results & Awards", desc: "Best team, best buy, and more awards" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { name: "Priya Sharma", branch: "CSE", year: "3rd Year", quote: "The most thrilling event I've attended at BVRIT! The auction format teaches real strategy.", rating: 5 },
  { name: "Ananya Reddy", branch: "ECE", year: "2nd Year", quote: "Building a team under budget pressure is an incredible learning experience. Can't wait for 2026!", rating: 5 },
  { name: "Kavya Patel", branch: "IT", year: "4th Year", quote: "The E-Cell team outdid themselves. The live bidding was intense and the UI was stunning.", rating: 4 },
];

const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative noise-overlay">
      <Navbar />
      <FloatingOrbs />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden grid-dots">
        {/* Stadium spotlight beams */}
        <div className="absolute top-0 left-1/4 w-px h-[600px] bg-gradient-to-b from-primary/30 to-transparent rotate-12 blur-sm" />
        <div className="absolute top-0 right-1/4 w-px h-[600px] bg-gradient-to-b from-secondary/30 to-transparent -rotate-12 blur-sm" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {["BUILD", "YOUR", "DYNASTY."].map((word, i) => (
              <motion.span
                key={word}
                className={`inline-block mr-4 ${i === 2 ? "text-gradient-cyan" : "text-foreground"}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 font-heading text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            BVRIT E-Cell IPL Auction 2026 — Where Strategy Meets Cricket
          </motion.p>

          <motion.p
            className="mt-3 text-muted-foreground/70 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Assemble the ultimate squad, outsmart rival teams, and prove your cricketing acumen in the most electrifying auction event on campus.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Link
              to="/register"
              className="px-8 py-3 font-heading font-semibold text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all glow-orange"
            >
              Register Your Team →
            </Link>
            <Link
              to="/players"
              className="px-8 py-3 font-heading font-semibold text-sm rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              View Players Pool
            </Link>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            {[
              { label: "Teams Registered", value: 48 },
              { label: "Players in Pool", value: 220 },
              { label: "Prize Pool", value: 50000, suffix: "", prefix: "₹", display: "₹50,000" },
              { label: "Event Date", value: 0, display: "Apr 5, 2026" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                {stat.display ? (
                  <span className="font-mono text-3xl md:text-4xl font-bold text-primary">{stat.display}</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
                <p className="mt-1 text-xs font-accent text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground">
            Everything Your <span className="text-gradient-cyan">E-Cell</span> Needs
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            A complete platform for running IPL-style auctions with real-time bidding, analytics, and admin controls.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="glass rounded-xl p-6 group hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <f.icon className="w-8 h-8 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(191,100%,50%)] transition-all" />
                <h3 className="font-heading font-semibold text-foreground text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 relative z-10 bg-surface/50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground">
            3 Steps to Your <span className="text-gradient-orange">Dream Squad</span>
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50" />

            {[
              { step: 1, title: "REGISTER", desc: "Form your team of 5, choose your city, and secure your spot in the auction." },
              { step: 2, title: "STRATEGIZE", desc: "Browse the player pool, analyze stats, and plan your bidding strategy." },
              { step: 3, title: "BID & WIN", desc: "Enter the live auction, outbid rivals, and build the ultimate squad." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center border-2 border-primary/30 glow-cyan">
                  <span className="font-display text-3xl font-bold text-primary">{s.step}</span>
                </div>
                <h3 className="mt-6 font-heading font-bold text-foreground text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Event <span className="text-gradient-cyan">Timeline</span>
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px" />

            {TIMELINE.map((event, i) => (
              <motion.div
                key={event.title}
                className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ml-10 md:ml-0`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Dot */}
                <div className={`absolute left-[-26px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full ${event.active ? "bg-primary glow-cyan" : "bg-muted-foreground/50"} border-2 border-background z-10`} />

                <div className={`glass rounded-xl p-4 flex-1 max-w-sm ${i % 2 === 0 ? "md:text-right md:mr-8" : "md:ml-8"} ${event.active ? "border-primary/30" : ""}`}>
                  <span className={`font-mono text-xs ${event.active ? "text-primary" : "text-muted-foreground"}`}>{event.date}</span>
                  <h4 className="font-heading font-semibold text-foreground mt-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT BVRIT ─── */}
      <section className="py-24 relative z-10 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                About <span className="text-secondary">BVRIT</span> E-Cell
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                BVRIT Hyderabad College of Engineering for Women, Narsapur, is one of the premier engineering institutions in Telangana.
                Our Entrepreneurship Cell (E-Cell) fosters innovation, leadership, and strategic thinking among students.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                The IPL Auction event combines the excitement of cricket with entrepreneurial skills — budgeting, team-building,
                negotiation, and real-time decision-making — creating an unforgettable campus experience.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <span className="font-mono text-xl font-bold text-primary">5+</span>
                  <p className="text-xs text-muted-foreground">Years of E-Cell</p>
                </div>
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <span className="font-mono text-xl font-bold text-primary">500+</span>
                  <p className="text-xs text-muted-foreground">Participants</p>
                </div>
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <span className="font-mono text-xl font-bold text-primary">20+</span>
                  <p className="text-xs text-muted-foreground">Events/Year</p>
                </div>
              </div>
            </motion.div>

            {/* CSS Geometric Illustration */}
            <motion.div
              className="relative h-64 md:h-80"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Stadium shape */}
                  <div className="w-48 h-32 rounded-t-full border-2 border-primary/30 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-primary/40 rounded" />
                    <div className="absolute -top-4 left-1/4 w-1.5 h-6 bg-primary/20 rounded" />
                    <div className="absolute -top-4 right-1/4 w-1.5 h-6 bg-primary/20 rounded" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
                    {/* Field */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-12 rounded-t-full border border-emerald/30 bg-emerald/5" />
                  </div>
                  {/* Glow */}
                  <div className="absolute -inset-12 bg-primary/5 rounded-full blur-3xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
            What <span className="text-gradient-cyan">Participants</span> Say
          </h2>
          <div className="relative h-48">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`absolute inset-0 transition-all duration-500 ${i === testimonialIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
              >
                <div className="glass rounded-xl p-8 text-center max-w-lg mx-auto">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground italic">"{t.quote}"</p>
                  <p className="mt-4 font-heading font-semibold text-primary text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.branch} • {t.year}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS ─── */}
      <section className="py-16 relative z-10 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm font-accent uppercase tracking-widest text-muted-foreground mb-8">Backed By</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-lg h-20 flex items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground/50">SPONSOR {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
