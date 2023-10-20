import { writable } from 'svelte/store';
import { Challenge } from "$lib/challenge.js";
import { localStorageChallenges } from "$lib/stores/localStorageChallenges.js";

const getChallengeData = () => {
    return JSON.parse(localStorage.challenge ?? null) ?? undefined;
}

export const challenge = writable(new Challenge(getChallengeData()));
challenge.subscribe((challenge) => {
    if (challenge.save) {
        challenge.save = false;
        const challenges = JSON.parse(localStorage.challenges ?? "[]");
        localStorageChallenges.set(JSON.parse(JSON.stringify([...challenges, challenge])));
    }
    localStorage.challenge = JSON.stringify(challenge);
});