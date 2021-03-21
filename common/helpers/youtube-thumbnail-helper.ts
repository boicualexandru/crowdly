export function getYoutubeVideoId(url: string): string | null {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : null;
}

export function getVideoThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

export function replaceWithYoutubeThumbnail(url: string): string {
  const youtubeVideoId = getYoutubeVideoId(url);
  return youtubeVideoId ? getVideoThumbnail(youtubeVideoId) : url;
}