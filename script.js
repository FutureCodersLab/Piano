import { keys } from "./keys.js";

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    keys.forEach(({ note, key, isBlack, mappedKey }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key;
    });
});
