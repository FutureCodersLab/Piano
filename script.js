import { keys } from "./keys.js";

const pianoKeysContainer = document.querySelector(".piano-keys");
const volumeInput = document.querySelector(".volume-slider input");
const checkboxInput = document.querySelector(".label-checkbox input");

const allAudioNames = [];
const audioFiles = {};

document.addEventListener("DOMContentLoaded", () => {
    preloadAudio();

    keys.forEach((key) => {
        createPianoKey(key);
    });

    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach((keyElement) => {
        keyElement.addEventListener("click", () =>
            playAudio(keyElement.dataset.audioName)
        );
    });

    document.addEventListener("keydown", handleKeyPress);

    checkboxInput.addEventListener("click", toggleKeyLabels);
});

const createPianoKey = (key) => {
    const { note, keyboard, isBlack, specialKey } = key;
    const li = document.createElement("li");
    li.className = `key ${isBlack ? "black" : "white"}`;
    const audioName = specialKey || keyboard;
    li.dataset.audioName = audioName;
    li.innerHTML = `
        <div>${note}</div>
        <span>${keyboard}</span>
    `;
    pianoKeysContainer.appendChild(li);
    allAudioNames.push(audioName);
};

const preloadAudio = () => {
    allAudioNames.forEach((audioName) => {
        audioFiles[audioName] = new Audio(`./audios/${audioName}.mp3`);
    });
};

const handleKeyPress = (e) => {
    const pressedKey = keys.find(({ keyboard }) => keyboard === e.key);
    const audioName = pressedKey.specialKey || e.key;
    if (allAudioNames.includes(audioName)) {
        playAudio(audioName);
    }
};

const playAudio = (audioName) => {
    const audio = audioFiles[audioName];
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = volumeInput.value;
    audio.play();

    const activeKey = document.querySelector(
        `[data-audio-name="${audioName}"]`
    );
    activeKey.classList.add("active");

    setTimeout(() => {
        activeKey.classList.remove("active");
    }, 150);
};

const toggleKeyLabels = () => {
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach((keyElement) => {
        keyElement.classList.toggle("hide");
    });
};
