const STORAGE_KEYS = {
  videoDataUrl: "indonesiaRayaVideoDataUrl",
  videoName: "indonesiaRayaVideoName",
  lastPlayed: "indonesiaRayaLastPlayedDate",
};

const videoEl = document.getElementById("anthemVideo");
const videoFileInput = document.getElementById("videoFile");
const saveFileBtn = document.getElementById("saveFileBtn");
const playNowBtn = document.getElementById("playNowBtn");
const clearFileBtn = document.getElementById("clearFileBtn");
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

function getStoredVideoDataUrl() {
  return localStorage.getItem(STORAGE_KEYS.videoDataUrl);
}

function setVideoSource(dataUrl) {
  videoEl.src = dataUrl;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Gagal membaca file video."));
    reader.readAsDataURL(file);
  });
}

async function saveSelectedFileToLocalStorage() {
  const file = videoFileInput.files[0];
  if (!file) {
    setStatus("Pilih file video terlebih dahulu.");
    return;
  }

  try {
    const dataUrl = await fileToDataUrl(file);
    localStorage.setItem(STORAGE_KEYS.videoDataUrl, dataUrl);
    localStorage.setItem(STORAGE_KEYS.videoName, file.name);
    setVideoSource(dataUrl);
    setStatus(`File \"${file.name}\" berhasil disimpan ke localStorage.`);
  } catch (error) {
    setStatus(
      "Gagal menyimpan file. Ukuran video mungkin terlalu besar untuk localStorage browser."
    );
  }
}

function clearStoredVideo() {
  localStorage.removeItem(STORAGE_KEYS.videoDataUrl);
  localStorage.removeItem(STORAGE_KEYS.videoName);
  videoEl.removeAttribute("src");
  videoEl.load();
  videoFileInput.value = "";
  setStatus("Video tersimpan telah dihapus.");
}

async function playVideo(reason = "Pemutaran dimulai") {
  const source = getStoredVideoDataUrl();
  if (!source) {
    setStatus("Belum ada video lokal tersimpan. Pilih file lalu simpan dulu.");
    return;
  }

  if (videoEl.src !== source) {
    setVideoSource(source);
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

  const source = getStoredVideoDataUrl();
  if (!source) {
    setStatus("Pukul 10:00 terlewati, tapi belum ada video lokal tersimpan.");
    return;
  }

  markPlayedToday(now);
  await playVideo("Indonesia Raya diputar otomatis");
}

saveFileBtn.addEventListener("click", async () => {
  await saveSelectedFileToLocalStorage();
});

playNowBtn.addEventListener("click", async () => {
  await playVideo("Pemutaran manual");
});

clearFileBtn.addEventListener("click", () => {
  clearStoredVideo();
});

const initialVideo = getStoredVideoDataUrl();
if (initialVideo) {
  setVideoSource(initialVideo);
  const name = localStorage.getItem(STORAGE_KEYS.videoName) || "video tersimpan";
  setStatus(`Video lokal \"${name}\" siap. Menunggu pukul 10:00.`);
} else {
  setStatus("Belum ada video lokal tersimpan. Pilih file lalu simpan.");
}

checkScheduleAndPlay();
setInterval(checkScheduleAndPlay, 30 * 1000);
