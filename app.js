const colorPicker = document.querySelector("#colorPicker");
const colorModeBtn = document.querySelector("#colorModeBtn");
const rainbowModeBtn = document.querySelector("#rainbowModeBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const sizeValue = document.querySelector("#sizeValue");
const sizeSlider = document.querySelector("#sizeSlider");
const grid = document.querySelector("#grid");
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activeBtn(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

let mouseDown = false;
document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

colorPicker.addEventListener("input", (e) => setCurrentColor(e.target.value));
colorModeBtn.addEventListener("click", () => setCurrentMode("color"));
rainbowModeBtn.addEventListener("click", () => setCurrentMode("rainbow"));
eraserBtn.addEventListener("click", () => setCurrentMode("eraser"));
clearBtn.addEventListener("click", () => reloadGrid());
sizeSlider.addEventListener("mousemove", (e) =>
  updateSizeValue(e.target.value)
);
sizeSlider.addEventListener("change", (e) => changeSize(e.target.value));

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const gridPixels = document.createElement("div");
    gridPixels.classList.add("gridPixels");
    gridPixels.addEventListener("mouseover", changeColor);
    gridPixels.addEventListener("mousedown", changeColor);

    grid.appendChild(gridPixels);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 255);
    const randomG = Math.floor(Math.random() * 255);
    const randomB = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function activeBtn(newMode) {
  if (currentMode === "rainbow") {
    rainbowModeBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorModeBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }
  if (newMode === "rainbow") {
    rainbowModeBtn.classList.add("active");
  } else if (newMode === "color") {
    colorModeBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}
window.onload = () => {
  activeBtn(DEFAULT_MODE);
  setupGrid(DEFAULT_SIZE);
};
