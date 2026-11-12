import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown,
  Music,
  CheckCircle2
} from 'lucide-react';
import { MOCK_SHORTS } from '../data/mockVideos';
import { ShortVideo } from '../types';

interface ShortsViewerProps {
  onOpenShare?: (video: any) => void;
}

export const ShortsViewer: React.FC<ShortsViewerProps> = ({ onOpenShare }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [shortsList, setShortsList] = useState<ShortVideo[]>(MOCK_SHORTS);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentShort = shortsList[currentIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleLike = () => {
    setShortsList((prev) =>
      prev.map((s, idx) => {
        if (idx === currentIndex) {
          const liked = !s.isLiked;
          return {
            ...s,
            isLiked: liked,
            likes: liked ? s.likes + 1 : s.likes - 1,
          };
        }
        return s;
      })
    );
  };

  const nextShort = () => {
    if (currentIndex < shortsList.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsPlaying(true);
    }
  };

  const prevShort = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center py-6 px-4">
      <div className="relative flex items-center gap-4">
        {/* Main Vertical Player Container */}
        <div className="relative h-[720px] w-[405px] max-w-full overflow-hidden rounded-3xl bg-black shadow-2xl border border-gray-800">
          <video
            ref={videoRef}
            key={currentShort.videoUrl}
            src={currentShort.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={togglePlay}
            width={405}
            height={720}
            className="h-full w-full object-cover cursor-pointer"
          />

          {/* Top Controls Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-red-500 backdrop-blur-md">
              yohanex Shorts
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              className="rounded-full bg-black/60 p-2 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          {/* Bottom Video Meta Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20">
            {/* Channel Info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <img
                src={currentShort.channel.avatarUrl}
                alt={currentShort.channel.name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-red-500/40"
              />
              <span className="text-xs font-bold text-white truncate">{currentShort.channel.name}</span>
              <button className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-red-700 transition-colors">
                Ikuti
              </button>
            </div>

            {/* Title / Caption */}
            <p className="text-sm font-medium text-gray-100 line-clamp-2 leading-snug">
              {currentShort.title}
            </p>

            {/* Song Audio Track */}
            <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-300">
              <Music className="h-3.5 w-3.5 text-red-400 shrink-0 animate-spin" />
              <span className="truncate">{currentShort.songTitle}</span>
            </div>
          </div>
        </div>

        {/* Right Action Icons Column */}
        <div className="flex flex-col items-center gap-4">
          {/* Like */}
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 group focus:outline-none"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                currentShort.isLiked
                  ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-600/40'
                  : 'bg-[#1c1f2e] text-white hover:bg-[#282d42]'
              }`}
            >
              <Heart className={`h-6 w-6 ${currentShort.isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-xs font-bold text-gray-300">
              {currentShort.likes.toLocaleString()}
            </span>
          </button>

          {/* Comments */}
          <div className="flex flex-col items-center gap-1">
            <button
              aria-label="Komentar"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1f2e] text-white hover:bg-[#282d42] transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <span className="text-xs font-bold text-gray-300">
              {currentShort.commentsCount}
            </span>
          </div>

          {/* Share */}
          <button
            onClick={() => onOpenShare && onOpenShare(currentShort)}
            aria-label="Bagikan"
            className="flex flex-col items-center gap-1 text-white hover:text-red-400"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1f2e] text-white hover:bg-[#282d42] transition-colors">
              <Share2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-gray-300">Bagikan</span>
          </button>

          {/* Navigation Up & Down */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={prevShort}
              disabled={currentIndex === 0}
              aria-label="Short Sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181a26] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <button
              onClick={nextShort}
              disabled={currentIndex === shortsList.length - 1}
              aria-label="Short Berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181a26] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
