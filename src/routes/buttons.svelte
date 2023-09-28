<script>
	import challengeData from "$lib/data/challenge.json";
	import { challenge } from "$lib/stores/challenge";
	import { localStorageChallenges, getPreviousChallenge } from "$lib/stores/localStorageChallenges";
  import { Challenge } from "$lib/challenge.js";
	import Operation from "./operation.svelte";

  export let operations;

  const resetClick = () => {
    challenge.update(() => getPreviousChallenge($challenge, $localStorageChallenges));
  }

  let startDatetime = null;
  let timeout = null;
  const startResetClick = () => {
    startDatetime = Date.now();
    timeout = setTimeout(() => {
      challenge.update(() => {
        localStorageChallenges.update(() => []);
        return new Challenge(challengeData);
      });
    }, 750);
  }
  const endResetClick = () => {
    clearTimeout(timeout);
  }
</script>

<div>
  {#each operations as operation}
    <Operation operation={operation}></Operation>
  {/each}
  <button disabled={$localStorageChallenges.length === 0 && !$challenge.selectedHexagon} on:click={resetClick} on:mousedown={startResetClick} on:touchstart={startResetClick} on:mouseup={endResetClick} on:touchend={endResetClick}><i class="material-icons">replay</i></button>
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
