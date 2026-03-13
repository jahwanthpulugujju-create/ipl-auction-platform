import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Register = () => (
  <div className="min-h-screen bg-background noise-overlay">
    <Navbar />
    <div className="pt-24 pb-16 max-w-2xl mx-auto px-4 text-center">
      <h1 className="font-display text-4xl font-black text-foreground">Register Your Team</h1>
      <p className="mt-4 text-muted-foreground">Registration module coming soon. Stay tuned!</p>
      <div className="mt-8 glass rounded-xl p-8">
        <p className="text-muted-foreground text-sm">Multi-step registration with team details, member info, and payment will be available here.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Register;
