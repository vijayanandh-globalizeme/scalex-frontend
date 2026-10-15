/**
 * Opens the Tawk.to chat window. On mobile Tawk isn't loaded up front, so this
 * loads it on demand and opens the chat once ready (see TawkChat).
 * Returns false when the Tawk bootstrap isn't on the page, so callers can fall back.
 */
export function openTawkChat(): boolean {
  const open = (window as unknown as { __tawkOpen?: () => void }).__tawkOpen;
  if (!open) return false;
  open();
  return true;
}
