// Sidebar footer + page footer enhancements
// Mintlify auto-includes .js files in the docs root on every page.
(function () {
  var SOCIALS = [
    {
      href: "https://www.instagram.com/auto.hdr/",
      label: "Instagram",
      svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z" fill="currentColor"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z" fill="currentColor"/></svg>',
    },
    {
      href: "https://www.tiktok.com/@auto.hdr",
      label: "TikTok",
      svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z" fill="currentColor"/></svg>',
    },
    {
      href: "https://www.linkedin.com/company/autohdr/",
      label: "LinkedIn",
      svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" fill="currentColor"/></svg>',
    },
  ];

  var TIKTOK_SVG = SOCIALS[1].svg;

  function parseSvg(svgString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(svgString, "image/svg+xml");
    return doc.documentElement;
  }

  // --- Sidebar footer: social icons only ---
  function injectSidebarFooter() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar || sidebar.querySelector(".sidebar-footer")) return;

    var footer = document.createElement("div");
    footer.className = "sidebar-footer";

    SOCIALS.forEach(function (social) {
      var link = document.createElement("a");
      link.href = social.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", social.label);

      // TikTok gets a wrapper for consistent 20px box sizing
      if (social.label === "TikTok") {
        link.className = "sidebar-footer-tiktok";
      }

      link.appendChild(parseSvg(social.svg));
      footer.appendChild(link);
    });

    sidebar.appendChild(footer);
  }

  // --- Page footer: inject TikTok icon ---
  function injectFooterTikTok() {
    var footer = document.getElementById("footer");
    if (!footer || footer.querySelector("[data-tiktok-injected]")) return;

    var socialLinks = footer.querySelectorAll(
      "a[href*='instagram'], a[href*='linkedin']"
    );
    if (socialLinks.length === 0) return;

    var lastSocial = socialLinks[socialLinks.length - 1];
    var container = lastSocial.parentElement;
    if (!container) return;

    // Clone the style from a sibling link for consistent color
    var refLink = socialLinks[0];
    var refStyle = window.getComputedStyle(refLink);

    var tiktokLink = document.createElement("a");
    tiktokLink.href = "https://www.tiktok.com/@auto.hdr";
    tiktokLink.target = "_blank";
    tiktokLink.rel = "noopener noreferrer";
    tiktokLink.setAttribute("aria-label", "TikTok");
    tiktokLink.setAttribute("data-tiktok-injected", "true");
    tiktokLink.className = refLink.className;
    tiktokLink.style.color = refStyle.color;
    tiktokLink.appendChild(parseSvg(TIKTOK_SVG));

    // Insert between Instagram and LinkedIn
    var instagramLink = container.querySelector("a[href*='instagram']");
    if (instagramLink && instagramLink.nextSibling) {
      container.insertBefore(tiktokLink, instagramLink.nextSibling);
    } else {
      container.appendChild(tiktokLink);
    }
  }

  function injectAll() {
    injectSidebarFooter();
    injectFooterTikTok();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectAll);
  } else {
    injectAll();
  }

  var observer = new MutationObserver(function () {
    var sidebarDone = !!document.querySelector(".sidebar-footer");
    var footerDone = !!document.querySelector("[data-tiktok-injected]");

    if (!sidebarDone) injectSidebarFooter();
    if (document.getElementById("footer") && !footerDone) injectFooterTikTok();

    // Disconnect once both injections are complete
    if (
      document.querySelector(".sidebar-footer") &&
      document.querySelector("[data-tiktok-injected]")
    ) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
