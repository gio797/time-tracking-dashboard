const tabs = [...document.querySelectorAll("[role=tab]")];
const panels = [...document.querySelectorAll("[role=tabpanel]")];

function handleTabClick(e) {
  const panelToControl = e.currentTarget.getAttribute("aria-controls");
  panels.forEach((p) => {
    p.setAttribute(
      "aria-hidden",
      `${p.id === panelToControl ? "false" : "true"}`
    );
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});
