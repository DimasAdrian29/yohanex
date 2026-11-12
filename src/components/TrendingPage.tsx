import React, { useState } from 'react';
import { Flame, CheckCircle2, Music, Gamepad2, Film, Sparkles } from 'lucide-react';
import { Video } from '../types';
import { formatViews } from '../utils/formatters';

interface TrendingPageProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({ videos, onSelectVideo }) => {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Musik' | 'Gaming' | 'Film'>('Semua');

  const tabs = [
    { label: 'Semua', icon: Sparkles },
    { label: 'Musik', icon: Music },
    { label: 'Gaming', icon: Gamepad2 },
    { label: 'Film', icon: Film },
  ];

  const filtered = videos.filter((v) => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Musik') return v.category === 'Musik';
    if (activeTab === 'Gaming') return v.category === 'Gaming';
    if (activeTab === 'Film') return v.category === 'Film & Animasi';
    return true;
  });

  // Sort by view count descending
  const sorted = [...filtered].sort((a, b) => b.views - a.views);

  return (
    <div className="flex-1 px-4 py-6 md:px-8 max-w-7xl mx-auto w-full">
      {/* Banner */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 shadow-xl shadow-red-600/20 text-white">
          <Flame className="h-8 w-8 fill-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Sedang Trending di yohanex
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Video paling populer dan banyak ditonton saat ini di Indonesia & Dunia.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex items-center gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-[#161826] text-gray-300 hover:bg-[#202438] hover:text-white border border-gray-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ranked Video List */}
      <div className="mt-6 space-y-4">
        {sorted.map((video, idx) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group flex flex-col sm:flex-row items-start gap-4 p-3 rounded-2xl bg-[#12141f] hover:bg-[#181b29] border border-gray-800/80 transition-all cursor-pointer"
          >
            {/* Rank Number */}
            <div className="hidden sm:flex items-center justify-center w-12 text-2xl font-black text-gray-500 group-hover:text-red-500 transition-colors">
              #{String(idx + 1).padStart(2, '0')}
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-video w-full sm:w-64 shrink-0 overflow-hidden rounded-xl bg-black border border-gray-800">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                loading="lazy"
                width={640}
                height={360}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/85 px-1.5 py-0.5 text-xs font-bold text-white">
                {video.duration}
              </span>
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-2 sm:hidden text-xs font-bold text-red-500 mb-1">
                #{idx + 1} TRENDING
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                {video.title}
              </h3>

              <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-400">
                <span>{video.channel.name}</span>
                {video.channel.verified && (
                  <CheckCircle2 className="h-3.5 w-3.5 fill-gray-400 text-[#0b0c10]" />
                )}
                <span>•</span>
                <span className="text-gray-300 font-semibold">{formatViews(video.views)}</span>
                <span>•</span>
                <span>{video.uploadedAt}</span>
              </div>

              <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                {video.description}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="rounded-md bg-red-950/40 border border-red-800/40 px-2 py-0.5 text-[11px] font-semibold text-red-400">
                  {video.category}
                </span>
                {video.quality && (
                  <span className="rounded-md bg-gray-800 px-1.5 py-0.5 text-[10px] font-bold text-gray-300">
                    {video.quality}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
