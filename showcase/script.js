const sourceCommands = `git clone https://github.com/sadSanta-07/SANTACLAW.git
cd SANTACLAW
bun install
export OPENROUTER_API_KEY="your_key"
bun run wakeup`;
const dockerCommands = `git clone https://github.com/sadSanta-07/SANTACLAW.git
cd SANTACLAW
docker build -t santaclaw:latest .
docker run -it \\
  -e OPENROUTER_API_KEY="your_key" \\
  santaclaw:latest`;

document.getElementById("year").textContent = String(new Date().getFullYear());

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const tabs = [...document.querySelectorAll(".install-tab")];
const panels = {
  source: document.getElementById("panel-source"),
  docker: document.getElementById("panel-docker"),
};
let activeTab = "source";
function selectTab(name) {
  if (!panels[name]) return;
  activeTab = name;
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === name;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  Object.entries(panels).forEach(([key, panel]) => {
    panel.hidden = key !== name;
    panel.classList.toggle("active", key === name);
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next.dataset.tab);
    next.focus();
  });
});
selectTab(activeTab);

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy === "docker" ? dockerCommands : sourceCommands;
    const feedback = button.closest(".install-panel")?.querySelector(".copy-feedback");
    try {
      await navigator.clipboard.writeText(value);
      button.innerHTML = 'Copied <span>✓</span>';
      if (feedback) feedback.textContent = "Copied to clipboard";
    } catch {
      if (feedback) feedback.textContent = "Copy unavailable — select the commands above.";
    }
    window.setTimeout(() => {
      button.innerHTML = 'Copy <span>↗</span>';
      if (feedback) feedback.textContent = "";
    }, 2200);
  });
});

const demoFeedback = document.querySelector(".demo-feedback");
document.querySelectorAll("[data-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!demoFeedback) return;
    demoFeedback.textContent = button.dataset.demo === "approve"
      ? "Demo state: approved. No files are modified by this website."
      : "Demo state: changes rejected. No files are modified by this website.";
    document.querySelectorAll("[data-demo]").forEach((item) => item.style.opacity = item === button ? "1" : ".62");
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".workflow-card, .capability-list article, .principle-stats > div");
if ("IntersectionObserver" in window && !reducedMotion) {
  revealTargets.forEach((target) => target.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}