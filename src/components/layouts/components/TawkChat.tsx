import Script from 'next/script';

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

/** Tawk's bubble is 64px wide; scale it to 48px to match the old chat float. */
const TAWK_BUBBLE_SCALE = 0.75;

/**
 * Desktop: Tawk loads on page load; its bubble (shrunk to 48px) opens the
 * default bottom-right panel.
 * Mobile (< sm, where MobileBottomBar shows): Tawk is NOT loaded up front (it
 * would flash its bubble before onLoad can hide it). The bar's "Chat with us"
 * calls openTawkChat() → window.__tawkOpen, which loads Tawk on demand and
 * opens the full-screen chat; minimizing hides the widget again.
 * Tawk sets inline !important styles on its iframes (incl. transform: none), so
 * CSS can't resize the bubble — it's scaled from JS by MutationObservers that
 * start before Tawk loads (see shrinkBubble).
 */
const buildTawkInit = (embedSrc: string) => `
window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();
(function () {
  var mobile = window.matchMedia('(max-width: 639px)');
  var loaded = false;
  var openOnLoad = false;
  var load = function () {
    if (loaded) return;
    loaded = true;
    var s1 = document.createElement('script');
    s1.async = true;
    s1.src = ${JSON.stringify(embedSrc)};
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);
  };
  window.__tawkOpen = function () {
    var api = window.Tawk_API;
    if (api.maximize && api.showWidget) {
      api.showWidget();
      api.maximize();
      return;
    }
    openOnLoad = true;
    load();
  };
  var syncVisibility = function () {
    var api = window.Tawk_API;
    if (!api.hideWidget || !api.showWidget) return;
    if (mobile.matches) {
      if (!(api.isChatMaximized && api.isChatMaximized())) api.hideWidget();
    } else {
      api.showWidget();
    }
  };
  // The bubble iframe lives in Tawk's #min-widget wrapper. Observers start
  // before Tawk loads, and MutationObserver callbacks run before the next
  // paint — so the bubble is never drawn at its default 64px size.
  var scale = 'scale(${TAWK_BUBBLE_SCALE})';
  var shrinkBubble = function () {
    var frame = document.querySelector('#min-widget iframe');
    if (!frame || frame.style.getPropertyValue('transform') === scale) return;
    frame.style.setProperty('transform', scale, 'important');
    frame.style.setProperty('transform-origin', 'bottom right', 'important');
  };
  // Phase 1: cheap childList-only watch until Tawk's #min-widget appears.
  // Phase 2: watch just Tawk's root for the inline style rewrites.
  var bodyObserver = new MutationObserver(function () {
    var minWidget = document.getElementById('min-widget');
    if (!minWidget) return;
    bodyObserver.disconnect();
    shrinkBubble();
    new MutationObserver(shrinkBubble).observe(minWidget.parentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style'],
    });
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  window.Tawk_API.onChatMinimized = syncVisibility;
  window.Tawk_API.onLoad = function () {
    if (openOnLoad) {
      openOnLoad = false;
      window.__tawkOpen();
    } else {
      syncVisibility();
    }
    shrinkBubble();
  };

  // Desktop loads immediately; crossing to desktop width later loads it too.
  mobile.addEventListener('change', function () {
    if (!mobile.matches) load();
    syncVisibility();
  });
  if (!mobile.matches) load();
})();
`;

/** Tawk.to live chat — replaces the old "Open chat" float. */
export default function TawkChat() {
  if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) return null;

  return (
    <Script id="tawk-init" strategy="afterInteractive">
      {buildTawkInit(`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`)}
    </Script>
  );
}
