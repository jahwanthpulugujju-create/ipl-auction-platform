import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Leaderboard = () => (
  <div className="min-h-screen bg-background noise-overlay">
    <Navbar />
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 text-center">
      <h1 className="font-display text-4xl font-black text-foreground">
        Live <span className="text-gradient-cyan">Leaderboard</span>
      </h1>
      <p className="mt-4 text-muted-foreground">Rankings will appear here once the auction begins.</p>
      <div className="mt-8 glass rounded-xl p-8">
        <p className="text-muted-foreground text-sm">Real-time team rankings, budget analysis, and squad strength comparisons will be displayed here.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Leaderboard;
