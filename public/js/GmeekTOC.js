(function () {
  const CONTENT_SELECTOR = "#content";
  const COMMENTS_SELECTOR = "#giscus-comments";
  const STYLE_ID = "gmeek-toc-style";
  const ROOT_ID = "gmeek-toc-root";
  const PANEL_ID = "gmeek-toc-panel";
  const BUTTON_ID = "gmeek-toc-button";
  const TITLE_TEXT = "\u6587\u7ae0\u76ee\u5f55";
  const ACTIVE_CLASS = "is-active";

  function slugify(text) {
    return text.trim().replace(/\s+/g, "-").toLowerCase();
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
#${ROOT_ID} {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  z-index: 40;
}

#${BUTTON_ID} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgb(228, 228, 231);
  border-radius: 9999px;
  background: rgba(250, 250, 250, 0.96);
  color: rgb(39, 39, 42);
  box-shadow: 0 14px 30px rgba(24, 24, 27, 0.14);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  backdrop-filter: blur(12px);
}

#${BUTTON_ID}:hover {
  transform: translateY(-1px);
}

#${BUTTON_ID}:focus-visible,
#${PANEL_ID} a:focus-visible,
#${PANEL_ID} button:focus-visible {
  outline: 2px solid rgb(37, 99, 235);
  outline-offset: 2px;
}

html.dark #${BUTTON_ID} {
  border-color: rgb(63, 63, 70);
  background: rgba(39, 39, 42, 0.94);
  color: rgb(244, 244, 245);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
}

#${PANEL_ID} {
  position: fixed;
  right: 1rem;
  bottom: 8.75rem;
  width: min(21rem, calc(100vw - 2rem));
  max-height: min(72vh, 34rem);
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(228, 228, 231);
  border-radius: 1rem;
  background: rgba(250, 250, 250, 0.98);
  box-shadow: 0 20px 40px rgba(24, 24, 27, 0.18);
  transform: translateY(0.75rem);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
  backdrop-filter: blur(14px);
}

#${PANEL_ID}[data-open="true"] {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

html.dark #${PANEL_ID} {
  border-color: rgb(63, 63, 70);
  background: rgba(24, 24, 27, 0.96);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

#${PANEL_ID} .toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.875rem 1rem 0.75rem;
  border-bottom: 1px solid rgb(228, 228, 231);
}

html.dark #${PANEL_ID} .toc-header {
  border-bottom-color: rgb(63, 63, 70);
}

#${PANEL_ID} .toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(24, 24, 27);
}

html.dark #${PANEL_ID} .toc-title {
  color: rgb(250, 250, 250);
}

#${PANEL_ID} .toc-close {
  border: 0;
  background: transparent;
  color: rgb(113, 113, 122);
  cursor: pointer;
  font: inherit;
  font-size: 0.875rem;
  padding: 0;
}

html.dark #${PANEL_ID} .toc-close {
  color: rgb(161, 161, 170);
}

#${PANEL_ID} .toc-list {
  overflow: auto;
  padding: 0.75rem;
}

#${PANEL_ID} .toc-link {
  display: block;
  border-radius: 0.75rem;
  color: rgb(82, 82, 91);
  line-height: 1.5;
  text-decoration: none;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

#${PANEL_ID} .toc-link:hover {
  background: rgba(228, 228, 231, 0.7);
  color: rgb(9, 9, 11);
}

#${PANEL_ID} .toc-link.${ACTIVE_CLASS} {
  background: rgba(219, 234, 254, 0.9);
  color: rgb(30, 64, 175);
  font-weight: 600;
}

html.dark #${PANEL_ID} .toc-link {
  color: rgb(212, 212, 216);
}

html.dark #${PANEL_ID} .toc-link:hover {
  background: rgba(63, 63, 70, 0.7);
  color: rgb(250, 250, 250);
}

html.dark #${PANEL_ID} .toc-link.${ACTIVE_CLASS} {
  background: rgba(30, 58, 138, 0.5);
  color: rgb(191, 219, 254);
}

#${PANEL_ID} .toc-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem 0.75rem 0.875rem;
  border-top: 1px solid rgb(228, 228, 231);
}

html.dark #${PANEL_ID} .toc-actions {
  border-top-color: rgb(63, 63, 70);
}

#${PANEL_ID} .toc-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  border: 1px solid rgb(212, 212, 216);
  border-radius: 0.875rem;
  background: rgba(244, 244, 245, 0.9);
  color: rgb(39, 39, 42);
  cursor: pointer;
  font: inherit;
  font-size: 0.875rem;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

#${PANEL_ID} .toc-action:hover {
  background: rgba(228, 228, 231, 0.9);
}

