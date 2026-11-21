// Header: full-screen menu (Esc, close button, anchor click; focus kept inside; page does not scroll)
// and the active-section bar that slides under the current menu item.
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const menu = document.getElementById("menu");
const closeBtn = menu?.querySelector<HTMLButtonElement>("[data-menu-close]");

if (openBtn && menu && closeBtn) {
  const focusables = () =>
    Array.from(menu.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']")).filter((el) => el.offsetParent !== null);
  const open = () => {
    menu.hidden = false;
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };
  const close = (returnFocus = true) => {
    menu.hidden = true;
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (returnFocus) openBtn.focus();
  };
  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", () => close());
  menu.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => close(false)));
  document.addEventListener("keydown", (e) => {
    if (menu.hidden) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Tab") {
      const els = focusables();
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia("(min-width: 75rem)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) close(false); });
}

// Active section → menu item
const nav = document.querySelector<HTMLElement>(".nav");
const bar = nav?.querySelector<HTMLElement>(".nav__bar");
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
const owner: Record<string, string> = {
  catalog: "#catalog", supply: "#catalog", workshop: "#workshop", tools: "#tools", branches: "#branches", start: "#start",
};
const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));

if (nav && bar && links.length && sections.length) {
  let current = "";
  const place = (link: HTMLAnchorElement | undefined) => {
    links.forEach((l) => l.removeAttribute("aria-current"));
    if (!link) { nav.classList.remove("has-active"); return; }
    link.setAttribute("aria-current", "location");
    const n = nav.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    bar.style.setProperty("--bar-x", `${r.left - n.left}px`);
    bar.style.setProperty("--bar-s", `${r.width / 100}`);
    nav.classList.add("has-active");
  };
  const update = () => {
    const line = window.innerHeight * 0.35;
    let id = "";
    for (const s of sections) if (s.getBoundingClientRect().top <= line) id = s.id;
    const href = owner[id] || "";
    if (href === current) return;
    current = href;
    place(links.find((l) => l.getAttribute("href") === href));
  };
  let raf = 0;
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => { current = "-"; schedule(); });
  document.fonts?.ready.then(() => { current = "-"; update(); });
  update();
}
