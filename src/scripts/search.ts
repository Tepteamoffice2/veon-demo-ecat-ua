// Hero search: rotating format examples in the empty field (stops on focus or input),
// and an honest note instead of results when someone tries to search.
const root = document.querySelector<HTMLElement>("[data-search]");
if (root) {
  const input = root.querySelector<HTMLInputElement>("[data-search-input]")!;
  const ghost = root.querySelector<HTMLElement>("[data-ghost]")!;
  const submit = root.querySelector<HTMLButtonElement>("[data-search-submit]")!;
  const note = root.querySelector<HTMLElement>("[data-search-note]")!;
  const formats = (ghost.dataset.formats || "").split("|").filter(Boolean);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let i = 0;
  let timer: number | undefined;
  const stop = () => { if (timer) window.clearInterval(timer); timer = undefined; };
  const swap = () => {
    if (document.hidden || input.value || document.activeElement === input) return;
    ghost.classList.add("is-out");
    window.setTimeout(() => {
      i = (i + 1) % formats.length;
      ghost.textContent = formats[i];
      ghost.classList.remove("is-out");
      ghost.classList.add("is-in");
      void ghost.offsetWidth; // restart from below
      ghost.classList.remove("is-in");
    }, 300);
  };
  if (!reduce && formats.length) {
    ghost.textContent = formats[0];
    timer = window.setInterval(swap, 2700);
  }
  input.addEventListener("input", () => { if (input.value) stop(); });

  const explain = () => {
    note.classList.remove("is-shown");
    void note.offsetWidth;
    note.classList.add("is-shown");
  };
  submit.addEventListener("click", explain);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); explain(); } });
}

// Header «Пошук»: back to the hero field from anywhere on the page, focus in the field.
document.querySelectorAll<HTMLAnchorElement>("[data-search-jump]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const field = document.getElementById("q") as HTMLInputElement | null;
    if (!field) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    field.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    field.focus({ preventScroll: true });
  });
});
