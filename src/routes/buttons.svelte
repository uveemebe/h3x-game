<script>
	import challengeData from "$lib/data/challenge.json";
	import { challenge } from "$lib/stores/challenge";
	import Operation from "./operation.svelte";
  import { Challenge } from "$lib/challenge.js";
  export let operations;

  const resetClick = () => {
    const localStorageChallenges = JSON.parse(localStorage.challenges ?? "[]");
    challenge.update(() => {
      let localStorageChallenge;
      if ($challenge.changed) {
        localStorageChallenge = localStorageChallenges[localStorageChallenges.length - 1] ?? challengeData;
        localStorageChallenge.changed = false;
      }
      else {
        localStorageChallenges.pop();
        localStorageChallenge = localStorageChallenges[localStorageChallenges.length - 1] ?? challengeData;
      }
      localStorage.challenges = JSON.stringify(localStorageChallenges);
      return new Challenge(localStorageChallenge ?? challengeData);
    });
  }

  let startDatetime = null;
  let timeout = null;

  const startResetClick = () => {
    startDatetime = Date.now();
    timeout = setTimeout(() => {
      challenge.update(() => {
        localStorage.challenges = JSON.stringify([]);
        return new Challenge(challengeData);
      });
    }, 1000);
  }
  const endResetClick = () => {
    clearTimeout(timeout);
  }
</script>

<div>
  {#each operations as operation}
    <Operation operation={operation}></Operation>
  {/each}
  <button on:click={resetClick} on:mousedown={startResetClick} on:touchstart={startResetClick} on:mouseup={endResetClick} on:touchend={endResetClick}><i class="material-icons">replay</i></button>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    justify-content: center;
  }
  button {
    margin-left: 16px;
  }
  button i {
    font-weight: bold;
  }
</style>
