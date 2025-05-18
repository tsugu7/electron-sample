// DOM要素の取得
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// タイマー変数
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// タイマーの表示を更新する関数
function updateDisplay() {
  // 経過時間を計算（ミリ秒）
  const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
  
  // 分と秒に変換
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  
  // 表示形式に整形（2桁表示）
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  // 表示を更新
  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// タイマーを開始する関数
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10); // 10ミリ秒ごとに更新
  }
}

// タイマーを停止する関数
function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
  }
}

// タイマーをリセットする関数
function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
}

// イベントリスナーの設定
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 初期表示の更新
updateDisplay();
