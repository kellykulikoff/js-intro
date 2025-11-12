// Store questions in an array of objects for the quiz
let questions = [
  {
    question: "What is the role of getElementById() in this project?",
    options: [
      "Create a new element",
      "Add styles to the page",
      "Select elements from the HTML by their ID",
      "Handle user input",
    ],
    correct: "Select elements from the HTML by their ID",
  },
  {
    question: "Which element holds all the boxes that are created?",
    options: ["<body>", "createBoxButton", "boxContainer", "removeBoxesButton"],
    correct: "boxContainer",
  },
  {
    question: "What does appendChild() do in this project?",
    options: [
      "Deletes a box",
      "Adds a new box to the container",
      "Changes the text in the box",
      "Hides the button",
    ],
    correct: "Adds a new box to the container",
  },
  {
    question: "What kind of element does createBox() create?",
    options: ["A new button", "A new span", "A new section", "A new div"],
    correct: "A new div",
  },
  {
    question:
      "Why do we use .classList.add(''Box'') in the createBox() function?",
    options: [
      "To remove styling",
      "To give the box a class for styling",
      "To delete the box",
      "To rename the box",
    ],
    correct: "To give the box a class for styling",
  },
  {
    question:
      "What is the purpose of the createBoxButton.addEventListener(''click'', createBox) line?",
    options: [
      "Runs createBox() when the page loads",
      "Styles the box red",
      "Runs createBox() when the button is clicked",
      "Removes all boxes",
    ],
    correct: "Runs createBox() when the button is clicked",
  },
  {
    question: "What does the removeAllBoxes() function do?",
    options: [
      "Changes all box colors",
      "Hides the container",
      "Deletes all boxes inside the container",
      "Disables the buttons",
    ],
    correct: "Deletes all boxes inside the container",
  },
  {
    question:
      "Why do we set box.innerText = 2 inside the createBox() function?",
    options: [
      "To give each box a title",
      "To label the box",
      "To create the box class",
      "To select the second box",
    ],
    correct: "To label the box",
  },
  {
    question:
      "What happens if you click the 'Create Box' button multiple times?",
    options: [
      "Only one box is shown",
      "Boxes are created and stacked on top of each other",
      "A new red box is added each time",
      "The container disappears",
    ],
    correct: "A new red box is added each time",
  },
  {
    question:
      "What would happen if you didn't include boxContainer.appendChild(box)?",
    options: [
      "Nothing would appear on the page",
      "The boxes would be red",
      "The page would break",
      "The container would change color",
    ],
    correct: "Nothing would appear on the page",
  },
  {
    question: "What does addEventListener(''click'', someFunction) do?",
    options: [
      "Deletes the element",
      "Runs someFunction immediately",
      "Tells the browser to run someFunction when the element is clicked",
      "Adds a class to the element",
    ],
    correct:
      "Tells the browser to run someFunction when the element is clicked",
  },
  {
    question:
      "Which JavaScript method can bed used to create a new HTML element?",
    options: [
      "getElementById()",
      "createElement()",
      "innerHTML()",
      "appendChild()",
    ],
    correct: "createElement()",
  },
  {
    question: "What is the purpose of using IDs in HTML elements?",
    options: [
      "To change the color",
      "To group elements",
      "To uniquely identify and select them in JavaScript",
      "To repeat styling",
    ],
    correct: "To uniquely identify and select them in JavaScript",
  },
  {
    question: "What will element.innerHTML = '''' do?",
    options: [
      "Add a new paragraph",
      "Clear all content inside the element",
      "Hide the element",
      "Create a red box",
    ],
    correct: "Clear all content inside the element",
  },
  {
    question: "Which of the following is true about DOM?",
    options: [
      "It's only available in CSS",
      "It's used for creating background logic",
      "It lets you interact with and change HTML using JavaScript",
      "It's a type of database",
    ],
    correct: "It lets you interact with and change HTML using JavaScript",
  },
  // Add more questions as needed
];

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const nextButton = document.getElementById("next");
const overlay = document.getElementById("overlay");
const fireworksCanvas = document.getElementById("fireworks-canvas");
const fireworksContext = fireworksCanvas.getContext("2d");
const progressElement = document.getElementById("progress");

let width = window.innerWidth;
let height = window.innerHeight;
fireworksCanvas.width = width;
fireworksCanvas.height = height;

