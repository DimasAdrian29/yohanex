import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize, 
  PictureInPicture, 
  Sliders, 
  Settings, 
  Tv,
  Check
} from 'lucide-react';
import { Video } from '../types';
import { formatTime } from '../utils/formatters';

interface VideoPlayerProps {
  video: Video;
  isTheaterMode: boolean;
  onToggleTheaterMode: () => void;
  onEnded?: () => void;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isTheaterMode,
  onToggleTheaterMode,
  onEnded,
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState<'Auto' | '4K' | '1080p' | '720p'>('1080p');

  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [showCenterFeedback, setShowCenterFeedback] = useState<'play' | 'pause' | null>(null);

  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowCenterFeedback('play');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowCenterFeedback('pause');
    }
    setTimeout(() => setShowCenterFeedback(null), 500);
  }, []);

  // Sync with reduced-motion preference
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches && autoPlay && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [autoPlay]);

  // Video Time Updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Calculate buffered range
    if (videoRef.current.buffered.length > 0) {
      const buffered = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedEnd(buffered);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    if (autoPlay) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay policy prevented unmuted autoplay
        setIsPlaying(false);
      });
    }
  };

  // Skip time (+10s / -10s)
  const skip = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      Math.max(videoRef.current.currentTime + seconds, 0),
      duration
    );
  }, [duration]);

  // Seek on timeline
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !videoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(pos * duration);
    setHoverPosition(pos * 100);
  };

  const handleTimelineMouseLeave = () => {
    setHoverTime(null);
  };

  // Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Playback Speed
  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Picture in Picture
  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current && document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error('PiP error:', err);
    }
  };

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  }, []);

  // Listen to fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard Shortcuts (Space, k, f, m, j, l, t)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'j':
          e.preventDefault();
          skip(-10);
          break;
        case 'l':
          e.preventDefault();
          skip(10);
          break;
        case 't':
          e.preventDefault();
          onToggleTheaterMode();
          break;
        case 'arrowup':
          e.preventDefault();
          setVolume((v) => {
            const next = Math.min(1, v + 0.1);
            if (videoRef.current) videoRef.current.volume = next;
            return next;
          });
          break;
        case 'arrowdown':
          e.preventDefault();
          setVolume((v) => {
            const next = Math.max(0, v - 0.1);
            if (videoRef.current) videoRef.current.volume = next;
            return next;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleFullscreen, toggleMute, skip, onToggleTheaterMode]);

  // Autohide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
        setShowQualityMenu(false);
      }, 2500);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative w-full overflow-hidden bg-black select-none group transition-all duration-300 ${
        isFullscreen
          ? 'h-screen w-screen fixed inset-0 z-50'
          : isTheaterMode
          ? 'max-h-[80vh] aspect-[21/9]'
          : 'aspect-video rounded-2xl shadow-2xl border border-gray-800/80'
      }`}
    >
      {/* HTML5 Video Element (Compliant with Modern Web Guidance) */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        preload="metadata"
        playsInline
        width={1280}
        height={720}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        className="h-full w-full object-contain cursor-pointer"
      />

      {/* Center Feedback Animation (Play/Pause ripple) */}
      {showCenterFeedback && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md animate-ping">
            {showCenterFeedback === 'play' ? (
              <Play className="h-10 w-10 fill-white text-white ml-1" />
            ) : (
              <Pause className="h-10 w-10 fill-white text-white" />
            )}
          </div>
        </div>
      )}

      {/* Player Overlay Controls */}
      <div
        className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-transparent to-black/40 p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Header inside player */}
        <div className="flex items-center justify-between text-white drop-shadow-md">
          <h2 className="text-base font-semibold truncate pr-4">{video.title}</h2>
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-600/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
              {selectedQuality}
            </span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="space-y-2">
          {/* Custom Timeline Progress Bar */}
          <div
            ref={timelineRef}
            onClick={handleTimelineClick}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={handleTimelineMouseLeave}
            className="group/timeline relative flex h-3 w-full cursor-pointer items-center"
          >
            {/* Timeline Hover Time Tooltip */}
            {hoverTime !== null && (
              <div
                style={{ left: `${hoverPosition}%` }}
                className="absolute bottom-5 -translate-x-1/2 rounded bg-[#181a24] px-2 py-1 text-xs font-medium text-white shadow-lg pointer-events-none border border-gray-700 whitespace-nowrap"
              >
                {formatTime(hoverTime)}
              </div>
            )}

            {/* Background Track */}
            <div className="h-1 w-full rounded-full bg-white/20 transition-all group-hover/timeline:h-2">
              {/* Buffered Progress */}
              <div
                style={{ width: `${bufferedPercent}%` }}
                className="h-full rounded-full bg-white/30"
              />
              {/* Played Progress */}
              <div
                style={{ width: `${progressPercent}%` }}
                className="relative -top-full h-full rounded-full bg-red-600"
              >
                {/* Scrubber Knob */}
                <div className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md transition-transform scale-0 group-hover/timeline:scale-100" />
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between text-white">
            {/* Left Controls: Play, Skip, Volume, Time */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda (k)' : 'Putar (k)'}
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-white" />
                ) : (
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => skip(-10)}
                aria-label="Mundur 10 detik (j)"
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <button
                onClick={() => skip(10)}
                aria-label="Maju 10 detik (l)"
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              >
                <RotateCw className="h-5 w-5" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Bunyikan suara (m)' : 'Bisukan suara (m)'}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-red-400" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1 accent-red-600 cursor-pointer bg-white/30 rounded-lg"
                />
              </div>

              {/* Time Display */}
              <div className="text-xs font-mono font-medium text-gray-300 ml-1">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-gray-500">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Speed, Quality, PiP, Theater, Fullscreen */}
            <div className="flex items-center gap-2">
              {/* Speed Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSpeedMenu(!showSpeedMenu);
                    setShowQualityMenu(false);
                  }}
                  className="rounded-lg px-2 py-1 text-xs font-semibold hover:bg-white/20 transition-colors"
                >
                  {playbackSpeed}x
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-10 right-0 z-50 w-28 rounded-xl border border-gray-800 bg-[#141624] p-1 shadow-2xl backdrop-blur-md">
                    <p className="px-2 py-1 text-[10px] uppercase font-bold text-gray-400">Kecepatan</p>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs ${
                          playbackSpeed === speed ? 'bg-red-600/30 text-red-400 font-bold' : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{speed === 1 ? 'Normal' : `${speed}x`}</span>
                        {playbackSpeed === speed && <Check className="h-3 w-3" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowQualityMenu(!showQualityMenu);
                    setShowSpeedMenu(false);
                  }}
                  aria-label="Kualitas Pemutaran"
                  className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {showQualityMenu && (
                  <div className="absolute bottom-10 right-0 z-50 w-32 rounded-xl border border-gray-800 bg-[#141624] p-1 shadow-2xl backdrop-blur-md">
                    <p className="px-2 py-1 text-[10px] uppercase font-bold text-gray-400">Resolusi</p>
                    {(['Auto', '4K', '1080p', '720p'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setSelectedQuality(q);
                          setShowQualityMenu(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs ${
                          selectedQuality === q ? 'bg-red-600/30 text-red-400 font-bold' : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{q}</span>
                        {selectedQuality === q && <Check className="h-3 w-3" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture-in-Picture */}
              <button
                onClick={togglePictureInPicture}
                aria-label="Picture in Picture"
                className="hidden sm:inline-flex rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                <PictureInPicture className="h-5 w-5" />
              </button>

              {/* Theater Mode */}
              <button
                onClick={onToggleTheaterMode}
                aria-label="Mode Teater (t)"
                className="hidden sm:inline-flex rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                <Tv className={`h-5 w-5 ${isTheaterMode ? 'text-red-400' : 'text-white'}`} />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Keluar Layar Penuh (f)' : 'Layar Penuh (f)'}
                className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
