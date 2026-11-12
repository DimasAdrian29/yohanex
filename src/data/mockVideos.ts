import { Video, ShortVideo } from '../types';

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'Sintel: Petualangan Epik Gadis Pengelana & Naga Legendaris',
    description: `Film animasi sumber terbuka mahakarya Blender Foundation. Mengisahkan perjuangan Sintel yang menjelajahi daratan berbahaya dan menembus badai es untuk menyelamatkan bayi naga sahabatnya bernama Scales. 

Nikmati sinematografi animasi 3D kelas dunia dengan resolusi 4K dan audio spasial hanya di yohanex.

📌 Bab Video:
00:00 - Pengenalan di Gurun Es
00:45 - Pertemuan Tak Terduga
01:30 - Latihan Bersama Scales
02:15 - Pertarungan Puncak
03:00 - Kesimpulan Emosional`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    duration: '03:48',
    durationSeconds: 228,
    views: 1425890,
    uploadedAt: '2 hari yang lalu',
    category: 'Film & Animasi',
    tags: ['animasi', 'blender', '4k', 'cinematic', 'epic'],
    quality: '4K',
    channel: {
      id: 'ch-blender',
      name: 'Blender Studio Cinema',
      handle: '@blenderstudio',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '2.84 jt',
      subscribersCount: 2840000,
      isSubscribed: true,
    },
    likes: 98400,
    dislikes: 1200,
    chapters: [
      { time: 0, title: 'Pengenalan Gurun Es' },
      { time: 45, title: 'Pertemuan Tak Terduga' },
      { time: 90, title: 'Latihan Bersama Scales' },
      { time: 135, title: 'Pertarungan Puncak' },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Rian Pratama',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'Animasi Blender selalu luar biasa. Kualitas visual di yohanex sangat jernih tanpa buffering sama sekali!',
        timestamp: '1 hari yang lalu',
        likes: 420,
      },
      {
        id: 'c2',
        author: 'Siti Rahmawati',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Ending film ini selalu bikin terharu 🥺 detail ekspresinya juara.',
        timestamp: '18 jam yang lalu',
        likes: 154,
      },
      {
        id: 'c3',
        author: 'Deni Tech',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        text: 'Fitur keyboard shortcut player-nya (Space, F, M) responsif banget! Keren UI platform yohanex ini.',
        timestamp: '5 jam yang lalu',
        likes: 67,
      }
    ]
  },
  {
    id: 'vid-2',
    title: 'Tears of Steel: Sci-Fi VFX VFX Breakdown & Distopia Amsterdam',
    description: `Film fiksi ilmiah futuristik di mana sekelompok prajurit dan ilmuwan berkumpul di Oude Kerk Amsterdam untuk merekayasa ulang masa lalu demi menyelamatkan bumi dari invasi robot raksasa destruktif.

Dibuat menggunakan Open Source Pipeline dengan efek visual compositing tingkat tinggi.

Jangan lupa like, tinggalkan komentar, dan klik tombol Subscribe untuk mendukung kreator open source.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    duration: '12:14',
    durationSeconds: 734,
    views: 890300,
    uploadedAt: '4 hari yang lalu',
    category: 'Film & Animasi',
    tags: ['scifi', 'vfx', 'amsterdam', 'cyberpunk', 'blender'],
    quality: '1080p',
    channel: {
      id: 'ch-scifi',
      name: 'Future Visions VFX',
      handle: '@futurevisions',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '1.15 jt',
      subscribersCount: 1150000,
      isSubscribed: false,
    },
    likes: 45200,
    dislikes: 620,
    chapters: [
      { time: 0, title: 'Pembukaan Gereja Kuno' },
      { time: 120, title: 'Aktivasi Memori Celia' },
      { time: 300, title: 'Serangan Mecha' },
    ],
    comments: [
      {
        id: 'c4',
        author: 'Arif Gunawan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Desain robot mecha-nya detail banget. Tone warnanya kerasa distopia nyata!',
        timestamp: '3 hari yang lalu',
        likes: 89,
      }
    ]
  },
  {
    id: 'vid-3',
    title: 'Membangun Ekosistem Fullstack Modern 2026: React, TypeScript & Vite',
    description: `Panduan komprehensif arsitektur aplikasi web modern tahun 2026. Kita akan membahas state management mutakhir, optimalisasi pemutaran media video dengan lazy-loading dan progressive enhancement, serta integrasi Tailwind CSS v4 yang super cepat.

💻 Source code dan dokumentasi interaktif tersedia langsung di GitHub yohanex streaming suite.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    duration: '08:42',
    durationSeconds: 522,
    views: 310500,
    uploadedAt: '1 minggu yang lalu',
    category: 'Coding & Tech',
    tags: ['react', 'vite', 'typescript', 'frontend', 'tailwindcss'],
    quality: '4K',
    channel: {
      id: 'ch-yohan-code',
      name: 'Yohan Tech Labs',
      handle: '@yohantech',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '780 rb',
      subscribersCount: 780000,
      isSubscribed: true,
    },
    likes: 29800,
    dislikes: 140,
    comments: [
      {
        id: 'c5',
        author: 'Budi Developer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        text: 'Materi daging banget Mas Yohan! Player videonya juga smooth abis pas di-seek!',
        timestamp: '6 hari yang lalu',
        likes: 245,
      }
    ]
  },
  {
    id: 'vid-4',
    title: 'Big Buck Bunny: Humor Satwa Liar di Hutan Belantara (Remastered 60FPS)',
    description: `Kisah klasik kelinci raksasa berhati lembut yang memutuskan membalas dendam dengan jebakan cerdik setelah tiga tupai pengacau mengganggu ketentraman kupu-kupu dan burung hutan.

Dibuat dengan Open Source Toolchain, video ini tetap menjadi standar uji performa pemutar video streaming di seluruh dunia.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    duration: '09:56',
    durationSeconds: 596,
    views: 4560000,
    uploadedAt: '2 minggu yang lalu',
    category: 'Film & Animasi',
    tags: ['bunny', 'animasi', 'classic', 'comedy', 'hd'],
    quality: '1080p',
    channel: {
      id: 'ch-blender',
      name: 'Blender Studio Cinema',
      handle: '@blenderstudio',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '2.84 jt',
      subscribersCount: 2840000,
      isSubscribed: true,
    },
    likes: 189000,
    dislikes: 3100,
    comments: [
      {
        id: 'c6',
        author: 'Nadia Putri',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        text: 'Nostalgia banget pas pertama kali belajar komputer selalu putar video ini haha!',
        timestamp: '1 minggu yang lalu',
        likes: 312,
      }
    ]
  },
  {
    id: 'vid-5',
    title: 'Next-Gen RTX Gaming: Eksplorasi Dunia Cyberpunk Tanpa Batas',
    description: `Uji coba grafis photorealistic dengan Ray Tracing Overdrive Mode, Path Tracing real-time, dan DLSS 4.0. Saksikan refleksi cahaya neon dan bayangan basah jalanan distopia kota malam dengan detail yang memukau.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    duration: '04:15',
    durationSeconds: 255,
    views: 742100,
    uploadedAt: '5 hari yang lalu',
    category: 'Gaming',
    tags: ['gaming', 'rtx', 'cyberpunk', 'pcgaming', 'raytracing'],
    quality: '4K',
    channel: {
      id: 'ch-gaming',
      name: 'Apex Gaming Zone',
      handle: '@apexgaming',
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '920 rb',
      subscribersCount: 920000,
      isSubscribed: false,
    },
    likes: 51200,
    dislikes: 480,
    comments: [
      {
        id: 'c7',
        author: 'Bayu Cyber',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        text: 'Frame rate stabil dan visualnya gila banget. Pengen rakit PC spek dewa jadinya.',
        timestamp: '3 hari yang lalu',
        likes: 110,
      }
    ]
  },
  {
    id: 'vid-6',
    title: 'Lo-Fi Chill & Sintesis Gelombang: Musik Relaksasi Fokus Kerja & Koding',
    description: `Alunan instrumen lo-fi luring yang menenangkan dengan ketukan ritmis lembut, atmosfer hujan malam hari, dan melodi hangat piano rhodes. Cocok menemani sesi koding, membaca, maupun istirahat malam Anda.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    duration: '06:30',
    durationSeconds: 390,
    views: 2190000,
    uploadedAt: '3 minggu yang lalu',
    category: 'Musik',
    tags: ['lofi', 'chill', 'music', 'coding', 'beats'],
    quality: '1080p',
    channel: {
      id: 'ch-lofi',
      name: 'Yohanex Chillwave',
      handle: '@chillbeats',
      avatarUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120&auto=format&fit=crop&q=80',
      verified: false,
      subscribers: '1.45 jt',
      subscribersCount: 1450000,
      isSubscribed: true,
    },
    likes: 143000,
    dislikes: 820,
    comments: [
      {
        id: 'c8',
        author: 'Lina Melodia',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'Nemu video ini pas lagi ngerjain deadline skripsi, langsung adem otaknya.',
        timestamp: '1 minggu yang lalu',
        likes: 95,
      }
    ]
  },
  {
    id: 'vid-7',
    title: 'Eksperimen Surreal Elephants Dream: Perjalanan di Dalam Mesin Raksasa',
    description: `Dua petualang, Proog yang bijak dan Emo yang skeptis, menjelajahi struktur mekanis yang berubah-ubah secara konstan. Menampilkan animasi 3D open source revolusioner dengan filosofi misterius.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    duration: '10:54',
    durationSeconds: 654,
    views: 630400,
    uploadedAt: '1 bulan yang lalu',
    category: 'Film & Animasi',
    tags: ['surreal', 'animasi', 'blender', 'sci-fi', 'art'],
    quality: '1080p',
    channel: {
      id: 'ch-blender',
      name: 'Blender Studio Cinema',
      handle: '@blenderstudio',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '2.84 jt',
      subscribersCount: 2840000,
      isSubscribed: true,
    },
    likes: 38200,
    dislikes: 540,
    comments: []
  },
  {
    id: 'vid-8',
    title: 'Revolusi AI Generatif 2026: Agentic Workflows & Model Multimodal',
    description: `Bagaimana agen kecerdasan buatan otonom kini mengubah alur kerja rekayasa perangkat lunak, kreasi video, dan pemrosesan data real-time. Simak analisis mendalam bersama pakar industri teknologi dunia.`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    duration: '07:20',
    durationSeconds: 440,
    views: 520000,
    uploadedAt: '3 hari yang lalu',
    category: 'AI & Masa Depan',
    tags: ['ai', 'future', 'technology', 'machinelearning', 'agent'],
    quality: '4K',
    channel: {
      id: 'ch-yohan-code',
      name: 'Yohan Tech Labs',
      handle: '@yohantech',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      verified: true,
      subscribers: '780 rb',
      subscribersCount: 780000,
      isSubscribed: true,
    },
    likes: 41200,
    dislikes: 310,
    comments: []
  }
];

