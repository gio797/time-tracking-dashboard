// get tabs and panels
const tabs = [...document.querySelectorAll("[role=tab]")];
const panels = [...document.querySelectorAll("[role=tabpanel]")];
const testDiv = document.querySelector(".test");
console.log(testDiv);

function handleTabClick(e) {
  // get panel to show
  const panelToControl = e.currentTarget.getAttribute("aria-controls");

  // loop through all panels and hide show correct panels
  panels.forEach((p) => {
    p.setAttribute(
      "aria-hidden",
      `${p.id === panelToControl ? "false" : "true"}`
    );
  });

  // update the aria label for correct btn
  tabs.forEach((t) => {
    t.setAttribute("aria-selected", `${t === e.target ? "true" : "false"}`);
  });
}

function handleKeyDownEvent(e) {
  const actEl = document.activeElement;
  if (!actEl.classList.contains("tab")) {
    return;
  }
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      if (actEl === tabs[0]) {
        return tabs[tabs.length - 1].focus();
      }
      actEl.previousElementSibling.focus();
      break;
    case "ArrowRight":
      e.preventDefault();
      if (actEl === tabs[tabs.length - 1]) {
        return tabs[0].focus();
      }
      actEl.nextElementSibling.focus();
      break;
    default:
      return;
  }
}

// add eventlistener to tabs to show panel
tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});

//keyboard events
window.addEventListener("keydown", handleKeyDownEvent);

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    let htmlData;
    data.map((item) => {
      htmlData += `
                  <div>
                    <h2>${item.title}</h2>
                  </div>
                `;
    });

    testDiv.innerHTML = htmlData;
  });
