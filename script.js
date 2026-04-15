"use strict";

let score = 0;
let highScore = 0;
let chances;
let currentLevel = null;

const colourOptions = ["Red", "Green", "Blue", "Purple", "White", "Yellow"];
const container = document.querySelector(".options");

// Screens
const landing = document.querySelector(".landing");
const game = document.querySelector(".game");

// Buttons
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");

// Back Button
const backBtn = document.querySelector(".back");

let secretColour;
let playing = false;

// 🎯 LEVEL CONFIGURATION
const levels = {
  easy: 5,
  medium: 4,
  hard: 3,
};

const openModal = document.querySelector(".combine");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const closeModalWindow = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

openModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModal.addEventListener("click", closeModalWindow);

overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalWindow();
  }
});

// 🎮 START GAME FUNCTION
function startGame(level) {
  currentLevel = level;
  chances = levels[level];
  playing = true;

  // switch screens
  landing.classList.add("hidden");
  game.classList.remove("hidden");

  resetGameUI();
}

// 🔄 RESET GAME STATE
function resetGameUI() {
  secretColour = Math.floor(Math.random() * colourOptions.length);

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".chances").textContent = chances;
  document.querySelector(".colour").textContent = "?";
  document.querySelector(".colour").style.backgroundColor = "white";
  document.querySelector(".colour").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
}

// 🎯 CREATE BUTTONS
colourOptions.forEach((color) => {
  const button = document.createElement("button");

  button.style.backgroundColor = color;
  button.style.width = "10rem";
  button.style.height = "15rem";
  button.style.margin = "5px";
  button.style.borderRadius = "5px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.textContent = color;

  button.addEventListener("click", function () {
    if (!playing) return;

    if (color === colourOptions[secretColour]) {
      playing = false;

      document.querySelector(".message").textContent = "Correct!";
      document.querySelector(".colour").style.backgroundColor = color;
      document.querySelector(".colour").textContent = color;
      document.querySelector(".colour").style.width = "40rem";
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".colour").classList.add("win");

      setTimeout(() => {
        document.querySelector(".colour").classList.remove("win");
      }, 400);
      score += 10;
      document.querySelector(".score").textContent = score;

      // High score
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
    } else {
      chances--;
      document.querySelector(".chances").textContent = chances;
      document.querySelector(".message").textContent = "Wrong!";

      if (chances === 0) {
        playing = false;
        document.querySelector(".message").textContent = "💥 You lost the game";

        document.querySelector("body").classList.add("lose");

        setTimeout(() => {
          document.querySelector("body").classList.remove("lose");
        }, 400);
      }
    }
  });

  container.appendChild(button);
});

// 🔁 AGAIN BUTTON
document.querySelector(".again").addEventListener("click", function () {
  if (!currentLevel) return;

  chances = levels[currentLevel]; // ✅ key fix
  playing = true;

  resetGameUI();
});

// 🎯 LEVEL BUTTON EVENTS
easyBtn.addEventListener("click", function () {
  startGame("easy");
});

mediumBtn.addEventListener("click", function () {
  startGame("medium");
});

hardBtn.addEventListener("click", function () {
  startGame("hard");
});

backBtn.addEventListener("click", function () {
  playing = false; // stop the game
  currentLevel = null; // clear selected level

  // switch screens
  game.classList.add("hidden");
  landing.classList.remove("hidden");

  // optional reset (clean state)
  score = 0;
  document.querySelector(".score").textContent = score;

  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".colour").textContent = "?";
  document.querySelector(".chances").textContent = "";
});
