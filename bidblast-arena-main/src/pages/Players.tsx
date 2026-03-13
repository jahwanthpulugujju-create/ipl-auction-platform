import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Heart, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLAYERS, Player, PlayerRole, PlayerCategory, PlayerNationality, getRoleBg, getCategoryBg, formatPrice } from "@/data/players";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const CATEGORIES: (PlayerCategory | "all")[] = ["all", "marquee", "premium", "mid-tier", "budget"];
const ROLES: (PlayerRole | "all")[] = ["all", "batsman", "bowler", "all-rounder", "wicket-keeper"];
const NATIONALITIES: (PlayerNationality | "all")[] = ["all", "indian", "overseas"];
type SortKey = "base-desc" | "base-asc" | "rating-desc" | "rating-asc" | "name-asc";

const RatingBar = ({ value, max = 10, className = "" }: { value: number; max?: number; className?: string }) => (
  <div className={`h-1.5 bg-muted rounded-full overflow-hidden ${className}`}>
    <motion.div
      className="h-full bg-primary rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: `${(value / max) * 100}%` }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  </div>
);

const PlayerCard = ({
  player,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}: {
  player: Player;
  onSelect: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);

  const initials = player.name.split(" ").map((w) => w[0]).join("");
  const nationalityEmoji = player.nationality === "indian" ? "🇮🇳" : "🌍";

  return (
    <div
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onSelect}
    >
      <div
        className="relative transition-transform duration-500 w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div className="glass rounded-xl p-5 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mx-auto mb-3">
            <span className="font-display text-lg font-bold text-foreground">{initials}</span>
          </div>
          <h3 className="font-heading font-bold text-foreground text-center">{player.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleBg(player.role)}`}>
              {player.role.replace("-", " ")}
            </span>
            <span className="text-sm">{nationalityEmoji}</span>
          </div>
          <p className="font-mono text-2xl font-bold text-primary text-center mt-3">
            {formatPrice(player.base)}
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Rating</span>
              <span className="font-mono">{player.rating}/10</span>
            </div>
            <RatingBar value={player.rating} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryBg(player.category)}`}>
              {player.category}
            </span>
            {player.status === "sold" ? (
              <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">SOLD</span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald/20 text-emerald border border-emerald/30">AVAILABLE</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Heart size={16} className={isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"} />
          </button>

          {/* SOLD overlay */}
          {player.status === "sold" && (
            <div className="absolute inset-0 bg-background/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <div className="text-accent font-display text-3xl font-black -rotate-12 border-4 border-accent px-4 py-1 animate-sold-stamp">
                SOLD
              </div>
              {player.soldTo && (
                <p className="absolute bottom-4 text-xs text-accent font-mono">{player.soldTo} • {formatPrice(player.soldPrice || 0)}</p>
              )}
            </div>
          )}
        </div>

        {/* BACK */}
        <div
          className="glass rounded-xl p-5 absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h4 className="font-heading font-bold text-foreground text-sm mb-3">{player.name} — Stats</h4>
          <div className="space-y-2">
            {[
              { label: "Batting", value: player.batting },
              { label: "Bowling", value: player.bowling },
              { label: "Fielding", value: player.fielding },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{s.label}</span>
                  <span className="font-mono">{s.value}/10</span>
                </div>
                <RatingBar value={s.value} />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="glass rounded px-2 py-1">
              <span className="text-muted-foreground">Matches</span>
              <p className="font-mono text-foreground">{player.matches}</p>
            </div>
            <div className="glass rounded px-2 py-1">
              <span className="text-muted-foreground">{player.role === "bowler" ? "Wickets" : "Runs"}</span>
              <p className="font-mono text-foreground">{player.role === "bowler" ? player.wickets : player.runs}</p>
            </div>
            <div className="glass rounded px-2 py-1">
              <span className="text-muted-foreground">Average</span>
              <p className="font-mono text-foreground">{player.avg}</p>
            </div>
            <div className="glass rounded px-2 py-1">
              <span className="text-muted-foreground">SR / ER</span>
              <p className="font-mono text-foreground">{player.sr}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Players = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlayerCategory | "all">("all");
  const [role, setRole] = useState<PlayerRole | "all">("all");
  const [nationality, setNationality] = useState<PlayerNationality | "all">("all");
  const [sort, setSort] = useState<SortKey>("rating-desc");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(() => {
    const saved = sessionStorage.getItem("ipl-wishlist");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      sessionStorage.setItem("ipl-wishlist", JSON.stringify([...next]));
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = [...PLAYERS];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.role.includes(q) || p.nationality.includes(q));
    }
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (role !== "all") result = result.filter((p) => p.role === role);
    if (nationality !== "all") result = result.filter((p) => p.nationality === nationality);

    switch (sort) {
      case "base-desc": result.sort((a, b) => b.base - a.base); break;
      case "base-asc": result.sort((a, b) => a.base - b.base); break;
      case "rating-desc": result.sort((a, b) => b.rating - a.rating); break;
      case "rating-asc": result.sort((a, b) => a.rating - b.rating); break;
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [search, category, role, nationality, sort]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
            Player Pool <span className="text-gradient-cyan">2026</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-heading">
            {PLAYERS.length} players across 4 tiers — hover to reveal stats
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, role, or nationality..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(20); }}
            className="w-full pl-10 pr-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 font-body"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {/* Category */}
          <div className="flex gap-1 flex-wrap justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setVisibleCount(20); }}
                className={`px-3 py-1.5 text-xs font-accent font-semibold rounded-full border transition-all uppercase tracking-wider ${
                  category === c ? "bg-primary/20 text-primary border-primary/50" : "text-muted-foreground border-border hover:border-primary/30"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {/* Role */}
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setVisibleCount(20); }}
              className={`px-3 py-1.5 text-xs font-accent font-semibold rounded-full border transition-all capitalize ${
                role === r ? "bg-primary/20 text-primary border-primary/50" : "text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {r === "all" ? "All Roles" : r.replace("-", " ")}
            </button>
          ))}
          <span className="text-muted-foreground/30">|</span>
          {NATIONALITIES.map((n) => (
            <button
              key={n}
              onClick={() => { setNationality(n); setVisibleCount(20); }}
              className={`px-3 py-1.5 text-xs font-accent font-semibold rounded-full border transition-all capitalize ${
                nationality === n ? "bg-primary/20 text-primary border-primary/50" : "text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {n === "all" ? "All" : n === "indian" ? "🇮🇳 Indian" : "🌍 Overseas"}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex justify-between items-center mb-8 max-w-7xl">
          <span className="text-xs text-muted-foreground font-mono">
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-xs bg-muted text-foreground rounded-lg px-3 py-1.5 border border-border focus:outline-none"
          >
            <option value="rating-desc">Rating ↓</option>
            <option value="rating-asc">Rating ↑</option>
            <option value="base-desc">Base Price ↓</option>
            <option value="base-asc">Base Price ↑</option>
            <option value="name-asc">Name A-Z</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <PlayerCard
                player={player}
                onSelect={() => setSelectedPlayer(player)}
                isWishlisted={wishlist.has(player.id)}
                onToggleWishlist={() => toggleWishlist(player.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((v) => v + 20)}
              className="px-8 py-3 font-heading font-semibold text-sm rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="glass-strong max-w-lg">
          {selectedPlayer && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-foreground">{selectedPlayer.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedPlayer.role.replace("-", " ")} • {selectedPlayer.nationality === "indian" ? "🇮🇳 Indian" : "🌍 Overseas"} • {selectedPlayer.category}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-foreground">
                      {selectedPlayer.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-3xl font-bold text-primary">{formatPrice(selectedPlayer.base)}</p>
                    <p className="text-xs text-muted-foreground">Base Price</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Batting", value: selectedPlayer.batting },
                    { label: "Bowling", value: selectedPlayer.bowling },
                    { label: "Fielding", value: selectedPlayer.fielding },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>{s.label}</span>
                        <span className="font-mono text-foreground">{s.value}/10</span>
                      </div>
                      <RatingBar value={s.value} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Matches", value: selectedPlayer.matches },
                    { label: selectedPlayer.role === "bowler" ? "Wickets" : "Runs", value: selectedPlayer.role === "bowler" ? selectedPlayer.wickets : selectedPlayer.runs },
                    { label: "Average", value: selectedPlayer.avg },
                    { label: "SR / ER", value: selectedPlayer.sr },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="font-mono text-sm font-bold text-foreground">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Players;
