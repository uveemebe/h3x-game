<script>
	import { challenge } from "$lib/stores/challenge";
	import { localStorageChallenges, getPreviousChallenge } from "$lib/stores/localStorageChallenges";
  import { Challenge } from "$lib/challenge.js";

  const resetClick = () => {
    challenge.set(getPreviousChallenge($challenge, $localStorageChallenges));
  }

  let startDatetime = null;
  let timeout = null;
  const startResetClick = () => {
    startDatetime = Date.now();
    timeout = setTimeout(() => {
      localStorageChallenges.set([]);
      challenge.set(new Challenge());
    }, 750);
  }
  const endResetClick = () => {
    clearTimeout(timeout);
  }
</script>

<button class={$localStorageChallenges.length > 0 || $challenge.selectedHexagon ? "enabled" : ""} on:click={resetClick} on:mousedown={startResetClick} on:touchstart={startResetClick} on:mouseup={endResetClick} on:touchend={endResetClick}>
  <i class="material-symbols-rounded">undo</i>
</button>

<style>
</style>
