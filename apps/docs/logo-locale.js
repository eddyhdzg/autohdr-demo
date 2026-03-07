(function () {
  function updateLogoHref() {
    var isSpanish = /^\/es(\/|$)/.test(window.location.pathname);
    var href = isSpanish ? "/es/" : "/";
    var logos = document.querySelectorAll(
      'img[src="/logo/light.svg"], img[src="/logo/dark.svg"]'
    );

    logos.forEach(function (img) {
      var anchor = img.closest("a");
      if (anchor) {
        anchor.href = href;
      }
    });
  }

  var observer = new MutationObserver(updateLogoHref);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("DOMContentLoaded", updateLogoHref);
})();
