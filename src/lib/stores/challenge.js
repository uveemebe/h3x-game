import { writable } from 'svelte/store';
import { Challenge } from "$lib/challenge.js";
import challengeData from "$lib/data/challenge.json";
import { localStorageChallenges } from "$lib/stores/localStorageChallenges.js";

const localStorageChallenge = JSON.parse(localStorage.challenge ?? null);
export const challenge = writable(new Challenge(localStorageChallenge ?? challengeData));
challenge.subscribe((challenge) => {
    if (challenge.save) {
        challenge.save = false;
        challenge.changed = false;
        const challenges = JSON.parse(localStorage.challenges ?? "[]");
        localStorageChallenges.update(() => JSON.parse(JSON.stringify([...challenges, challenge])));
    }
    localStorage.challenge = JSON.stringify(challenge);
});