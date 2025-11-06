import { keys } from "./keys.js";

const pianoKeysContainer = document.querySelector(".piano-keys");
const allAudioNames = [];

document.addEventListener("DOMContentLoaded", () => {
    keys.forEach((key) => createPianoKey(key));
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
