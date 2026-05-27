const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TIMEOUT_MS = 10000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("A requisição expirou. Verifique se a API está rodando.");
    }
    if (err instanceof TypeError) {
      throw new Error(
        "Não foi possível conectar à API. Verifique se o backend está ativo.",
      );
    }
    throw err;
  }
}

export async function getStandings() {
  const res = await fetchWithTimeout(`${BASE_URL}/table`);
  return res.json();
}

export async function getFixtures(teamName: string) {
  const encoded = encodeURIComponent(teamName);
  const res = await fetchWithTimeout(`${BASE_URL}/fixtures/${encoded}`);
  return res.json();
}

export async function getPlayer(playerName: string) {
  const encoded = encodeURIComponent(playerName);
  const res = await fetchWithTimeout(`${BASE_URL}/players/${encoded}`);
  return res.json();
}
