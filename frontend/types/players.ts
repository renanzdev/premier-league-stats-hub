export interface PlayerStats {
  [key: string]: string;
}

export interface Player {
  name: string;
  position: string;
  club: string;
  nationality?: string;
  dateOfBirth?: string;
  height?: string;
  keyStats: PlayerStats;
}
