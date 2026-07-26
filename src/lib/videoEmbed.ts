export type VideoEmbed = { type: 'iframe' | 'video'; src: string };

/** Turns a YouTube/Vimeo watch URL (or a direct video file URL) into an embeddable source. */
export function toVideoEmbedUrl(url: string): VideoEmbed {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, '');

    if (host === 'youtube.com') {
      const id = u.searchParams.get('v');
      if (id) return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` };
      const match = u.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/);
      if (match) return { type: 'iframe', src: `https://www.youtube.com/embed/${match[1]}` };
    }

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` };
    }

    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop();
      if (id) return { type: 'iframe', src: `https://player.vimeo.com/video/${id}` };
    }
  } catch {
    // not a valid absolute URL — fall through to the raw-value handling below
  }

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: 'video', src: url };
  return { type: 'iframe', src: url };
}
