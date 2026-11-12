import React, { useState } from 'react';
import { X, Upload, Video, Image, Check, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockVideos';
import { Video as VideoType } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoType) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1] || 'Coding & Tech');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80');
  const [quality, setQuality] = useState<'4K' | '1080p'>('4K');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const newVid: VideoType = {
              id: `user-video-${Date.now()}`,
              title: title.trim(),
              description: description.trim() || 'Video diunggah oleh kreator yohanex.',
              videoUrl: videoUrl.trim(),
              thumbnailUrl: thumbnailUrl.trim() || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
              duration: '05:20',
              durationSeconds: 320,
              views: 1,
              uploadedAt: 'Baru saja',
              category,
              tags: ['baru', 'yohanex', 'kreator'],
              quality,
              channel: {
                id: 'ch-current-user',
                name: 'Yohan Eksplorer',
                handle: '@yohanex_creator',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                verified: true,
                subscribers: '1 Pelanggan',
                subscribersCount: 1,
                isSubscribed: false,
              },
              likes: 1,
              dislikes: 0,
              comments: [],
            };

            onAddVideo(newVid);
            setIsUploading(false);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-gray-800 bg-[#12141f] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
              <Upload className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Unggah Video Baru ke yohanex</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Judul Video *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Tutorial React 19 & Video Streaming High Performance"
              className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Category & Quality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] px-3 py-2.5 text-sm text-gray-200 focus:border-red-500 focus:outline-none"
              >
                {CATEGORIES.filter((c) => c !== 'Semua').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Resolusi Kualitas
              </label>
              <div className="flex gap-3 pt-1">
                {(['4K', '1080p'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuality(q)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition-colors ${
                      quality === q
                        ? 'bg-red-600 text-white'
                        : 'bg-[#181a26] text-gray-400 border border-gray-700 hover:text-white'
                    }`}
                  >
                    {q} Ultra HD
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Stream URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center justify-between">
              <span>URL File Video (MP4 / WebM / HLS) *</span>
              <span className="text-[11px] text-gray-400 font-normal">Mendukung direct streaming URL</span>
            </label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] px-4 py-2.5 text-sm text-gray-100 font-mono text-xs placeholder-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              URL Gambar Thumbnail
            </label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] px-4 py-2.5 text-sm text-gray-100 font-mono text-xs placeholder-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Deskripsi Video
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tulis ringkasan konten, info kredit, dan tagar..."
              className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] p-3 text-sm text-gray-100 placeholder-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Progress bar during upload */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Memproses dan mengoptimalkan encoding video...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              <span>{isUploading ? 'Mengunggah...' : 'Publikasikan Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
