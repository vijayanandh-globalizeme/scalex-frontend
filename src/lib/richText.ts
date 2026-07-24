import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = sanitizeHtml.defaults.allowedTags.concat(['span', 'img', 'u', 'ins', 'del', 'sub', 'sup']);

const ALLOWED_ATTRIBUTES = {
  ...sanitizeHtml.defaults.allowedAttributes,
  '*': ['style', 'class', 'id'],
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height'],
};

/**
 * Sanitizes admin-authored rich text before it is injected via
 * dangerouslySetInnerHTML, and forces every `<a>` to open in a new tab.
 *
 * Admin content is free-typed HTML and occasionally malformed (e.g. an
 * unclosed `<a>` tag). sanitize-html parses it through the same tree-based
 * rules a browser uses, so the output is always well-formed — an unclosed or
 * mistyped tag gets auto-closed/dropped here instead of silently swallowing
 * every element that follows it on the page (which otherwise causes a
 * hydration mismatch, since the server and client would disagree on where
 * that tag actually closes).
 */
export function withNewTabLinks(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }, true),
    },
  });
}
