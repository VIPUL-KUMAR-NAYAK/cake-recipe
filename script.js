// Store current step & timers
let currentStep = { chocolate: 0, dark: 0, lava: 0, fudge: 0 };
let timers = {}; // to hold setInterval for each cake

// Estimated step times for each cake (in seconds)
const cakeSteps = {
  chocolate: [
    { text: "Preheat oven to 180°C.", time: 300 },   // 5 min
    { text: "Mix all dry ingredients.", time: 180 }, // 3 min
    { text: "Add wet ingredients and stir.", time: 240 }, // 4 min
    { text: "Pour into baking tin.", time: 120 },    // 2 min
    { text: "Bake and serve!", time: 1290 }          // 21.5 min
  ],
  dark: [
    { text: "Preheat oven to 180°C.", time: 300 },   // 5 min
    { text: "Mix all dry ingredients.", time: 240 }, // 4 min
    { text: "Add wet ingredients and stir.", time: 300 }, // 5 min
    { text: "Pour into baking tin.", time: 120 },    // 2 min
    { text: "Bake and serve!", time: 1380 }          // 23 min
  ],
  lava: [
    { text: "Preheat oven to 180°C.", time: 180 },   // 3 min
    { text: "Mix all dry ingredients.", time: 120 }, // 2 min
    { text: "Add wet ingredients and stir.", time: 180 }, // 3 min
    { text: "Pour into baking tin.", time: 60 },     // 1 min
    { text: "Bake and serve!", time: 1260 }          // 21 min
  ],
  fudge: [
    { text: "Preheat oven to 180°C.", time: 300 },   // 5 min
    { text: "Mix all dry ingredients.", time: 240 }, // 4 min
    { text: "Add wet ingredients and stir.", time: 300 }, // 5 min
    { text: "Pour into baking tin.", time: 120 },    // 2 min
    { text: "Bake and serve!", time: 1620 }          // 27 min
  ]
};

// Toggle ingredients when clicking image
function toggleIngredients(cake) {
  document.getElementById(`ingredients-${cake}`).classList.toggle("hidden");
}

// Start Cooking
function startCooking(cake) {
  document.getElementById(`ingredients-${cake}`).classList.remove("hidden");

  let stepsList = document.getElementById(`steps-${cake}`);
  stepsList.innerHTML = "";

  cakeSteps[cake].forEach((step, i) => {
    let li = document.createElement("li");
    li.textContent = step.text + ` (⏱ ${Math.floor(step.time/60)}m ${step.time%60}s)`;
    if (i === 0) li.classList.add("active");
    stepsList.appendChild(li);
  });

  document.getElementById(`next-${cake}`).disabled = false;
  document.getElementById(`prev-${cake}`).disabled = true;
  currentStep[cake] = 0;
  updateProgress(cake);

  // Start timer for first step
  startStepTimer(cake, currentStep[cake]);
}

// Next Step
function nextStep(cake) {
  moveStep(cake, 1);
}

// Previous Step
function prevStep(cake) {
  moveStep(cake, -1);
}

// Move step logic
function moveStep(cake, direction) {
  let stepsList = document.querySelectorAll(`#steps-${cake} li`);
  stepsList[currentStep[cake]].classList.remove("active");

  currentStep[cake] += direction;
  stepsList[currentStep[cake]].classList.add("active");

  document.getElementById(`next-${cake}`).disabled = currentStep[cake] === stepsList.length - 1;
  document.getElementById(`prev-${cake}`).disabled = currentStep[cake] === 0;

  updateProgress(cake);

  // Start timer for new step
  startStepTimer(cake, currentStep[cake]);
}

// Progress bar update
function updateProgress(cake) {
  let stepsList = document.querySelectorAll(`#steps-${cake} li`);
  let progress = ((currentStep[cake] + 1) / stepsList.length) * 100;
  document.getElementById(`progress-${cake}`).style.width = progress + "%";
}

// Timer for each step
function startStepTimer(cake, stepIndex) {
  clearInterval(timers[cake]); // reset timer
  let timerDisplay = document.getElementById(`timer-${cake}`);
  let time = cakeSteps[cake][stepIndex].time;

  timers[cake] = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (time <= 0) {
      clearInterval(timers[cake]);
      timerDisplay.textContent = "Step done!";
      if (currentStep[cake] < cakeSteps[cake].length - 1) {
        nextStep(cake);
      }
    }
    time--;
    
  }, 1000);
}
