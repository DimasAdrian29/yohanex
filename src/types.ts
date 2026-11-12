export interface Channel {
  id: string;
  name: string;
  avatarUrl: string;
  verified?: boolean;
  subscribers: string;
  subscribersCount: number;
  handle: string;
  isSubscribed?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface VideoChapter {
  time: number; // in seconds
  title: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string; // e.g. "12:45"
  durationSeconds: number;
  views: number;
  uploadedAt: string;
  category: string;
  tags: string[];
  channel: Channel;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  isSaved?: boolean;
  isLive?: boolean;
  quality?: '4K' | '1080p' | '720p';
  chapters?: VideoChapter[];
  comments?: Comment[];
}

export interface ShortVideo {
  id: string;
  title: string;
  videoUrl: string;
  channel: Channel;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  songTitle: string;
  views: string;
}

export type ViewMode = 'home' | 'watch' | 'shorts' | 'trending' | 'library' | 'history' | 'subscriptions';
