import React from 'react';
import { Play, Bookmark, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { Video } from '../types';
import { VideoCard } from './VideoCard';
import { CategoryPills } from './CategoryPills';
import { CATEGORIES, MOCK_SHORTS } from '../data/mockVideos';

interface HomeFeedProps {
  videos: Video[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onResetSearch: () => void;
  onSelectVideo: (video: Video) => void;
  onSelectShortsView: () => void;
  onToggleWatchLater: (video: Video) => void;
  onOpenShare: (video: Video) => void;
  watchLaterIds: string[];
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  videos,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onResetSearch,
  onSelectVideo,
  onSelectShortsView,
  onToggleWatchLater,
  onOpenShare,
  watchLaterIds,
}) => {
  // Hero spotlight video (default to first video)
  const heroVideo = videos[0];

  // Filter videos by category and search query
  const filteredVideos = videos.filter((v) => {
    const matchesCategory =
      selectedCategory === 'Semua' || v.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 pb-16">
      {/* Category Pills Bar */}
      <CategoryPills
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="px-4 md:px-6 space-y-8">
        {/* Hero Spotlight Banner (shown when no search active and category is 'Semua') */}
        {!searchQuery && selectedCategory === 'Semua' && heroVideo && (
          <div className="relative mt-2 overflow-hidden rounded-3xl border border-gray-800 bg-[#12141f] shadow-2xl">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <img
                src={heroVideo.thumbnailUrl}
                alt={heroVideo.title}
                className="h-full w-full object-cover object-center opacity-40 filter blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end p-6 md:p-10 max-w-2xl min-h-[340px] md:min-h-[400px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sorotan Utama 4K
                </span>
                <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md">
                  {heroVideo.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {heroVideo.title}
              </h1>

              <p className="mt-2 text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed drop-shadow">
                {heroVideo.description}
              </p>

              {/* Channel & CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectVideo(heroVideo)}
                  className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Tonton Sekarang</span>
                </button>

                <button
                  onClick={() => onToggleWatchLater(heroVideo)}
                  className="flex items-center gap-2 rounded-2xl border border-gray-700 bg-black/40 px-5 py-3 text-sm font-semibold text-gray-200 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      watchLaterIds.includes(heroVideo.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  <span>
                    {watchLaterIds.includes(heroVideo.id) ? 'Tersimpan' : 'Tonton Nanti'}
                  </span>
                </button>

                <div className="flex items-center gap-2 ml-auto text-xs text-gray-400">
                  <img
                    src={heroVideo.channel.avatarUrl}
                    alt={heroVideo.channel.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span>{heroVideo.channel.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <h2 className="text-lg font-bold text-white">
                Hasil pencarian untuk: <span className="text-red-400">"{searchQuery}"</span>
              </h2>
              <p className="text-xs text-gray-400">{filteredVideos.length} video ditemukan</p>
            </div>
            <button
              onClick={onResetSearch}
              className="text-xs font-semibold text-red-400 hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Primary Video Grid */}
        <div>
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-gray-800 bg-[#12141f]">
              <p className="text-base font-bold text-white">Tidak ada video yang cocok</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.
              </p>
              <button
                onClick={onResetSearch}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                Tampilkan Semua Video
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onSelectVideo={onSelectVideo}
                  onToggleWatchLater={onToggleWatchLater}
                  onShare={onOpenShare}
                  isWatchLater={watchLaterIds.includes(video.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* yohanex Shorts Shelf */}
        {!searchQuery && selectedCategory === 'Semua' && (
          <div className="pt-6 border-t border-gray-800/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500 fill-red-500" />
                <h2 className="text-lg font-extrabold text-white tracking-tight">yohanex Shorts</h2>
              </div>
              <button
                onClick={onSelectShortsView}
                className="text-xs font-bold text-red-400 hover:underline"
              >
                Lihat Semua Shorts
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOCK_SHORTS.map((short) => (
                <div
                  key={short.id}
                  onClick={onSelectShortsView}
                  className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-black cursor-pointer border border-gray-800 hover:border-red-500/50 shadow-lg transition-all"
                >
                  <video
                    src={short.videoUrl}
                    muted
                    loop
                    playsInline
                    width={360}
                    height={640}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {short.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">{short.views} tayangan</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
