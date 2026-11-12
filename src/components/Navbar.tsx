import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  X, 
  Video, 
  Bell, 
  User, 
  Check, 
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Tv
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onOpenUpload: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenUpload,
  onHomeClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sampleNotifications = [
    {
      id: 1,
      title: 'Blender Studio Cinema mengunggah video baru',
      desc: 'Sintel: Petualangan Epik Gadis Pengelana & Naga Legendaris',
      time: '10 menit yang lalu',
      unread: true,
    },
    {
      id: 2,
      title: 'Komentar Anda disukai oleh 42 orang',
      desc: '"Player videonya smooth abis pas di-seek!"',
      time: '2 jam yang lalu',
      unread: true,
    },
    {
      id: 3,
      title: 'Live Streaming Premiere Dimulai!',
      desc: 'Yohan Tech Labs sedang siaran langsung seputar React & AI',
      time: '1 hari yang lalu',
      unread: false,
    },
  ];

  const recentSearches = ['React 19', 'Blender 4K', 'Cyberpunk gameplay', 'Lo-Fi coding'];

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-800/80 bg-[#0b0c10]/95 px-4 backdrop-blur-md transition-colors">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Buka navigasi menu"
          className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          onClick={onHomeClick}
          className="group flex items-center gap-2 text-left focus:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-rose-400 shadow-lg shadow-red-600/30 transition-transform group-hover:scale-105">
            <Video className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-red-400 transition-colors">
              yohan<span className="text-red-500">ex</span>
            </span>
          </div>
        </button>
      </div>

      {/* Middle: Search Box */}
      <div className="relative max-w-2xl flex-1 px-4 hidden sm:block">
        <form onSubmit={onSearchSubmit} className="relative flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Cari video, channel, atau topik di yohanex..."
              className="w-full rounded-l-full border border-gray-700/80 bg-[#14161f] py-2 pl-4 pr-10 text-sm text-gray-100 placeholder-gray-400 transition-all focus:border-red-500 focus:bg-[#1a1d29] focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            aria-label="Cari"
            className="flex h-[38px] items-center rounded-r-full border border-l-0 border-gray-700/80 bg-[#1f2333] px-5 text-gray-300 transition-colors hover:bg-red-600 hover:text-white hover:border-red-600"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Search Recommendations Dropdown */}
        {isSearchFocused && !searchQuery && (
          <div className="absolute left-4 right-4 top-12 z-50 rounded-2xl border border-gray-800 bg-[#161824] p-3 shadow-2xl backdrop-blur-xl">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
              Pencarian Populer
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={() => {
                    onSearchChange(term);
                  }}
                  className="rounded-lg bg-[#222638] px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-red-600/30 hover:text-red-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Upload Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:brightness-110 hover:shadow-red-600/40 active:scale-95"
        >
          <Video className="h-4 w-4" />
          <span className="hidden md:inline">Unggah</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifikasi"
            className="relative rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 md:w-96 rounded-2xl border border-gray-800 bg-[#141622] p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <h3 className="font-semibold text-white text-sm">Notifikasi</h3>
                <span className="text-xs text-red-400 hover:underline cursor-pointer">
                  Tandai sudah dibaca
                </span>
              </div>
              <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
                {sampleNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                      n.unread ? 'bg-red-950/20 border border-red-800/30' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-200">{n.title}</p>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1 shrink-0"></span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{n.desc}</p>
                    <p className="text-[10px] text-gray-500 mt-1.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Profil Pengguna"
            className="flex items-center gap-2 rounded-full border border-gray-700/80 p-0.5 transition-all hover:border-red-500 focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Profil Yohan"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-gray-800 bg-[#141622] p-2 shadow-2xl z-50 text-sm">
              <div className="flex items-center gap-3 p-3 border-b border-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Yohan"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <p className="font-semibold text-white truncate">Yohan Eksplorer</p>
                  <p className="text-xs text-gray-400 truncate">@yohanex_creator</p>
                </div>
              </div>

              <div className="py-2 space-y-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <User className="h-4 w-4 text-red-400" />
                  <span>Kanal Anda</span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Tv className="h-4 w-4 text-amber-400" />
                  <span>yohanex Studio</span>
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-400" />}
                    <span>Mode Tampilan</span>
                  </div>
                  <span className="text-xs text-gray-400">{isDarkMode ? 'Gelap' : 'Terang'}</span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Setelan</span>
                </button>
              </div>

              <div className="pt-2 border-t border-gray-800">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
