import React, { useState, useRef } from 'react';
import { CheckCircle2, MoreVertical, Clock, Share2, Bookmark } from 'lucide-react';
import { Video } from '../types';
import { formatViews } from '../utils/formatters';

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
  onToggleWatchLater?: (video: Video) => void;
  onShare?: (video: Video) => void;
  isWatchLater?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onSelectVideo,
  onToggleWatchLater,
  onShare,
  isWatchLater = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500); // 500ms delay to prevent accidental preview triggering
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  return (
    <div
      className="group flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Container */}
      <div 
        className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#151722] shadow-md border border-gray-800/60 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-red-500/40 group-hover:shadow-red-950/20"
        onClick={() => onSelectVideo(video)}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          width={800}
          height={450}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-30' : 'opacity-100'
          }`}
        />

        {/* Video Preview on Hover (progressive enhancement, muted) */}
        {isHovered && (
          <video
            src={video.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={800}
            height={450}
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
          />
        )}

        {/* Duration / Quality Badge */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
          {video.quality && (
            <span className="rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-red-400 backdrop-blur-sm">
              {video.quality}
            </span>
          )}
          <span className="rounded-md bg-black/85 px-1.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            {video.duration}
          </span>
        </div>

        {/* Live Badge if applicable */}
        {video.isLive && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-lg animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            LIVE
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="mt-3 flex items-start gap-3">
        {/* Channel Avatar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="shrink-0 transition-transform hover:scale-105 focus:outline-none"
        >
          <img
            src={video.channel.avatarUrl}
            alt={video.channel.name}
            loading="lazy"
            width={38}
            height={38}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-700/60"
          />
        </button>

        {/* Title & Metadata */}
        <div className="flex-1 min-w-0" onClick={() => onSelectVideo(video)}>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-100 transition-colors group-hover:text-red-400 leading-snug">
            {video.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            <span className="truncate hover:text-gray-200">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle2 className="h-3.5 w-3.5 text-gray-400 shrink-0 inline fill-gray-400 text-[#0b0c10]" />
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        {/* Options Menu Trigger */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="rounded-full p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10 hover:text-white"
            aria-label="Opsi lainnya"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <div 
              className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-gray-800 bg-[#161926] p-1.5 shadow-xl text-xs backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  if (onToggleWatchLater) onToggleWatchLater(video);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>{isWatchLater ? 'Hapus Tonton Nanti' : 'Simpan ke Tonton Nanti'}</span>
              </button>
              <button
                onClick={() => {
                  if (onShare) onShare(video);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Bagikan</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
