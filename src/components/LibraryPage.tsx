import React, { useState } from 'react';
import { History, Clock, ThumbsUp, Trash2, Play, FolderPlus } from 'lucide-react';
import { Video } from '../types';
import { formatViews } from '../utils/formatters';

interface LibraryPageProps {
  historyVideos: Video[];
  watchLaterVideos: Video[];
  likedVideos: Video[];
  onSelectVideo: (video: Video) => void;
  onClearHistory: () => void;
  onRemoveWatchLater: (video: Video) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({
  historyVideos,
  watchLaterVideos,
  likedVideos,
  onSelectVideo,
  onClearHistory,
  onRemoveWatchLater,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'watchLater' | 'liked'>('history');

  const currentList =
    activeTab === 'history'
      ? historyVideos
      : activeTab === 'watchLater'
      ? watchLaterVideos
      : likedVideos;

  return (
    <div className="flex-1 px-4 py-6 md:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Koleksi & Perpustakaan
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola riwayat tontonan, daftar tonton nanti, dan video yang Anda sukai.
          </p>
        </div>

        {activeTab === 'history' && historyVideos.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 rounded-xl bg-red-600/15 border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-600/25 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="h-4 w-4" />
            <span>Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex items-center gap-3 border-b border-gray-800 pb-3">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-[#161826] text-gray-300 hover:bg-[#202438] hover:text-white'
          }`}
        >
          <History className="h-4 w-4" />
          <span>Riwayat ({historyVideos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('watchLater')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'watchLater'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-[#161826] text-gray-300 hover:bg-[#202438] hover:text-white'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Tonton Nanti ({watchLaterVideos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'liked'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-[#161826] text-gray-300 hover:bg-[#202438] hover:text-white'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Video Disukai ({likedVideos.length})</span>
        </button>
      </div>

      {/* Video Content Grid or Empty State */}
      <div className="mt-6">
        {currentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-800 rounded-3xl bg-[#12141f]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800/60 text-gray-400 mb-3">
              {activeTab === 'history' ? (
                <History className="h-8 w-8" />
              ) : activeTab === 'watchLater' ? (
                <Clock className="h-8 w-8" />
              ) : (
                <ThumbsUp className="h-8 w-8" />
              )}
            </div>
            <h3 className="text-base font-bold text-white">Belum Ada Video di Sini</h3>
            <p className="text-xs text-gray-400 max-w-sm mt-1">
              Video yang Anda tonton, sukai, atau simpan akan otomatis muncul di bagian ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentList.map((video) => (
              <div
                key={video.id}
                className="group relative flex flex-col rounded-2xl bg-[#12141f] border border-gray-800/80 p-2.5 transition-all hover:bg-[#181b29] hover:border-gray-700"
              >
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-xl bg-black cursor-pointer"
                  onClick={() => onSelectVideo(video)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    loading="lazy"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="mt-2.5 flex-1 min-w-0">
                  <h4
                    onClick={() => onSelectVideo(video)}
                    className="line-clamp-2 text-xs font-bold text-white group-hover:text-red-400 cursor-pointer"
                  >
                    {video.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-400 truncate">{video.channel.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{formatViews(video.views)}</p>
                </div>

                {activeTab === 'watchLater' && (
                  <button
                    onClick={() => onRemoveWatchLater(video)}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-red-600/10 py-1.5 text-[11px] font-semibold text-red-400 hover:bg-red-600/20 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Hapus dari Daftar</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
