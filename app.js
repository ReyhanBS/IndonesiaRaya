const STORAGE_KEYS = {
  videoUrl: "indonesiaRayaVideoUrl",
  lastPlayed: "indonesiaRayaLastPlayedDate",
};

const FALLBACK_VIDEO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/09/Indonesia_Raya._ogg/Indonesia_Raya._ogg.360p.webm";

const videoEl = document.getElementById("anthemVideo");
const videoUrlInput = document.getElementById("videoUrl");
const saveUrlBtn = document.getElementById("saveUrlBtn");
const playNowBtn = document.getElementById("playNowBtn");
const statusText = document.getElementById("statusText");

function setStatus(message) {
  statusText.textContent = message;
}

function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadVideoUrl() {
  const saved = localStorage.getItem(STORAGE_KEYS.videoUrl);
  return saved || FALLBACK_VIDEO_URL;
}

function setVideoSource(url) {
  videoEl.src = url;
  videoUrlInput.value = url;
}

async function playVideo(reason = "Pemutaran dimulai") {
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

  markPlayedToday(now);
  await playVideo("Indonesia Raya diputar otomatis");
}

saveUrlBtn.addEventListener("click", () => {
  const url = videoUrlInput.value.trim();
  if (!url) {
    setStatus("Masukkan URL video terlebih dahulu.");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.videoUrl, url);
  setVideoSource(url);
  setStatus("URL video berhasil disimpan.");
});

playNowBtn.addEventListener("click", async () => {
  await playVideo("Pemutaran manual");
});

setVideoSource(loadVideoUrl());
setStatus("Penjadwalan aktif. Menunggu pukul 10:00.");
checkScheduleAndPlay();
setInterval(checkScheduleAndPlay, 30 * 1000);
