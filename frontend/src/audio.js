// audio.js
import { Howl } from "howler";

export const bgmList = [
    {
        title: "A Song For You - JOONIL JUNG",
        src: "/audio/A Song For You - JOONIL JUNG.mp3",
    },
    {
        title: "HIGHER - JU-NE",
        src: "/audio/HIGHER - JU-NE.mp3",
    },
    {
        title: "SHINING - 김한겸",
        src: "/audio/SHINING - 김한겸.mp3",
    },
    {
        title: "Tomorrow - RP",
        src: "/audio/Tomorrow - RP.mp3",
    },
    {
        title: "About loneliness - Aalia",
        src: "/audio/About loneliness - Aalia.mp3",
    },
    {
        title: "Loveless Night - KWON SOON IL",
        src: "/audio/Loveless Night - KWON SOON IL.mp3",
    },
    {
        title: "My Song - 5moon",
        src: "/audio/My Song - 5moon.mp3",
    },
    {
        title: "Wherever - EightO",
        src: "/audio/Wherever - EightO.mp3",
    },
    {
        title: "You & Me - wYte",
        src: "/audio/You & Me - wYte.mp3",
    },
    {
        title: "You’re Precious - Standing Egg",
        src: "/audio/You’re Precious - Standing Egg.mp3",
    },
];

let index = 0;

export let bgm = new Howl({
    src: [bgmList[index].src],
    volume: 0.7,
    loop: true,
});

export function playBgm() {
    if (!bgm.playing()) bgm.play();
}

export function pauseBgm() {
    bgm.pause();
}

export function toggleBgm() {
    bgm.playing() ? bgm.pause() : bgm.play();
}

export function nextBgm() {
    bgm.stop();
    index = (index + 1) % bgmList.length;

    bgm = new Howl({
        src: [bgmList[index].src],
        volume: 0.7,
        loop: true,
    });

    bgm.play();
}


export function prevBgm() {
    bgm.stop();
    index = (index - 1) % bgmList.length;

    bgm = new Howl({
        src: [bgmList[index].src],
        volume: 0.7,
        loop: true,
    });

    bgm.play();
}

export function getCurrentTrack() {
    return bgmList[index];
}

export function isPlaying() {
    return bgm.playing();
}
