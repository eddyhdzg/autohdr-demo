// Locale-aware navbar links (EDDY-93)
// Mintlify's logo.href and navbar are global config with no per-language overrides.
// Mintlify is a React SPA — it replaces DOM elements on re-renders, so attaching
// listeners to individual elements is unreliable. Instead, we use a single
// document-level capturing listener that intercepts ALL clicks and checks if
// they target a logo or "Back to App" link.
// Handles both /es/... (mintlify dev) and /docs/es/... (proxied via Next.js rewrites).
(function () {
  var APP_BASE = "https://autohdr.vercel.app";
  var LABELS = { en: "Back to App", es: "Volver a la App" };
  var updating = false;
  var debounceTimer = null;

  function getDocsBase() {
    return window.location.pathname.startsWith("/docs") ? "/docs" : "";
  }

  function getLocale() {
    var path = window.location.pathname;
    return path.includes("/es/") || path.endsWith("/es") ? "es" : "en";
  }

  function isLogoClick(target) {
    var img = target.closest('img[src*="/logo/"]');
    if (img) return !!img.closest("a");
    var anchor = target.closest("a");
    if (anchor) return !!anchor.querySelector('img[src*="/logo/"]');
    return false;
  }

  function isBackToAppClick(target) {
    var anchor = target.closest('a[href*="autohdr.vercel.app"]');
    return !!anchor;
  }

  // Single document-level capture listener — immune to React re-renders
  document.addEventListener(
    "click",
    function (e) {
      var locale = getLocale();

      if (isLogoClick(e.target) && locale === "es") {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.href = getDocsBase() + "/es/";
        return;
      }

      if (isBackToAppClick(e.target)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.href = APP_BASE + (locale === "es" ? "/es/" : "/");
        return;
      }
    },
    true
  );

  // Update "Back to App" label text to match locale.
  // Uses narrow selector (href-based) to avoid touching unrelated elements.
  // Disconnects observer while mutating to prevent feedback loops.
  function updateLabels() {
    if (updating) return;
    updating = true;
    observer.disconnect();

    var locale = getLocale();
    var label = LABELS[locale];
    document
      .querySelectorAll('a[href*="autohdr.vercel.app"]')
      .forEach(function (link) {
        var text = link.textContent.trim();
        if ((text === LABELS.en || text === LABELS.es) && text !== label) {
          link.textContent = label;
        }
      });

    requestAnimationFrame(function () {
      observer.observe(document.body, { childList: true, subtree: true });
      updating = false;
    });
  }

  function scheduleUpdate() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateLabels, 50);
  }

  var observer = new MutationObserver(scheduleUpdate);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updateLabels();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    updateLabels();
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