html.dark #${PANEL_ID} .toc-action {
  border-color: rgb(82, 82, 91);
  background: rgba(39, 39, 42, 0.9);
  color: rgb(228, 228, 231);
}

html.dark #${PANEL_ID} .toc-action:hover {
  background: rgba(63, 63, 70, 0.9);
}

@media (max-width: 640px) {
  #${ROOT_ID} {
    right: 0.75rem;
    bottom: 4.5rem;
  }

  #${BUTTON_ID} {
    width: 2.875rem;
    height: 2.875rem;
  }

  #${PANEL_ID} {
    right: 0.75rem;
    left: 0.75rem;
    bottom: 8rem;
    width: auto;
    max-height: min(60vh, 28rem);
  }
}
    `;

    document.head.appendChild(style);
  }

  function removeExistingRoot() {
    const root = document.getElementById(ROOT_ID);
    if (root) root.remove();
  }

  function createTOC() {
    const contentContainer = document.querySelector(CONTENT_SELECTOR);
    if (!contentContainer) return;

    const headings = Array.from(
      contentContainer.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    if (headings.length === 0) {
      removeExistingRoot();
      return;
    }

    injectStyles();
    removeExistingRoot();

    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.setAttribute("data-pagefind-ignore", "all");

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.type = "button";
    button.setAttribute("aria-label", TITLE_TEXT);
    button.setAttribute("aria-controls", PANEL_ID);
    button.setAttribute("aria-expanded", "false");
    button.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h10"/></svg>';

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.setAttribute("data-open", "false");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", TITLE_TEXT);

    const header = document.createElement("div");
    header.className = "toc-header";

    const title = document.createElement("div");
    title.className = "toc-title";
    title.textContent = TITLE_TEXT;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "toc-close";
    closeButton.textContent = "\u5173\u95ed";

    header.appendChild(title);
    header.appendChild(closeButton);

    const nav = document.createElement("nav");
    nav.className = "toc-list";
    nav.setAttribute("aria-label", TITLE_TEXT);

    const headingEntries = [];

    for (const heading of headings) {
      if (!heading.id) heading.id = slugify(heading.textContent || "");

      const level = Number(heading.tagName.charAt(1));
      const link = document.createElement("a");
      link.className = "toc-link";
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent || "";
      link.style.paddingLeft = `${0.75 + Math.max(level - 2, 0) * 0.75}rem`;
      link.dataset.tocTarget = heading.id;
      nav.appendChild(link);
      headingEntries.push({ heading, link, id: heading.id });
    }

    const actions = document.createElement("div");
    actions.className = "toc-actions";

    const topButton = document.createElement("button");
    topButton.type = "button";
    topButton.className = "toc-action";
    topButton.textContent = "\u56de\u5230\u9876\u90e8";

    const commentsButton = document.createElement("button");
    commentsButton.type = "button";
    commentsButton.className = "toc-action";
    commentsButton.textContent = "\u76f4\u8fbe\u8bc4\u8bba";

    actions.appendChild(topButton);
    actions.appendChild(commentsButton);

    panel.appendChild(header);
    panel.appendChild(nav);
    panel.appendChild(actions);
    root.appendChild(panel);
    root.appendChild(button);
    document.body.appendChild(root);

    const setOpen = (open) => {
      panel.setAttribute("data-open", String(open));
      button.setAttribute("aria-expanded", String(open));
    };

    const closePanel = () => setOpen(false);
    const togglePanel = () =>
      setOpen(panel.getAttribute("data-open") !== "true");

    const setActive = (activeId) => {
      for (const entry of headingEntries) {
        entry.link.classList.toggle(ACTIVE_CLASS, entry.id === activeId);
      }
    };

    const updateActive = () => {
      let activeId = headingEntries[0]?.id;

      for (const entry of headingEntries) {
        if (entry.heading.getBoundingClientRect().top <= 140) {
          activeId = entry.id;
        } else {
          break;
        }
      }

      if (activeId) setActive(activeId);
    };

    button.addEventListener("click", togglePanel);
    closeButton.addEventListener("click", closePanel);

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closePanel();
      }
    });

    topButton.addEventListener("click", () => {
      closePanel();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    commentsButton.addEventListener("click", () => {
      closePanel();
      const comments = document.querySelector(COMMENTS_SELECTOR);
      if (comments instanceof HTMLElement) {
        comments.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    const handleOutsideClick = (event) => {
      if (!(event.target instanceof Node)) return;
      if (!root.contains(event.target)) closePanel();
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") closePanel();
    };

    document.addEventListener("click", handleOutsideClick, { passive: true });
    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    updateActive();
  }

  const run = () => {
    window.requestAnimationFrame(createTOC);
  };

  run();
  document.addEventListener("astro:page-load", run);
})();
