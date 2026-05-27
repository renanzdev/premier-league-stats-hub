export interface StandingTeam {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number | string;
  points: number;
  winPercentage?: number;
  form?: string[];
}

export type Zone = "champions" | "europa" | "conference" | "relegation" | "none";