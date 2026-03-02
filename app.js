const STORAGE_KEYS = {
  lastPlayed: "indonesiaRayaLastPlayedDate",
};

const videoEl = document.getElementById("anthemVideo");
const videoFileInput = document.getElementById("videoFile");
const playNowBtn = document.getElementById("playNowBtn");
const clearFileBtn = document.getElementById("clearFileBtn");
const statusText = document.getElementById("statusText");

let selectedVideoFile = null;
let selectedVideoObjectUrl = "";

function setStatus(message) {
  statusText.textContent = message;
}

function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setVideoSourceFromFile(file) {
  if (selectedVideoObjectUrl) {
    URL.revokeObjectURL(selectedVideoObjectUrl);
  }

  selectedVideoFile = file;
  selectedVideoObjectUrl = URL.createObjectURL(file);
  videoEl.src = selectedVideoObjectUrl;
}

function clearSelectedVideo() {
  if (selectedVideoObjectUrl) {
    URL.revokeObjectURL(selectedVideoObjectUrl);
  }

  selectedVideoFile = null;
  selectedVideoObjectUrl = "";
  videoEl.removeAttribute("src");
  videoEl.load();
  videoFileInput.value = "";
  setStatus("Pilihan file di-reset. Pilih file lagi untuk memutar.");
}

async function playVideo(reason = "Pemutaran dimulai") {
  if (!selectedVideoFile || !selectedVideoObjectUrl) {
    setStatus("Belum ada file video dipilih. Pilih file terlebih dahulu.");
    return;
  }

  try {
    await videoEl.play();
    setStatus(`${reason} pada ${new Date().toLocaleTimeString("id-ID")}.`);
  } catch (error) {
    setStatus(
      "Autoplay diblokir browser. Klik tombol 'Putar Sekarang' untuk memulai manual."
    );
  }
}

function shouldAutoPlayAtTenAM(now = new Date()) {
  const lastPlayed = localStorage.getItem(STORAGE_KEYS.lastPlayed);
  const today = getTodayKey(now);
  const isTenAM = now.getHours() === 10 && now.getMinutes() === 0;

  return isTenAM && lastPlayed !== today;
}

function markPlayedToday(now = new Date()) {
  localStorage.setItem(STORAGE_KEYS.lastPlayed, getTodayKey(now));
}

async function checkScheduleAndPlay() {
  const now = new Date();
  if (!shouldAutoPlayAtTenAM(now)) {
    return;
  }

  if (!selectedVideoFile || !selectedVideoObjectUrl) {
    setStatus("Pukul 10:00 terlewati, tapi belum ada file video dipilih.");
    return;
  }

  markPlayedToday(now);
  await playVideo("Indonesia Raya diputar otomatis");
}

videoFileInput.addEventListener("change", () => {
  const file = videoFileInput.files[0];
  if (!file) {
    return;
  }

  setVideoSourceFromFile(file);
  setStatus(`File "${file.name}" dipilih. Menunggu pukul 10:00.`);
});

playNowBtn.addEventListener("click", async () => {
  await playVideo("Pemutaran manual");
});

clearFileBtn.addEventListener("click", () => {
  clearSelectedVideo();
});

setStatus("Belum ada file video dipilih.");
checkScheduleAndPlay();
setInterval(checkScheduleAndPlay, 30 * 1000);

window.addEventListener("beforeunload", () => {
  if (selectedVideoObjectUrl) {
    URL.revokeObjectURL(selectedVideoObjectUrl);
  }
});
