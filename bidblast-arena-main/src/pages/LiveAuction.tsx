import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { PLAYERS, Player, formatPrice, getRoleBg } from "@/data/players";
import { TEAMS, Team } from "@/data/teams";
import { toast } from "@/hooks/use-toast";

/* ─── Types ─── */
interface Bid {
  teamId: number;
  teamName: string;
  amount: number;
  timestamp: number;
}

type AuctionPhase = "waiting" | "bidding" | "sold" | "unsold";

/* ─── Helpers ─── */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ─── Component ─── */
const LiveAuction = () => {
  const [teams, setTeams] = useState<Team[]>(() => TEAMS.map((t) => ({ ...t, players: [], purse: 10000 })));
  const [playerQueue, setPlayerQueue] = useState<Player[]>(() => shuffleArray(PLAYERS));
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [phase, setPhase] = useState<AuctionPhase>("waiting");
  const [currentBid, setCurrentBid] = useState(0);
  const [leadingTeamId, setLeadingTeamId] = useState<number | null>(null);
  const [timer, setTimer] = useState(15);
  const [bids, setBids] = useState<Bid[]>([]);
  const [soldPlayers, setSoldPlayers] = useState<{ player: Player; teamId: number; price: number }[]>([]);
  const [commentary, setCommentary] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const botIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const userTeam = teams.find((t) => t.isUser)!;
  const currentPlayer = playerQueue[currentPlayerIdx] || null;

  /* ─── Start auction for current player ─── */
  const startBidding = useCallback(() => {
    if (!currentPlayer) return;
    setPhase("bidding");
    setCurrentBid(currentPlayer.base);
    setLeadingTeamId(null);
    setBids([]);
    setTimer(15);
  }, [currentPlayer]);

  /* ─── Place bid ─── */
  const placeBid = useCallback(
    (teamId: number, increment: number) => {
      const team = teams.find((t) => t.id === teamId);
      if (!team || phase !== "bidding") return;

      const newBid = currentBid + increment;
      if (team.purse < newBid) {
        if (team.isUser) {
          toast({ title: "Insufficient Budget", description: `You can't afford ₹${newBid}L`, variant: "destructive" });
        }
        return;
      }
      if (team.players.length >= 20) return;

      setCurrentBid(newBid);
      setLeadingTeamId(teamId);
      setTimer(15); // reset timer
      setBids((prev) => [{ teamId, teamName: team.name, amount: newBid, timestamp: Date.now() }, ...prev].slice(0, 8));

      if (team.isUser) {
        toast({ title: "Bid Placed!", description: `You bid ${formatPrice(newBid)} for ${currentPlayer?.name}` });
      }

      setCommentary((prev) => [`${team.name} bids ${formatPrice(newBid)} for ${currentPlayer?.name}! 🔥`, ...prev].slice(0, 20));
    },
    [teams, phase, currentBid, currentPlayer]
  );

  /* ─── SOLD / UNSOLD ─── */
  const finishPlayer = useCallback(
    (sold: boolean) => {
      if (!currentPlayer) return;

      if (sold && leadingTeamId) {
        setPhase("sold");
        setTeams((prev) =>
          prev.map((t) =>
            t.id === leadingTeamId
              ? { ...t, purse: t.purse - currentBid, players: [...t.players, currentPlayer.id] }
              : t
          )
        );
        setSoldPlayers((prev) => [...prev, { player: currentPlayer, teamId: leadingTeamId, price: currentBid }]);
        const winnerName = teams.find((t) => t.id === leadingTeamId)?.name || "Unknown";
        setCommentary((prev) => [`🏏 SOLD! ${currentPlayer.name} goes to ${winnerName} for ${formatPrice(currentBid)}!`, ...prev].slice(0, 20));
      } else {
        setPhase("unsold");
        setCommentary((prev) => [`${currentPlayer.name} goes UNSOLD 😔`, ...prev].slice(0, 20));
      }

      // Auto-advance after 3 seconds
      setTimeout(() => {
        setCurrentPlayerIdx((i) => i + 1);
        setPhase("waiting");
      }, 3000);
    },
    [currentPlayer, leadingTeamId, currentBid, teams]
  );

  /* ─── Timer countdown ─── */
  useEffect(() => {
    if (phase !== "bidding") return;
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // Timer expired
          if (leadingTeamId) {
            finishPlayer(true);
          } else {
            finishPlayer(false);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, leadingTeamId, finishPlayer]);

  /* ─── Bot bidding ─── */
  useEffect(() => {
    if (phase !== "bidding") return;

    botIntervalRef.current = setInterval(() => {
      const botTeams = teams.filter((t) => !t.isUser && t.purse > currentBid + 10 && t.players.length < 20);
      if (botTeams.length === 0) return;

      // 40% chance per interval
      if (Math.random() > 0.4) return;

      const bot = botTeams[Math.floor(Math.random() * botTeams.length)];
      const increments = [10, 25, 50];
      const affordable = increments.filter((inc) => bot.purse >= currentBid + inc);
      if (affordable.length === 0) return;

      const increment = affordable[Math.floor(Math.random() * affordable.length)];
      placeBid(bot.id, increment);
    }, 2000 + Math.random() * 2000);

    return () => { if (botIntervalRef.current) clearInterval(botIntervalRef.current); };
  }, [phase, teams, currentBid, placeBid]);

  /* ─── Bid increment buttons ─── */
  const BID_INCREMENTS = [
    { label: "+₹10L", value: 10 },
    { label: "+₹25L", value: 25 },
    { label: "+₹50L", value: 50 },
    { label: "+₹1Cr", value: 100 },
  ];

  const canAfford = (inc: number) => userTeam.purse >= currentBid + inc;
  const pursePercent = (userTeam.purse / 10000) * 100;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-20 pb-8 px-2 md:px-4 max-w-[1600px] mx-auto">
        {/* ─── 3-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4">
          {/* ─── LEFT PANEL ─── */}
          <div className="space-y-4">
            {/* Team Widget */}
            <div className="glass rounded-xl p-4">
              <h3 className="font-heading font-bold text-foreground text-sm mb-3">YOUR TEAM</h3>
              <p className="font-display text-lg font-bold text-primary">{userTeam.name}</p>
              <p className="text-xs text-muted-foreground">{userTeam.city}</p>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Purse Remaining</span>
                  <span className={`font-mono font-bold ${pursePercent > 50 ? "text-emerald" : pursePercent > 20 ? "text-accent" : "text-destructive"}`}>
                    {formatPrice(userTeam.purse)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${pursePercent > 50 ? "bg-emerald" : pursePercent > 20 ? "bg-accent" : "bg-destructive"}`}
                    style={{ width: `${pursePercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted rounded-lg p-2 text-center">
                  <span className="text-muted-foreground">Players</span>
                  <p className="font-mono font-bold text-foreground">{userTeam.players.length}/20</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <span className="text-muted-foreground">Overseas</span>
                  <p className="font-mono font-bold text-foreground">
                    {userTeam.players.filter((pid) => PLAYERS.find((p) => p.id === pid)?.nationality === "overseas").length}/8
                  </p>
                </div>
              </div>

              {pursePercent < 20 && (
                <div className="mt-3 bg-destructive/10 border border-destructive/30 rounded-lg p-2 text-xs text-destructive text-center animate-pulse">
                  ⚠️ Budget Running Low!
                </div>
              )}
            </div>

            {/* My Squad */}
            <div className="glass rounded-xl p-4">
              <h4 className="font-heading font-semibold text-foreground text-sm mb-2">My Squad</h4>
              {userTeam.players.length === 0 ? (
                <p className="text-xs text-muted-foreground">No players bought yet</p>
              ) : (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {userTeam.players.map((pid) => {
                    const p = PLAYERS.find((pl) => pl.id === pid);
                    const sale = soldPlayers.find((s) => s.player.id === pid);
                    return p ? (
                      <div key={pid} className="flex justify-between items-center text-xs py-1">
                        <span className="text-foreground">{p.name}</span>
                        <span className="font-mono text-primary">{sale ? formatPrice(sale.price) : ""}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── CENTER PANEL ─── */}
          <div className="space-y-4">
            {/* Current Player */}
            {currentPlayer ? (
              <div className="glass rounded-xl p-6 relative overflow-hidden">
                {/* Player Display */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-2xl font-bold text-foreground">
                      {currentPlayer.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-black text-foreground">{currentPlayer.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleBg(currentPlayer.role)}`}>
                      {currentPlayer.role.replace("-", " ")}
                    </span>
                    <span className="text-sm">{currentPlayer.nationality === "indian" ? "🇮🇳" : "🌍"}</span>
                  </div>
                  <div className="mt-3 flex justify-center gap-4">
                    {[
                      { label: "BAT", value: currentPlayer.batting },
                      { label: "BOWL", value: currentPlayer.bowling },
                      { label: "FIELD", value: currentPlayer.fielding },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-xs text-muted-foreground font-accent">{s.label}</p>
                        <p className="font-mono text-sm font-bold text-foreground">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bidding Arena */}
                {phase === "waiting" && (
                  <div className="text-center">
                    <p className="font-mono text-lg text-muted-foreground mb-2">Base Price: {formatPrice(currentPlayer.base)}</p>
                    <button
                      onClick={startBidding}
                      className="px-8 py-3 font-heading font-bold text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-cyan"
                    >
                      START BIDDING
                    </button>
                  </div>
                )}

                {phase === "bidding" && (
                  <div className="text-center">
                    {/* Current bid */}
                    <p className="text-xs text-muted-foreground font-accent uppercase tracking-wider">Current Bid</p>
                    <p className="font-mono text-5xl md:text-6xl font-bold text-primary glow-cyan mt-1">
                      {formatPrice(currentBid)}
                    </p>
                    {leadingTeamId && (
                      <p className="text-sm text-emerald font-heading mt-1">
                        Leading: {teams.find((t) => t.id === leadingTeamId)?.name}
                        {leadingTeamId === userTeam.id && " (YOU!)"}
                      </p>
                    )}
                    {!leadingTeamId && <p className="text-sm text-muted-foreground mt-1">No bids yet</p>}

                    {/* Timer */}
                    <div className={`mt-4 font-mono text-4xl font-bold ${timer <= 5 ? "text-destructive" : "text-foreground"}`}>
                      00:{String(timer).padStart(2, "0")}
                    </div>

                    {/* Bid buttons */}
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {BID_INCREMENTS.map((inc) => (
                        <button
                          key={inc.value}
                          onClick={() => placeBid(userTeam.id, inc.value)}
                          disabled={!canAfford(inc.value) || leadingTeamId === userTeam.id}
                          className="px-2 py-2 text-xs font-mono font-bold rounded-lg border border-primary/30 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          {inc.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => placeBid(userTeam.id, 0)}
                      disabled={!canAfford(0) || leadingTeamId === userTeam.id || (currentBid <= currentPlayer.base && !leadingTeamId)}
                      className="mt-3 w-full py-3 font-heading font-bold text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-orange"
                    >
                      {leadingTeamId === userTeam.id ? "YOU'RE LEADING" : "PLACE BID"}
                    </button>
                  </div>
                )}

                {/* SOLD Overlay */}
                <AnimatePresence>
                  {phase === "sold" && (
                    <motion.div
                      className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center z-20 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="text-accent font-display text-5xl md:text-6xl font-black -rotate-12 border-4 border-accent px-6 py-2"
                        initial={{ scale: 3, opacity: 0, rotate: -30 }}
                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        SOLD!
                      </motion.div>
                      <p className="mt-4 font-heading text-xl text-foreground">
                        {currentPlayer.name} → {teams.find((t) => t.id === leadingTeamId)?.name}
                      </p>
                      <p className="font-mono text-2xl text-primary mt-1">{formatPrice(currentBid)}</p>
                    </motion.div>
                  )}
                  {phase === "unsold" && (
                    <motion.div
                      className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center z-20 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-destructive font-display text-4xl font-black">UNSOLD</div>
                      <p className="mt-2 text-muted-foreground">{currentPlayer.name} returns to the pool</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bid History */}
                {bids.length > 0 && phase === "bidding" && (
                  <div className="mt-6 border-t border-border pt-4">
                    <h4 className="font-accent text-xs uppercase tracking-wider text-muted-foreground mb-2">Bid History</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {bids.map((bid, i) => (
                        <motion.div
                          key={`${bid.timestamp}-${i}`}
                          className="flex justify-between text-xs py-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span className={bid.teamId === userTeam.id ? "text-primary" : "text-muted-foreground"}>
                            {bid.teamName}
                          </span>
                          <span className="font-mono text-foreground">{formatPrice(bid.amount)}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass rounded-xl p-12 text-center">
                <p className="font-display text-2xl text-foreground">Auction Complete!</p>
                <p className="text-muted-foreground mt-2">{soldPlayers.length} players sold</p>
              </div>
            )}

            {/* Auction Progress */}
            <div className="glass rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-accent">Progress</span>
              <span className="font-mono text-xs text-foreground">{currentPlayerIdx}/{playerQueue.length} players</span>
              <div className="flex-1 mx-4 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(currentPlayerIdx / playerQueue.length) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div className="space-y-4">
            {/* Coming Up Next */}
            <div className="glass rounded-xl p-4">
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Coming Up Next</h4>
              <div className="space-y-2">
                {playerQueue.slice(currentPlayerIdx + 1, currentPlayerIdx + 6).map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-xs">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="font-display text-[8px] font-bold">{p.name.split(" ").map((w) => w[0]).join("")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">{p.name}</p>
                      <p className="text-muted-foreground">{formatPrice(p.base)}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getRoleBg(p.role)}`}>
                      {p.role.split("-")[0].slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* All Teams Budget */}
            <div className="glass rounded-xl p-4">
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Team Budgets</h4>
              <div className="space-y-2">
                {teams.map((t) => (
                  <div key={t.id} className={`text-xs ${t.isUser ? "bg-primary/5 rounded-lg p-1.5 border border-primary/20" : "py-1"}`}>
                    <div className="flex justify-between mb-0.5">
                      <span className={t.isUser ? "text-primary font-semibold" : "text-muted-foreground"}>{t.name}</span>
                      <span className="font-mono text-foreground">{formatPrice(t.purse)}</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(t.purse / 10000) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentary */}
            <div className="glass rounded-xl p-4">
              <h4 className="font-heading font-semibold text-foreground text-sm mb-3">Live Commentary</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {commentary.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Waiting for auction to begin...</p>
                ) : (
                  commentary.map((msg, i) => (
                    <p key={i} className="text-xs text-muted-foreground leading-relaxed">{msg}</p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuction;
