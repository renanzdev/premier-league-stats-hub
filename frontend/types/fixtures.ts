export interface Fixture {
  id?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  date?: string;
  time?: string;
  stadium?: string;
  status?: string;
  round?: string;
}

export interface RawFixture {
  home_team?: string;
  away_team?: string;
  date?: string;
  time?: string;
  stadium?: string;
  round?: string;
}