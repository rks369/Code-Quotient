let timerText = document.getElementById("timer");

let startBtn = document.getElementById("startBtn");
let startBtnText = document.getElementById("startBtnText");

let lapBtn = document.getElementById("lapBtn");
let lapBtnText = document.getElementById("lapBtnText");

let lapList = document.getElementById("lapList");

let timeInterval;

let lapCount = 1;

startBtn.addEventListener("click", function () {
  if (startBtnText.innerHTML == "Start") {
    startTimer();
  } else if (startBtnText.innerHTML == "Stop") {
    stopTimer();
  }
});

lapBtn.addEventListener("click", function () {
  if (lapBtnText.innerHTML == "Lap") {
    if (timerText.innerHTML != "00:00:00") {
      lapTime();
    }
  } else if (lapBtnText.innerHTML == "Reset") {
    resetTimer();
  }
});

function startTimer() {
  startBtnText.innerHTML = "Stop";

  resetTimer();

  startBtn.classList.add("redButton");
  let startTime = getStartTime();
  let currentTime;
  let time;
  let hr, min, ss;
  timeInterval = setInterval(function () {
    currentTime = Date.now();
    time = Math.floor((currentTime - startTime) / 1000);

    hr = Math.floor(time / 3600);
    hr = (hr > 9 ? "" : "0") + hr;
    time %= 3600;

    min = Math.floor(time / 60);
    min = (min > 9 ? "" : "0") + min;
    time %= 60;

    ss = (time > 9 ? "" : "0") + time;

    timerText.innerHTML = `${hr}:${min}:${ss}`;
  }, 1000);
}

function stopTimer() {
  startBtn.classList.remove("redButton");
  startBtnText.innerHTML = "Start";
  lapBtnText.innerHTML = "Reset";
  clearInterval(timeInterval);
}

function lapTime() {
  let li = document.createElement("li");

  let p1 = document.createElement("p");
  p1.innerHTML = `Lap ${lapCount++}`;

  li.appendChild(p1);

  let p2 = document.createElement("p");
  p2.innerHTML = timerText.innerHTML;
  if (lapCount == 2) {
    p2.style["color"] = "white";
    p2.style["font-weight"] = "bold";
  }
  li.appendChild(p2);

  lapList.append(li);
}

function resetTimer() {
  lapBtnText.innerHTML = "Lap";
  timerText.innerHTML = "00:00:00";
  lapList.innerHTML = "";
  lapCount =1;
}