export const CATEGORIES = [
  'Semua',
  'Coding & Tech',
  'Film & Animasi',
  'Gaming',
  'Musik',
  'AI & Masa Depan',
  'Trailer 4K',
  'Trending',
  'Tutorial Web',
  'Lo-Fi Beats',
  'Sains & Alam'
];

export const MOCK_SHORTS: ShortVideo[] = [
  {
    id: 'short-1',
    title: 'Tips Cepat Optimasi Performa Video Player di React! ⚡ #webdev #react',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    channel: {
      id: 'ch-yohan-code',
      name: 'Yohan Tech Labs',
      handle: '@yohantech',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      subscribers: '780 rb',
      subscribersCount: 780000,
    },
    likes: 12540,
    commentsCount: 342,
    songTitle: 'Original Sound - Yohan Tech Labs',
    views: '180 rb'
  },
  {
    id: 'short-2',
    title: 'Detik-Detik Robot Mecha Mendarat di Amsterdam! 🤖 #scifi #blender',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    channel: {
      id: 'ch-scifi',
      name: 'Future Visions VFX',
      handle: '@futurevisions',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
      subscribers: '1.15 jt',
      subscribersCount: 1150000,
    },
    likes: 34200,
    commentsCount: 689,
    songTitle: 'Heavy Metal Synthwave - Cyberpunk Audio',
    views: '412 rb'
  },
  {
    id: 'short-3',
    title: 'Kelinci Terkuat di Hutan Mengamuk! 🐰 #comedy #funny',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    channel: {
      id: 'ch-blender',
      name: 'Blender Studio Cinema',
      handle: '@blenderstudio',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      subscribers: '2.84 jt',
      subscribersCount: 2840000,
    },
    likes: 98400,
    commentsCount: 1420,
    songTitle: 'Funny Woodland Orchestra - Retro Tunes',
    views: '920 rb'
  }
];
