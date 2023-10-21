import { browser } from "$app/environment";
import { writable } from 'svelte/store';
import { Challenge } from '$lib/challenge.js';

export const localStorageChallenges = writable(JSON.parse((browser ? localStorage.challenges : null) ?? '[]'));
localStorageChallenges.subscribe((localStorageChallenges) => {
  if (browser) {
    localStorage.challenges = JSON.stringify(localStorageChallenges);
  }
});

export const getPreviousChallenge = (challenge, challenges) => {
  let localStorageChallenge;
  if (challenge.selectedHexagon) {
    localStorageChallenge = challenges[challenges.length - 1];
  } else {
    challenges.pop();
    localStorageChallenges.update(() => challenges);
    localStorageChallenge = challenges[challenges.length - 1];
  }
  return new Challenge(localStorageChallenge);
};