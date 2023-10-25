import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { Challenge } from "$lib/challenge.js";

const sameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

const getChallengeData = () => {
    const data = JSON.parse(browser ? localStorage.challenge ?? null : null);
    return sameDay(new Date(data?.date), new Date()) ? data : undefined;
}

export const challenge = writable(new Challenge(getChallengeData()));
challenge.subscribe((challenge) => {
    if (browser) {
        localStorage.challenge = JSON.stringify(challenge);
    }
});