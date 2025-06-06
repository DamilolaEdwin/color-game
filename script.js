"use strict";

// const colorOptions = ['red', 'green', 'blue']; // Example list of colors
// const container = document.getElementById('buttonContainer'); // Container for buttons

// colorOptions.forEach(color => {
//     const button = document.createElement('button');
//     button.style.backgroundColor = color;
//     button.textContent = color; // Optionally, display the color name on the button
//     button.addEventListener('click', () => {
//         // Add functionality when a color button is clicked, e.g. change another element's color
//         console.log(`Button ${color} was clicked.`);
//     });
//     container.appendChild(button);
// });

let score = 5;
let highScore = 0;

const colourOptions = ["Red", "Green", "Blue", "Purple", "White", "Yellow"];

const container = document.querySelector(".options");

let secretColour = Math.floor(Math.random() * colourOptions.length);
console.log(secretColour, colourOptions[secretColour]);

colourOptions.forEach((color) => {
  const button = document.createElement("button");
  button.style.backgroundColor = color;
  button.style.width = "10rem";
  button.style.height = "15rem";
  button.style.margin = "5px";
  button.style.borderRadius = "5px";

  button.textContent = color;
  button.addEventListener("click", function () {
    if (color === colourOptions[secretColour]) {
      document.querySelector(".message").textContent = "Correct!";
      document.querySelector(".colour").style.backgroundColor = color;
      document.querySelector(".colour").textContent = color;
      document.querySelector(".colour").style.width = "30rem";

      document.querySelector(".score").textContent = score;

      // High score code block
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
    } else {
      document.querySelector(".message").textContent = "Wrong";
      score--;
      document.querySelector(".score").textContent = score;

      if (score < 1) {
        document.querySelector(".message").textContent = "You lost the game";
      }
    }

    console.log(`Button ${color} was clicked.`);
  });
  container.appendChild(button);
});

document.querySelector(".again").addEventListener("click", function () {
  secretColour = Math.floor(Math.random() * colourOptions.length);
  console.log(colourOptions[secretColour]);
  score = 5;

  document.querySelector(".colour").textContent = "?";
  document.querySelector(".colour").style.width = "15rem";
  document.querySelector(".colour").style.backgroundColor = "white";

  document.querySelector(".score").textContent = score;
});
