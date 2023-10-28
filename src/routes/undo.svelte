<script>
	import { challenge } from "$lib/stores/challenge";

  const resetClick = () => {
    $challenge.undo();
  }

  let startDatetime = null;
  let timeout = null;
  const startResetClick = () => {
    startDatetime = Date.now();
    timeout = setTimeout(() => {
      $challenge.undo(true);
    }, 750);
  }
  const endResetClick = () => {
    clearTimeout(timeout);
  }
</script>

<button class={$challenge.history.length > 0 || $challenge.selectedHexagon ? "enabled" : ""} on:click={resetClick} on:mousedown={startResetClick} on:touchstart={startResetClick} on:mouseup={endResetClick} on:touchend={endResetClick}>
  <i class="material-symbols-rounded">undo</i>
</button>

<style>
</style>
