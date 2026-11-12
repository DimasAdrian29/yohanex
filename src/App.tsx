import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeFeed } from './components/HomeFeed';
import { WatchPage } from './components/WatchPage';
import { ShortsViewer } from './components/ShortsViewer';
import { TrendingPage } from './components/TrendingPage';
import { LibraryPage } from './components/LibraryPage';
import { UploadModal } from './components/UploadModal';
import { ShareModal } from './components/ShareModal';
import { INITIAL_VIDEOS } from './data/mockVideos';
import { Video, ViewMode } from './types';

export function App() {
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // User Library states
  const [historyVideos, setHistoryVideos] = useState<Video[]>([INITIAL_VIDEOS[0]]);
  const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([INITIAL_VIDEOS[1]]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([INITIAL_VIDEOS[0], INITIAL_VIDEOS[2]]);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [shareVideo, setShareVideo] = useState<Video | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Select video & start watch mode
  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setActiveView('watch');

    // Add to history
    setHistoryVideos((prev) => [video, ...prev.filter((v) => v.id !== video.id)]);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Watch Later
  const handleToggleWatchLater = (video: Video) => {
    const isAlreadySaved = watchLaterVideos.some((v) => v.id === video.id);
    if (isAlreadySaved) {
      setWatchLaterVideos((prev) => prev.filter((v) => v.id !== video.id));
      showToast('Dihapus dari Tonton Nanti');
    } else {
      setWatchLaterVideos((prev) => [video, ...prev]);
      showToast('Disimpan ke Tonton Nanti');
    }
  };

  // Add Uploaded Video
  const handleAddVideo = (newVideo: Video) => {
    setVideos([newVideo, ...videos]);
    showToast('Video berhasil dipublikasikan!');
    handleSelectVideo(newVideo);
  };

  // Search handling
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('home');
  };

  // Return home
  const handleHomeClick = () => {
    setActiveView('home');
    setSearchQuery('');
    setSelectedCategory('Semua');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const watchLaterIds = watchLaterVideos.map((v) => v.id);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-gray-800 bg-[#161826] px-5 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenUpload={() => setIsUploadOpen(true)}
        onHomeClick={handleHomeClick}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1">
        {/* Sidebar (in watch mode, auto-collapse unless user toggles) */}
        {activeView !== 'watch' ? (
          <Sidebar
            isOpen={isSidebarOpen}
            activeView={activeView}
            onSelectView={(view) => {
              setActiveView(view);
              if (view === 'home') setSelectedCategory('Semua');
            }}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveView('home');
            }}
          />
        ) : null}

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {activeView === 'home' && (
            <HomeFeed
              videos={videos}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onResetSearch={() => setSearchQuery('')}
              onSelectVideo={handleSelectVideo}
              onSelectShortsView={() => setActiveView('shorts')}
              onToggleWatchLater={handleToggleWatchLater}
              onOpenShare={(v) => setShareVideo(v)}
              watchLaterIds={watchLaterIds}
            />
          )}

          {activeView === 'watch' && selectedVideo && (
            <WatchPage
              video={selectedVideo}
              allVideos={videos}
              onSelectVideo={handleSelectVideo}
              onOpenShare={(v) => setShareVideo(v)}
              onToggleWatchLater={handleToggleWatchLater}
              isWatchLater={watchLaterIds.includes(selectedVideo.id)}
            />
          )}

          {activeView === 'shorts' && (
            <ShortsViewer onOpenShare={(s) => setShareVideo(s as any)} />
          )}

          {activeView === 'trending' && (
            <TrendingPage videos={videos} onSelectVideo={handleSelectVideo} />
          )}

          {(activeView === 'library' || activeView === 'history' || activeView === 'subscriptions') && (
            <LibraryPage
              historyVideos={historyVideos}
              watchLaterVideos={watchLaterVideos}
              likedVideos={likedVideos}
              onSelectVideo={handleSelectVideo}
              onClearHistory={() => {
                setHistoryVideos([]);
                showToast('Riwayat tontonan telah dibersihkan');
              }}
              onRemoveWatchLater={(v) => handleToggleWatchLater(v)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddVideo={handleAddVideo}
      />

      <ShareModal
        isOpen={!!shareVideo}
        onClose={() => setShareVideo(null)}
        video={shareVideo}
      />
    </div>
  );
}

export default App;
