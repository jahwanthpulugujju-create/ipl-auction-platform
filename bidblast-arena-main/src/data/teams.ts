export interface Team {
  id: number;
  name: string;
  city: string;
  color: string;
  purse: number; // in lakhs (10000 = ₹100Cr)
  players: number[];
  isUser: boolean;
  bidsPlaced: number;
}

export const TEAMS: Team[] = [
  { id: 1, name: "BVRIT Blazers", city: "Mumbai", color: "hsl(191, 100%, 50%)", purse: 10000, players: [], isUser: true, bidsPlaced: 0 },
  { id: 2, name: "Delhi Dragons", city: "Delhi", color: "hsl(0, 80%, 55%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 3, name: "Chennai Chargers", city: "Chennai", color: "hsl(51, 100%, 50%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 4, name: "Kolkata Knights", city: "Kolkata", color: "hsl(280, 70%, 55%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 5, name: "Bangalore Bulls", city: "Bangalore", color: "hsl(0, 70%, 50%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 6, name: "Hyderabad Hawks", city: "Hyderabad", color: "hsl(25, 100%, 50%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 7, name: "Rajasthan Royals", city: "Jaipur", color: "hsl(330, 70%, 55%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 8, name: "Punjab Panthers", city: "Mohali", color: "hsl(0, 75%, 50%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 9, name: "Gujarat Giants", city: "Ahmedabad", color: "hsl(210, 70%, 50%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
  { id: 10, name: "Lucknow Lions", city: "Lucknow", color: "hsl(180, 60%, 45%)", purse: 10000, players: [], isUser: false, bidsPlaced: 0 },
];
