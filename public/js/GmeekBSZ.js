(function () {
  var STYLE_ID = "gmeek-bsz-style";
  var SCRIPT_ID = "gmeek-bsz-loader";
  var SCRIPT_SRC = "https://busuanzi.081531.xyz/js";
  var API_SRC = "https://busuanzi.081531.xyz/api";
  var PREFIX = "busuanzi_value";
  var COUNTERS = [
    {
      containerId: "busuanzi_value_container_page_pv",
      valueId: "busuanzi_value_page_pv",
    },
    {
      containerId: "busuanzi_value_container_site_uv",
      valueId: "busuanzi_value_site_uv",
    },
  ];

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "[data-busuanzi-item]{display:none;}",
      "[data-busuanzi-item][data-ready='true']{display:inline-flex;}",
    ].join("");
    document.head.appendChild(style);
  }

  function watchCounter(counter) {
    var container = document.getElementById(counter.containerId);
    var value = document.getElementById(counter.valueId);

    if (
      !(container instanceof HTMLElement) ||
      !(value instanceof HTMLElement)
    ) {
      return null;
    }

    function syncVisibility() {
      container.dataset.ready =
        value.textContent && value.textContent.trim() ? "true" : "false";
    }

    syncVisibility();

    var observer = new MutationObserver(syncVisibility);
    observer.observe(value, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return observer;
  }

  function loadBusuanzi() {
    var oldScript = document.getElementById(SCRIPT_ID);
    if (oldScript) oldScript.remove();

    var script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = SCRIPT_SRC;
    script.dataset.api = API_SRC;
    script.dataset.prefix = PREFIX;
    document.head.appendChild(script);
  }

  function init() {
    ensureStyles();

    if (window.__gmeekBSZObservers) {
      window.__gmeekBSZObservers.forEach(function (observer) {
        observer.disconnect();
      });
    }

    var observers = COUNTERS.map(watchCounter).filter(Boolean);
    window.__gmeekBSZObservers = observers;

    if (!observers.length) return;

    loadBusuanzi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  document.addEventListener("astro:page-load", init);
})();
