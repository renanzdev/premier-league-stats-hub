"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  User,
  X,
  Trophy,
  BarChart2,
  Calendar,
  Users,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/standings", label: "Tabela" },
  { href: "/fixtures", label: "Jogos" },
  { href: "/players", label: "Jogadores" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        style={{ backgroundColor: "#00A94F" }}
        className="sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Menu icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-1.5 rounded hover:bg-black/10 transition-colors duration-200 shrink-0"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo / Title */}
          <Link href="/" className="flex-1 text-center">
            <span className="text-white font-black text-sm md:text-base tracking-[0.15em] uppercase select-none">
              Premier League Stats Hub
            </span>
          </Link>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white p-1.5 rounded hover:bg-black/10 transition-colors duration-200 shrink-0"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Avatar */}
          <div className="shrink-0 flex items-center gap-2 bg-black/10 rounded-full px-3 py-1">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-xs font-medium hidden sm:block">
              Visitante
            </span>
          </div>
        </div>

        {/* Search bar expanded */}
        {searchOpen && (
          <div className="border-t border-white/20 px-4 py-2">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar time, jogador..."
                className="w-full bg-white/20 text-white placeholder-white/60 pl-9 pr-8 py-1.5 rounded-full text-sm outline-none focus:bg-white/30 transition-colors"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col">
            <div
              style={{ backgroundColor: "#00A94F" }}
              className="px-4 h-14 flex items-center justify-between"
            >
              <span className="text-white font-bold text-sm tracking-wide">
                MENU
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white hover:bg-black/10 p-1.5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const icons: Record<string, React.ReactNode> = {
                  "/": <Trophy className="w-4 h-4" />,
                  "/standings": <BarChart2 className="w-4 h-4" />,
                  "/fixtures": <Calendar className="w-4 h-4" />,
                  "/players": <Users className="w-4 h-4" />,
                };
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors duration-150 ${
                      active
                        ? "text-green-600 bg-green-50 border-r-2 border-green-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={active ? "text-green-600" : "text-gray-400"}
                    >
                      {icons[link.href]}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t text-xs text-gray-400 text-center">
              Premier League Stats Hub © 2026
            </div>
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
