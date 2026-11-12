import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send, Globe, Code } from 'lucide-react';
import { Video } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, video }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'embed'>('link');

  if (!isOpen || !video) return null;

  const currentUrl = window.location.href.split('?')[0] + `?v=${video.id}`;
  const embedCode = `<iframe width="560" height="315" src="${video.videoUrl}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(video.title + ' - ' + currentUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600',
      href: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(video.title)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Globe,
      color: 'bg-neutral-800 hover:bg-neutral-700',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(video.title)}&url=${encodeURIComponent(currentUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-gray-800 bg-[#12141f] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-red-500" />
            <h3 className="text-base font-bold text-white">Bagikan Video</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video preview mini banner */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#181b29] p-2.5 border border-gray-800/80">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-14 w-24 rounded-lg object-cover shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">{video.channel.name}</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-4 flex gap-2 border-b border-gray-800 pb-2">
          <button
            onClick={() => setActiveTab('link')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'link' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Tautan Langsung
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'embed' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sematkan (Embed)
          </button>
        </div>

        {activeTab === 'link' ? (
          <div className="mt-4 space-y-4">
            {/* Social Icons */}
            <div className="flex items-center justify-around gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:scale-105 ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200">
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Direct Copy Input */}
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] py-2.5 pl-3.5 pr-28 text-xs text-gray-300 font-mono focus:outline-none"
              />
              <button
                onClick={() => handleCopy(currentUrl)}
                className="absolute right-1.5 flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <textarea
              readOnly
              rows={4}
              value={embedCode}
              className="w-full rounded-xl border border-gray-700/80 bg-[#181a26] p-3 text-xs text-gray-300 font-mono focus:outline-none"
            />
            <button
              onClick={() => handleCopy(embedCode)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
            >
              <Code className="h-4 w-4" />
              <span>{copied ? 'Kode Sematan Tersalin!' : 'Salin Kode Sematan'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
