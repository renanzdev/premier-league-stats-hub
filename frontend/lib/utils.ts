export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getTeamAbbr(name: string): string {
  if (!name) return "???";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.substring(0, 3).toUpperCase();
  if (words.length === 2)
    return (words[0][0] + words[1].substring(0, 2)).toUpperCase();
  return words
    .map((w) => w[0])
    .join("")
    .substring(0, 3)
    .toUpperCase();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return dateStr;
}
