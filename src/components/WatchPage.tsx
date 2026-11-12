import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Bookmark, 
  CheckCircle2, 
  Bell, 
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { Video, Comment } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { formatViews } from '../utils/formatters';

interface WatchPageProps {
  video: Video;
  allVideos: Video[];
  onSelectVideo: (video: Video) => void;
  onOpenShare: (video: Video) => void;
  onToggleWatchLater: (video: Video) => void;
  isWatchLater: boolean;
}

export const WatchPage: React.FC<WatchPageProps> = ({
  video,
  allVideos,
  onSelectVideo,
  onOpenShare,
  onToggleWatchLater,
  isWatchLater,
}) => {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(video.channel.isSubscribed ?? false);
  const [isLiked, setIsLiked] = useState(video.isLiked ?? false);
  const [isDisliked, setIsDisliked] = useState(video.isDisliked ?? false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);

  // Comments state
  const [comments, setComments] = useState<Comment[]>(video.comments || []);
  const [newCommentText, setNewCommentText] = useState('');

  // Handle Like
  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      if (isDisliked) setIsDisliked(false);
    }
  };

  // Handle Dislike
  const handleToggleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    }
  };

  // Handle Subscribe
  const handleToggleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
  };

  // Handle Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'Anda (Yohan Eksplorer)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timestamp: 'Baru saja',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  // Handle Like on Comment
  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const liked = !c.isLiked;
          return {
            ...c,
            isLiked: liked,
            likes: liked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  // Next video in list
  const nextVideo = allVideos.find((v) => v.id !== video.id) || allVideos[0];

  const handleVideoEnded = () => {
    if (autoplayNext && nextVideo) {
      onSelectVideo(nextVideo);
    }
  };

  const recommendedVideos = allVideos.filter((v) => v.id !== video.id);

  return (
    <div className="flex-1 px-4 py-4 md:px-8 max-w-[1700px] mx-auto w-full">
      {/* If theater mode is active, video sits at top full width */}
      <div className={isTheaterMode ? 'w-full mb-6' : ''}>
        <VideoPlayer
          video={video}
          isTheaterMode={isTheaterMode}
          onToggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
          onEnded={handleVideoEnded}
          autoPlay={true}
        />
      </div>

      {/* Main Grid: Details + Recommendations */}
      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Video Details, Channel Info, Description, Comments */}
        <div className={isTheaterMode ? 'lg:col-span-8' : 'lg:col-span-8'}>
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
            {video.title}
          </h1>

          {/* Channel Bar & Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img
                src={video.channel.avatarUrl}
                alt={video.channel.name}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-red-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-white text-base hover:text-red-400 cursor-pointer">
                    {video.channel.name}
                  </h2>
                  {video.channel.verified && (
                    <CheckCircle2 className="h-4 w-4 fill-gray-400 text-[#0b0c10]" />
                  )}
                </div>
                <p className="text-xs text-gray-400">{video.channel.subscribers} pelanggan</p>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={handleToggleSubscribe}
                className={`ml-4 flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isSubscribed
                    ? 'bg-white/10 text-gray-200 hover:bg-white/20'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="h-3.5 w-3.5 fill-gray-300" />
                    <span>Disubscribe</span>
                  </>
                ) : (
                  <span>Langganan</span>
                )}
              </button>
            </div>

            {/* Actions: Like, Dislike, Share, Download, Save */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Like / Dislike pill */}
              <div className="flex items-center rounded-full bg-[#1c1f2e] p-1 border border-gray-800">
                <button
                  onClick={handleToggleLike}
                  className={`flex items-center gap-2 rounded-l-full px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-white/10 ${
                    isLiked ? 'text-red-400' : 'text-gray-300'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-red-400' : ''}`} />
                  <span>{likesCount.toLocaleString()}</span>
                </button>
                <div className="h-4 w-[1px] bg-gray-700"></div>
                <button
                  onClick={handleToggleDislike}
                  className={`rounded-r-full px-3 py-1.5 text-xs transition-colors hover:bg-white/10 ${
                    isDisliked ? 'text-red-400' : 'text-gray-400'
                  }`}
                  aria-label="Tidak suka"
                >
                  <ThumbsDown className={`h-4 w-4 ${isDisliked ? 'fill-red-400' : ''}`} />
                </button>
              </div>

              {/* Share */}
              <button
                onClick={() => onOpenShare(video)}
                className="flex items-center gap-2 rounded-full bg-[#1c1f2e] border border-gray-800 px-4 py-2 text-xs font-semibold text-gray-200 hover:bg-white/10 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan</span>
              </button>

              {/* Download */}
              <a
                href={video.videoUrl}
                download
                className="hidden sm:flex items-center gap-2 rounded-full bg-[#1c1f2e] border border-gray-800 px-4 py-2 text-xs font-semibold text-gray-200 hover:bg-white/10 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh</span>
              </a>

              {/* Save / Watch Later */}
              <button
                onClick={() => onToggleWatchLater(video)}
                className={`flex items-center gap-2 rounded-full border border-gray-800 px-4 py-2 text-xs font-semibold transition-colors ${
                  isWatchLater
                    ? 'bg-red-600/20 text-red-400 border-red-500/40'
                    : 'bg-[#1c1f2e] text-gray-200 hover:bg-white/10'
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isWatchLater ? 'fill-red-400' : ''}`} />
                <span>{isWatchLater ? 'Disimpan' : 'Simpan'}</span>
              </button>
            </div>
          </div>

          {/* Description Card */}
          <div className="mt-4 rounded-2xl bg-[#141624] p-4 text-sm text-gray-200 border border-gray-800/80">
            <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-2">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
              <span>•</span>
              <span className="text-red-400">#{video.category}</span>
            </div>

            <p className={`whitespace-pre-line text-gray-300 leading-relaxed ${!isDescExpanded ? 'line-clamp-3' : ''}`}>
              {video.description}
            </p>

            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="mt-2 text-xs font-bold text-red-400 hover:underline cursor-pointer"
            >
              {isDescExpanded ? 'Tampilkan Lebih Sedikit' : 'Selengkapnya...'}
            </button>
          </div>

          {/* Comments Section */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-bold text-white">
                  {comments.length} Komentar
                </h3>
              </div>
              <span className="text-xs text-gray-400">Urutkan: Teratas</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex items-start gap-3 mb-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Tambahkan komentar publik di yohanex..."
                  rows={2}
                  className="w-full rounded-xl border border-gray-700/80 bg-[#161826] p-3 text-sm text-gray-100 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <div className="mt-2 flex items-center justify-end gap-2">
                  {newCommentText && (
                    <button
                      type="button"
                      onClick={() => setNewCommentText('')}
                      className="rounded-full px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-red-600/30"
                  >
                    <Send className="h-3 w-3" />
                    <span>Kirim Komentar</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.02]">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="h-9 w-9 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-200">{c.author}</span>
                      <span className="text-[11px] text-gray-500">{c.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-300 leading-relaxed">{c.text}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                      <button
                        onClick={() => handleLikeComment(c.id)}
                        className={`flex items-center gap-1.5 hover:text-red-400 transition-colors ${
                          c.isLiked ? 'text-red-400 font-bold' : ''
                        }`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${c.isLiked ? 'fill-red-400' : ''}`} />
                        <span>{c.likes > 0 ? c.likes : ''}</span>
                      </button>
                      <button className="hover:text-white transition-colors">Balas</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Up Next / Recommended Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h3 className="font-bold text-white text-sm">Berikutnya</h3>
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <span>Putar Otomatis</span>
              <input
                type="checkbox"
                checked={autoplayNext}
                onChange={(e) => setAutoplayNext(e.target.checked)}
                className="h-4 w-4 rounded accent-red-600 cursor-pointer"
              />
            </label>
          </div>

          <div className="space-y-3">
            {recommendedVideos.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onSelectVideo(rec)}
                className="group flex gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-white/5 transition-all"
              >
                {/* Compact Thumbnail */}
                <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
                  <img
                    src={rec.thumbnailUrl}
                    alt={rec.title}
                    loading="lazy"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-semibold text-white">
                    {rec.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="line-clamp-2 text-xs font-semibold text-gray-200 group-hover:text-red-400 leading-snug">
                    {rec.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-400 truncate">{rec.channel.name}</p>
                  <p className="text-[11px] text-gray-500">{formatViews(rec.views)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
