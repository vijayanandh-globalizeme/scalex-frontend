const INLINE_TAGS = 'span|strong|em|b|i|a|mark|u';

/**
 * Cleans admin-authored blog HTML that often pastes nbsp, word-joiners, or inline
 * tags between letters/words — causing "Scru m", "isa", "thata", etc.
 */
export function sanitizeBlogContent(html: string) {
  let out = html
    .replace(/[\u00A0\u202F\u2007\u2008\u2009\u200A\u205F\u3000]/g, ' ')
    .replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, ' ')
    .replace(/&nbsp;|&#160;|&#xA0;|&shy;|&#173;/gi, ' ')
    .replace(/<wbr\s*\/?>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\r\n|\r|\n/g, ' ');

  const inlineTag = INLINE_TAGS;

  // Prevent glued words across inline tags: Scru<span>m</span> → Scru m
  out = out.replace(new RegExp(`([a-zA-Z0-9])<(${inlineTag})\\b`, 'gi'), '$1 <$2');
  out = out.replace(new RegExp(`</(${inlineTag})\\b[^>]*>([a-zA-Z0-9])`, 'gi'), '</$1> $2');
  out = out.replace(
    new RegExp(`</(${inlineTag})\\b[^>]*>\\s*<(${inlineTag})\\b`, 'gi'),
    '</$1> <$2',
  );

  out = out.replace(/\s{2,}/g, ' ');

  // Fix glued function words still present in source HTML: "isa" → "is a"
  out = out.replace(
    /\b(is|that|to|within|of|in|for|on|at|as|an|or|and|with|from|into|by)(a|an|the)\b/gi,
    '$1 $2',
  );

  return out;
}
