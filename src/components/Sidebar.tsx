import React from 'react';
import { 
  Home, 
  Flame, 
  PlaySquare, 
  Tv2, 
  History, 
  Clock, 
  ThumbsUp, 
  ListVideo, 
  Code, 
  Gamepad2, 
  Music, 
  Film, 
  Cpu, 
  Radio
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  isOpen: boolean;
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onSelectCategory?: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeView,
  onSelectView,
  onSelectCategory,
}) => {
  const mainNavItems = [
    { id: 'home', label: 'Beranda', icon: Home, view: 'home' as ViewMode },
    { id: 'trending', label: 'Trending', icon: Flame, view: 'trending' as ViewMode },
    { id: 'shorts', label: 'Shorts', icon: PlaySquare, view: 'shorts' as ViewMode },
    { id: 'subscriptions', label: 'Langganan', icon: Tv2, view: 'subscriptions' as ViewMode },
  ];

  const libraryItems = [
    { id: 'history', label: 'Riwayat', icon: History, view: 'history' as ViewMode },
    { id: 'watch-later', label: 'Tonton Nanti', icon: Clock, view: 'library' as ViewMode },
    { id: 'liked', label: 'Video Disukai', icon: ThumbsUp, view: 'library' as ViewMode },
    { id: 'playlists', label: 'Koleksi Anda', icon: ListVideo, view: 'library' as ViewMode },
  ];

  const exploreItems = [
    { label: 'Coding & Tech', icon: Code, category: 'Coding & Tech' },
    { label: 'Gaming', icon: Gamepad2, category: 'Gaming' },
    { label: 'Film & Animasi', icon: Film, category: 'Film & Animasi' },
    { label: 'Musik', icon: Music, category: 'Musik' },
    { label: 'AI & Masa Depan', icon: Cpu, category: 'AI & Masa Depan' },
    { label: 'Live Stream', icon: Radio, category: 'Live' },
  ];

  const subscriptions = [
    {
      name: 'Blender Studio Cinema',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
      isLive: true,
    },
    {
      name: 'Yohan Tech Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      isLive: false,
    },
    {
      name: 'Apex Gaming Zone',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&auto=format&fit=crop&q=80',
      isLive: false,
    },
  ];

  if (!isOpen) {
    // Collapsed sidebar (Icon only)
    return (
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-20 flex-col items-center border-r border-gray-800/80 bg-[#0b0c10] py-4 md:flex shrink-0">
        <nav className="flex flex-col gap-3 w-full px-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.view)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-3 px-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'bg-red-500/15 text-red-500 font-semibold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 flex-col border-r border-gray-800/80 bg-[#0b0c10] overflow-y-auto p-3 shrink-0 custom-scrollbar flex">
      {/* Primary Section */}
      <div className="space-y-1 pb-3 border-b border-gray-800/80">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.view)}
              className={`flex w-full items-center gap-4 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-600/15 text-red-500 font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Library / Anda Section */}
      <div className="py-3 border-b border-gray-800/80">
        <h3 className="px-3.5 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Koleksi Anda
        </h3>
        <div className="space-y-1">
          {libraryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.view)}
                className={`flex w-full items-center gap-4 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-600/15 text-red-500 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 text-gray-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscriptions */}
      <div className="py-3 border-b border-gray-800/80">
        <h3 className="px-3.5 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Langganan
        </h3>
        <div className="space-y-1">
          {subscriptions.map((sub) => (
            <button
              key={sub.name}
              onClick={() => onSelectCategory && onSelectCategory('Semua')}
              className="flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={sub.avatar}
                  alt={sub.name}
                  className="h-6 w-6 rounded-full object-cover shrink-0"
                />
                <span className="truncate text-xs">{sub.name}</span>
              </div>
              {sub.isLive && (
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explore / Kategori */}
      <div className="py-3 border-b border-gray-800/80">
        <h3 className="px-3.5 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Jelajahi
        </h3>
        <div className="space-y-1">
          {exploreItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onSelectView('home');
                  if (onSelectCategory) onSelectCategory(item.category);
                }}
                className="flex w-full items-center gap-4 rounded-xl px-3.5 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4 text-gray-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 pb-2 px-3.5 text-[11px] text-gray-500 space-y-2">
        <p className="font-semibold text-gray-400">yohanex Streaming Platform</p>
        <p>© 2026 yohanex Inc. Hak cipta dilindungi undang-undang.</p>
      </div>
    </aside>
  );
};
