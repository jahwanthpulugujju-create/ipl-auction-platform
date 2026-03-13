export type PlayerRole = 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
export type PlayerCategory = 'marquee' | 'premium' | 'mid-tier' | 'budget';
export type PlayerNationality = 'indian' | 'overseas';
export type PlayerStatus = 'available' | 'sold' | 'unsold';

export interface Player {
  id: number;
  name: string;
  role: PlayerRole;
  base: number; // in lakhs
  rating: number;
  batting: number;
  bowling: number;
  fielding: number;
  category: PlayerCategory;
  nationality: PlayerNationality;
  matches: number;
  runs: number;
  wickets: number;
  avg: number;
  sr: number;
  status: PlayerStatus;
  soldTo?: string;
  soldPrice?: number;
}

export const PLAYERS: Player[] = [
  // MARQUEE (10)
  { id: 1, name: "Rohit Sharma", role: "batsman", base: 200, rating: 9.2, batting: 9.5, bowling: 2, fielding: 7, category: "marquee", nationality: "indian", matches: 243, runs: 6624, wickets: 0, avg: 31.2, sr: 129.8, status: "available" },
  { id: 2, name: "Virat Kohli", role: "batsman", base: 200, rating: 9.5, batting: 9.8, bowling: 1, fielding: 8.5, category: "marquee", nationality: "indian", matches: 237, runs: 7263, wickets: 0, avg: 37.2, sr: 130.7, status: "available" },
  { id: 3, name: "Jasprit Bumrah", role: "bowler", base: 200, rating: 9.4, batting: 2, bowling: 9.8, fielding: 6, category: "marquee", nationality: "indian", matches: 133, runs: 56, wickets: 145, avg: 0, sr: 6.7, status: "available" },
  { id: 4, name: "MS Dhoni", role: "wicket-keeper", base: 200, rating: 9.0, batting: 8.5, bowling: 1, fielding: 9, category: "marquee", nationality: "indian", matches: 250, runs: 5082, wickets: 0, avg: 39.1, sr: 135.2, status: "available" },
  { id: 5, name: "Pat Cummins", role: "bowler", base: 200, rating: 9.1, batting: 5, bowling: 9.2, fielding: 7, category: "marquee", nationality: "overseas", matches: 50, runs: 312, wickets: 58, avg: 0, sr: 7.2, status: "available" },
  { id: 6, name: "Rashid Khan", role: "bowler", base: 200, rating: 9.0, batting: 6, bowling: 9.5, fielding: 7.5, category: "marquee", nationality: "overseas", matches: 109, runs: 530, wickets: 130, avg: 0, sr: 6.6, status: "available" },
  { id: 7, name: "Hardik Pandya", role: "all-rounder", base: 200, rating: 8.8, batting: 8, bowling: 7.5, fielding: 7, category: "marquee", nationality: "indian", matches: 117, runs: 2340, wickets: 62, avg: 28.1, sr: 147.5, status: "available" },
  { id: 8, name: "Suryakumar Yadav", role: "batsman", base: 200, rating: 9.1, batting: 9.3, bowling: 1, fielding: 8, category: "marquee", nationality: "indian", matches: 95, runs: 2840, wickets: 0, avg: 35.5, sr: 155.6, status: "available" },
  { id: 9, name: "Jos Buttler", role: "wicket-keeper", base: 200, rating: 8.9, batting: 9, bowling: 1, fielding: 8, category: "marquee", nationality: "overseas", matches: 82, runs: 2831, wickets: 0, avg: 38.2, sr: 149.7, status: "available" },
  { id: 10, name: "Ravindra Jadeja", role: "all-rounder", base: 200, rating: 8.7, batting: 7.5, bowling: 8.5, fielding: 9.5, category: "marquee", nationality: "indian", matches: 228, runs: 2692, wickets: 152, avg: 26.4, sr: 130.1, status: "available" },

  // PREMIUM (15)
  { id: 11, name: "KL Rahul", role: "wicket-keeper", base: 150, rating: 8.4, batting: 8.8, bowling: 1, fielding: 7.5, category: "premium", nationality: "indian", matches: 115, runs: 4121, wickets: 0, avg: 39.8, sr: 134.6, status: "available" },
  { id: 12, name: "Rishabh Pant", role: "wicket-keeper", base: 150, rating: 8.5, batting: 8.5, bowling: 1, fielding: 7, category: "premium", nationality: "indian", matches: 75, runs: 2251, wickets: 0, avg: 35.2, sr: 148.9, status: "available" },
  { id: 13, name: "Yuzvendra Chahal", role: "bowler", base: 150, rating: 8.2, batting: 2, bowling: 8.8, fielding: 5, category: "premium", nationality: "indian", matches: 143, runs: 45, wickets: 187, avg: 0, sr: 7.1, status: "available" },
  { id: 14, name: "Trent Boult", role: "bowler", base: 150, rating: 8.3, batting: 3, bowling: 9, fielding: 6.5, category: "premium", nationality: "overseas", matches: 75, runs: 95, wickets: 89, avg: 0, sr: 7.5, status: "available" },
  { id: 15, name: "Glenn Maxwell", role: "all-rounder", base: 150, rating: 8.1, batting: 8, bowling: 6, fielding: 8, category: "premium", nationality: "overseas", matches: 108, runs: 2685, wickets: 28, avg: 28.3, sr: 158.8, status: "available" },
  { id: 16, name: "Shubman Gill", role: "batsman", base: 150, rating: 8.3, batting: 8.5, bowling: 1, fielding: 7, category: "premium", nationality: "indian", matches: 62, runs: 1895, wickets: 0, avg: 35.1, sr: 132.4, status: "available" },
  { id: 17, name: "Mohammed Shami", role: "bowler", base: 150, rating: 8.4, batting: 3, bowling: 9, fielding: 5.5, category: "premium", nationality: "indian", matches: 93, runs: 120, wickets: 108, avg: 0, sr: 7.8, status: "available" },
  { id: 18, name: "David Miller", role: "batsman", base: 150, rating: 8.0, batting: 8.2, bowling: 1, fielding: 7, category: "premium", nationality: "overseas", matches: 115, runs: 2570, wickets: 0, avg: 33.5, sr: 140.2, status: "available" },
  { id: 19, name: "Kagiso Rabada", role: "bowler", base: 150, rating: 8.5, batting: 3, bowling: 9.2, fielding: 6, category: "premium", nationality: "overseas", matches: 60, runs: 78, wickets: 82, avg: 0, sr: 7.4, status: "available" },
  { id: 20, name: "Ishan Kishan", role: "wicket-keeper", base: 120, rating: 7.8, batting: 7.8, bowling: 1, fielding: 7, category: "premium", nationality: "indian", matches: 61, runs: 1654, wickets: 0, avg: 28.5, sr: 136.3, status: "available" },

  // MID-TIER (15)
  { id: 21, name: "Arjun Mehta", role: "batsman", base: 80, rating: 7.2, batting: 7.5, bowling: 2, fielding: 6.5, category: "mid-tier", nationality: "indian", matches: 45, runs: 1120, wickets: 0, avg: 28.0, sr: 128.5, status: "available" },
  { id: 22, name: "Ravi Patel", role: "bowler", base: 80, rating: 7.0, batting: 3, bowling: 7.8, fielding: 5.5, category: "mid-tier", nationality: "indian", matches: 52, runs: 98, wickets: 62, avg: 0, sr: 7.9, status: "available" },
  { id: 23, name: "Jake Morrison", role: "all-rounder", base: 80, rating: 7.3, batting: 6.5, bowling: 7, fielding: 7, category: "mid-tier", nationality: "overseas", matches: 38, runs: 850, wickets: 35, avg: 25.0, sr: 132.0, status: "available" },
  { id: 24, name: "Sanjay Krishnan", role: "batsman", base: 70, rating: 7.1, batting: 7.2, bowling: 1, fielding: 6, category: "mid-tier", nationality: "indian", matches: 40, runs: 980, wickets: 0, avg: 26.5, sr: 125.3, status: "available" },
  { id: 25, name: "Tom Williams", role: "bowler", base: 80, rating: 7.4, batting: 2, bowling: 8, fielding: 6, category: "mid-tier", nationality: "overseas", matches: 55, runs: 65, wickets: 72, avg: 0, sr: 7.3, status: "available" },
  { id: 26, name: "Deepak Verma", role: "all-rounder", base: 70, rating: 6.9, batting: 6.5, bowling: 6.8, fielding: 6.5, category: "mid-tier", nationality: "indian", matches: 35, runs: 720, wickets: 28, avg: 24.0, sr: 130.5, status: "available" },
  { id: 27, name: "Marcus Green", role: "batsman", base: 80, rating: 7.2, batting: 7.5, bowling: 1, fielding: 7.5, category: "mid-tier", nationality: "overseas", matches: 42, runs: 1050, wickets: 0, avg: 27.6, sr: 138.2, status: "available" },
  { id: 28, name: "Ankit Sharma", role: "bowler", base: 60, rating: 6.8, batting: 3, bowling: 7.5, fielding: 5, category: "mid-tier", nationality: "indian", matches: 30, runs: 45, wickets: 38, avg: 0, sr: 7.6, status: "available" },
  { id: 29, name: "Chris Taylor", role: "wicket-keeper", base: 70, rating: 7.0, batting: 7, bowling: 1, fielding: 7.5, category: "mid-tier", nationality: "overseas", matches: 48, runs: 1180, wickets: 0, avg: 26.2, sr: 126.8, status: "available" },
  { id: 30, name: "Prateek Mishra", role: "all-rounder", base: 60, rating: 6.7, batting: 6, bowling: 6.5, fielding: 7, category: "mid-tier", nationality: "indian", matches: 28, runs: 520, wickets: 22, avg: 22.6, sr: 125.3, status: "available" },
  { id: 31, name: "Ahmed Hassan", role: "bowler", base: 80, rating: 7.3, batting: 2, bowling: 8.2, fielding: 5.5, category: "mid-tier", nationality: "overseas", matches: 40, runs: 35, wickets: 52, avg: 0, sr: 7.1, status: "available" },
  { id: 32, name: "Vikram Singh", role: "batsman", base: 70, rating: 7.0, batting: 7.3, bowling: 1, fielding: 6, category: "mid-tier", nationality: "indian", matches: 38, runs: 890, wickets: 0, avg: 25.4, sr: 130.8, status: "available" },
  { id: 33, name: "Daniel Cooper", role: "all-rounder", base: 70, rating: 6.9, batting: 6, bowling: 7, fielding: 6.5, category: "mid-tier", nationality: "overseas", matches: 32, runs: 480, wickets: 30, avg: 20.0, sr: 128.0, status: "available" },
  { id: 34, name: "Mohit Reddy", role: "bowler", base: 60, rating: 6.6, batting: 2, bowling: 7.2, fielding: 5, category: "mid-tier", nationality: "indian", matches: 25, runs: 30, wickets: 28, avg: 0, sr: 8.0, status: "available" },
  { id: 35, name: "Ryan Smith", role: "batsman", base: 70, rating: 7.1, batting: 7.4, bowling: 1, fielding: 7, category: "mid-tier", nationality: "overseas", matches: 44, runs: 1020, wickets: 0, avg: 26.8, sr: 135.5, status: "available" },

  // BUDGET (15)
  { id: 36, name: "Karan Joshi", role: "batsman", base: 30, rating: 5.8, batting: 6.2, bowling: 1, fielding: 5.5, category: "budget", nationality: "indian", matches: 15, runs: 320, wickets: 0, avg: 22.8, sr: 118.5, status: "available" },
  { id: 37, name: "Amit Desai", role: "bowler", base: 30, rating: 5.5, batting: 2, bowling: 6.5, fielding: 4.5, category: "budget", nationality: "indian", matches: 18, runs: 20, wickets: 18, avg: 0, sr: 8.2, status: "available" },
  { id: 38, name: "Luke Harris", role: "all-rounder", base: 40, rating: 6.0, batting: 5.5, bowling: 5.8, fielding: 6, category: "budget", nationality: "overseas", matches: 22, runs: 380, wickets: 15, avg: 20.0, sr: 122.5, status: "available" },
  { id: 39, name: "Suresh Nair", role: "wicket-keeper", base: 30, rating: 5.6, batting: 5.8, bowling: 1, fielding: 6.5, category: "budget", nationality: "indian", matches: 12, runs: 245, wickets: 0, avg: 21.5, sr: 115.8, status: "available" },
  { id: 40, name: "Nathan Brown", role: "bowler", base: 40, rating: 6.2, batting: 2, bowling: 6.8, fielding: 5, category: "budget", nationality: "overseas", matches: 25, runs: 28, wickets: 22, avg: 0, sr: 7.8, status: "available" },
  { id: 41, name: "Rahul Yadav", role: "batsman", base: 20, rating: 5.2, batting: 5.5, bowling: 1, fielding: 5, category: "budget", nationality: "indian", matches: 8, runs: 145, wickets: 0, avg: 18.1, sr: 110.6, status: "available" },
  { id: 42, name: "James White", role: "all-rounder", base: 40, rating: 6.1, batting: 5.8, bowling: 6, fielding: 6, category: "budget", nationality: "overseas", matches: 20, runs: 350, wickets: 12, avg: 21.8, sr: 125.0, status: "available" },
  { id: 43, name: "Aditya Kumar", role: "bowler", base: 20, rating: 5.0, batting: 2, bowling: 6, fielding: 4, category: "budget", nationality: "indian", matches: 10, runs: 12, wickets: 10, avg: 0, sr: 8.5, status: "available" },
  { id: 44, name: "Nikhil Gupta", role: "batsman", base: 30, rating: 5.7, batting: 6, bowling: 1, fielding: 5.5, category: "budget", nationality: "indian", matches: 14, runs: 280, wickets: 0, avg: 21.5, sr: 120.3, status: "available" },
  { id: 45, name: "Sam Clarke", role: "wicket-keeper", base: 30, rating: 5.9, batting: 6, bowling: 1, fielding: 6.5, category: "budget", nationality: "overseas", matches: 16, runs: 310, wickets: 0, avg: 22.1, sr: 118.7, status: "available" },
  { id: 46, name: "Prakash Iyer", role: "all-rounder", base: 20, rating: 5.3, batting: 5, bowling: 5.5, fielding: 5.5, category: "budget", nationality: "indian", matches: 10, runs: 150, wickets: 8, avg: 18.7, sr: 115.3, status: "available" },
  { id: 47, name: "Ben Roberts", role: "bowler", base: 30, rating: 5.8, batting: 2, bowling: 6.5, fielding: 5, category: "budget", nationality: "overseas", matches: 18, runs: 22, wickets: 16, avg: 0, sr: 7.9, status: "available" },
  { id: 48, name: "Varun Chopra", role: "batsman", base: 20, rating: 5.1, batting: 5.3, bowling: 1, fielding: 5, category: "budget", nationality: "indian", matches: 6, runs: 98, wickets: 0, avg: 16.3, sr: 108.8, status: "available" },
  { id: 49, name: "Harsh Pandey", role: "bowler", base: 20, rating: 5.4, batting: 2, bowling: 6.2, fielding: 4.5, category: "budget", nationality: "indian", matches: 12, runs: 15, wickets: 12, avg: 0, sr: 8.1, status: "available" },
  { id: 50, name: "Oliver King", role: "all-rounder", base: 40, rating: 6.3, batting: 6, bowling: 6.2, fielding: 6.5, category: "budget", nationality: "overseas", matches: 24, runs: 420, wickets: 18, avg: 22.1, sr: 128.6, status: "available" },
];

export const getRoleColor = (role: PlayerRole): string => {
  switch (role) {
    case 'batsman': return 'text-primary';
    case 'bowler': return 'text-secondary';
    case 'all-rounder': return 'text-accent';
    case 'wicket-keeper': return 'text-emerald';
  }
};

export const getRoleBg = (role: PlayerRole): string => {
  switch (role) {
    case 'batsman': return 'bg-primary/20 text-primary border-primary/30';
    case 'bowler': return 'bg-secondary/20 text-secondary border-secondary/30';
    case 'all-rounder': return 'bg-accent/20 text-accent border-accent/30';
    case 'wicket-keeper': return 'bg-emerald/20 text-emerald border-emerald/30';
  }
};

export const getCategoryBg = (category: PlayerCategory): string => {
  switch (category) {
    case 'marquee': return 'bg-accent/20 text-accent border-accent/30';
    case 'premium': return 'bg-primary/20 text-primary border-primary/30';
    case 'mid-tier': return 'bg-secondary/20 text-secondary border-secondary/30';
    case 'budget': return 'bg-muted text-muted-foreground border-muted-foreground/30';
  }
};

export const formatPrice = (lakhs: number): string => {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`;
  return `₹${lakhs}L`;
};
