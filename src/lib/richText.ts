/** Forces any admin-authored `<a>` tags to open in a new tab, regardless of what attributes were typed. */
export function withNewTabLinks(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    let nextAttrs = /\btarget\s*=/i.test(attrs)
      ? attrs.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_blank"')
      : `${attrs} target="_blank"`;
    nextAttrs = /\brel\s*=/i.test(nextAttrs)
      ? nextAttrs.replace(/\brel\s*=\s*(["']).*?\1/i, 'rel="noopener noreferrer"')
      : `${nextAttrs} rel="noopener noreferrer"`;
    return `<a${nextAttrs}>`;
  });
}
