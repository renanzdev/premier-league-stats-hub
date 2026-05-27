import { StandingTeam } from "@/types/standings";
import { Fixture } from "@/types/fixtures";
import { Player } from "@/types/players";

/**
 * Normalize the /table response from the backend.
 * The backend returns: { table: [["Position","Team",...], [1,"Arsenal",...], ...] }
 */
export function normalizeStandings(data: unknown): StandingTeam[] {
  if (!data || typeof data !== "object") return [];

  const raw = (data as Record<string, unknown>).table;
  if (!Array.isArray(raw)) return [];

  // Skip header row if it's strings
  const rows = raw.filter((row) => {
    if (!Array.isArray(row)) return false;
    const first = row[0];
    return (
      typeof first === "number" ||
      (typeof first === "string" &&
        !isNaN(Number(first)) &&
        first !== "Position")
    );
  });

  return rows.map((row: unknown[]) => {
    const pos = Number(row[0]);
    const team = String(row[1] ?? "");
    const played = Number(row[2] ?? 0);
    const wins = Number(row[3] ?? 0);
    const draws = Number(row[4] ?? 0);
    const losses = Number(row[5] ?? 0);
    const gd = Number(row[6] ?? 0);
    const points = Number(row[7] ?? 0);

    const goalsFor = wins * 2 + draws; // estimate fallback
    const goalsAgainst = 0;

    const winPct = played > 0 ? Math.round((wins / played) * 100) : 0;

    return {
      position: pos,
      team,
      played,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference: gd,
      points,
      winPercentage: winPct,
      form: [],
    };
  });
}

/**
 * Normalize /fixtures/<team> response.
 * Backend returns: { team_fixtures: [...strings or objects...] }
 */
export function normalizeFixtures(data: unknown): Fixture[] {
  if (!data || typeof data !== "object") return [];

  const raw = (data as Record<string, unknown>).team_fixtures;
  if (!Array.isArray(raw)) return [];

  return raw.map((item, index): Fixture => {
    if (typeof item === "string") {
      return parseFixtureString(item, index);
    }

    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;
      return {
        id: String(index),
        homeTeam: String(obj.home_team ?? obj.homeTeam ?? "TBD"),
        awayTeam: String(obj.away_team ?? obj.awayTeam ?? "TBD"),
        date: String(obj.date ?? ""),
        time: String(obj.time ?? ""),
        stadium: String(obj.stadium ?? ""),
        status: String(obj.status ?? ""),
        round: String(obj.round ?? ""),
      };
    }

    return { id: String(index), homeTeam: "TBD", awayTeam: "TBD" };
  });
}

function parseFixtureString(raw: string, index: number): Fixture {
  // Try to extract teams, date, time from raw text like "Arsenal 2 - 1 Chelsea 12/08 15:00"
  const dateMatch = raw.match(/(\d{2}\/\d{2}(?:\/\d{4})?)/);
  const timeMatch = raw.match(/(\d{2}:\d{2})/);
  const scoreMatch = raw.match(/(\d+)\s*[-x]\s*(\d+)/i);

  // Strip date/time to get team names
  const teamsPart = raw
    .replace(dateMatch?.[0] ?? "", "")
    .replace(timeMatch?.[0] ?? "", "")
    .trim();

  let homeTeam = "TBD";
  let awayTeam = "TBD";
  let homeScore: number | null = null;
  let awayScore: number | null = null;

  if (scoreMatch) {
    homeScore = Number(scoreMatch[1]);
    awayScore = Number(scoreMatch[2]);
    const parts = teamsPart.split(scoreMatch[0]);
    homeTeam = parts[0]?.trim() || "TBD";
    awayTeam = parts[1]?.trim() || "TBD";
  } else {
    // Try to split by " vs " or " - "
    const vsSplit = teamsPart.split(/\s+vs\.?\s+/i);
    if (vsSplit.length === 2) {
      homeTeam = vsSplit[0].trim();
      awayTeam = vsSplit[1].trim();
    } else {
      // Just show raw
      homeTeam = raw.substring(0, 20);
      awayTeam = raw.substring(20, 40) || "TBD";
    }
  }

  return {
    id: String(index),
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date: dateMatch?.[0] ?? "",
    time: timeMatch?.[0] ?? "",
    stadium: "",
    status: scoreMatch ? "Encerrado" : "Agendado",
  };
}

/**
 * Normalize /players/<name> response.
 */
export function normalizePlayer(data: unknown): Player | null {
  if (!data) return null;

  // Could be an array or object
  const obj = Array.isArray(data) ? data[0] : data;
  if (!obj || typeof obj !== "object") return null;

  const p = obj as Record<string, unknown>;

  return {
    name: String(p.name ?? ""),
    position: String(p.position ?? ""),
    club: String(p.club ?? ""),
    nationality: String(p.Nationality ?? p.nationality ?? ""),
    dateOfBirth: String(p["Date of Birth"] ?? p.dateOfBirth ?? ""),
    height: String(p.Height ?? p.height ?? ""),
    keyStats: (p.key_stats ?? p.keyStats ?? {}) as Record<string, string>,
  };
}

export function getZone(position: number): string {
  if (position <= 4) return "champions";
  if (position === 5) return "europa";
  if (position === 6) return "conference";
  if (position >= 18) return "relegation";
  return "none";
}
