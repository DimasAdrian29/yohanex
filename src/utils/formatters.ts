export function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)} jt tayangan`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(0)} rb tayangan`;
  }
  return `${views} tayangan`;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');

  if (hrs > 0) {
    return `${hrs}:${formattedMins}:${formattedSecs}`;
  }
  return `${formattedMins}:${formattedSecs}`;
}