let particles = [];
let fireworksActive = false;
let mouseX = 0;
let mouseY = 0;

const particleSettings = {
  gravity: 0.05,
};

// Handle window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  fireworksCanvas.width = width;
  fireworksCanvas.height = height;
});

// Function to generate random number
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

// Particle constructor
function Particle() {
  this.width = randomNumberGenerator(0.5, 4.5);
  this.height = this.width;
  this.x = mouseX - this.width / 2;
  this.y = mouseY - this.height / 2;
  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;
}

Particle.prototype = {
  move: function () {
    if (this.x >= width || this.y >= height || this.x < 0 || this.y < 0) {
      return false;
    }
    return true;
  },
  draw: function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;
    fireworksContext.save();
    fireworksContext.beginPath();
    fireworksContext.translate(this.x, this.y);
    fireworksContext.arc(0, 0, this.width, 0, Math.PI * 2);
    fireworksContext.fillStyle = this.color;
    fireworksContext.closePath();
    fireworksContext.fill();
    fireworksContext.restore();
  },
};

// Create firework burst
function createFirework() {
  const numberOfParticles = randomNumberGenerator(10, 50);
  const color = `rgb(${randomNumberGenerator(0, 255)},${randomNumberGenerator(
    0,
    255
  )},${randomNumberGenerator(0, 255)})`;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = new Particle();
    particle.color = color;
    const vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

// Animation loop for fireworks
function animateFireworks() {
  let current = [];
  fireworksContext.fillStyle = "rgba(0, 0, 0, 0.1)";
  fireworksContext.fillRect(0, 0, width, height);

  if (fireworksActive && Math.random() < 0.2) {
    mouseX = width / 2 + (Math.random() - 0.5) * width * 0.5;
    mouseY = height / 2 + (Math.random() - 0.5) * height * 0.5;
    createFirework();
  }

  for (let i in particles) {
    particles[i].draw();
    if (particles[i].move()) {
      current.push(particles[i]);
    }
  }
  particles = current;
  requestAnimationFrame(animateFireworks);
}

// Function to load the current question
function loadQuestion() {
  answered = false;
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${
      questions.length
    }`;
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = ""; // Clear previous answers

    // Shuffle options
    let shuffledOptions = [...currentQuestion.options];
    shuffle(shuffledOptions);

    shuffledOptions.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("answer-btn");
      button.addEventListener("click", handleAnswerClick);
      answersElement.appendChild(button);
    });

    scoreElement.style.display = "none";
    restartButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    showScore();
  }
}

// Function to handle answer click
function handleAnswerClick(event) {
  if (answered) return; // Prevent multiple clicks, though disable will handle it

  const button = event.target;
  const selected = button.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selected === currentQuestion.correct) {
    button.style.backgroundColor = "green";
    if (!answered) {
      score++;
    }
  } else {
    button.style.backgroundColor = "red";
    // Find and highlight the correct answer
    const buttons = answersElement.querySelectorAll("button");
    for (let btn of buttons) {
      if (btn.textContent === currentQuestion.correct) {
        btn.style.backgroundColor = "green";
        break;
      }
    }
  }
  answered = true;

  // Set the button text based on whether it's the last question
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = "Show Results";
  } else {
    nextButton.textContent = "Next Question";
  }
  nextButton.style.display = "block";

  // Disable all answer buttons to prevent further clicks
  const answerButtons = answersElement.querySelectorAll(".answer-btn");
  answerButtons.forEach((btn) => {
    btn.disabled = true;
  });
}

// Function to show the final score
function showScore() {
  progressElement.textContent = "";
  questionElement.textContent =
    score === questions.length
      ? "Congratulations! You got a perfect score!"
      : "Quiz Completed!";
  answersElement.innerHTML = "";
  scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
  scoreElement.style.display = "block";
  nextButton.style.display = "none";
  restartButton.style.display = "block";

  if (score === questions.length) {
    overlay.style.display = "block";
    fireworksCanvas.style.display = "block";
    fireworksActive = true;
  }
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  fireworksActive = false;
  overlay.style.display = "none";
  fireworksCanvas.style.display = "none";
  shuffle(questions);
  loadQuestion();
}

// Add event listeners
restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  loadQuestion();
});

// Shuffle questions on initial load
shuffle(questions);

// Start the quiz on page load
loadQuestion();

// Start fireworks animation loop
animateFireworks();
