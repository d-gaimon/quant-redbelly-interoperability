// Runs before first paint so a saved theme never flashes. Storage can be unavailable.
try {
  var saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
} catch (e) {}
document.documentElement.classList.add("js");
