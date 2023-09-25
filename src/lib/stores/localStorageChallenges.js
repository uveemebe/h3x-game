import { writable } from 'svelte/store';
import challengeData from "$lib/data/challenge.json";
import { Challenge } from '$lib/challenge.js';

export const localStorageChallenges = writable(JSON.parse(localStorage.challenges ?? '[]'));
localStorageChallenges.subscribe((localStorageChallenges) => {
	localStorage.challenges = JSON.stringify(localStorageChallenges);
});

export const getPreviousChallenge = (challenge, challenges) => {
  let localStorageChallenge;
  if (challenge.changed) {
    localStorageChallenge = challenges[challenges.length - 1] ?? challengeData;
  } else {
    challenges.pop();
    localStorageChallenges.update(() => challenges);
    localStorageChallenge = challenges[challenges.length - 1] ?? challengeData;
  }
  return new Challenge(localStorageChallenge ?? challengeData);
};
