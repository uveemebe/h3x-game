<script>
  import { challenge } from "$lib/stores/challenge.js";

  export let operation;
  const handleClick = () => {
    operation.click();
    challenge.update(() => $challenge);
  }
</script>

<article>
  <button class={operation.state} on:click={handleClick}>
    <span>{operation.operator}</span>
  </button>
</article>

<style>
  button {
    pointer-events: none;
    transition: background-color 200ms;
    color: var(--color-text-light);
  }
  button.enabled {
    pointer-events: all;
    color: var(--color-text);
  }
  button.selected {
    background-color: var(--color-secondary);
  }
  button span {
    font-weight: bold;
  }
  span {
    font-size: var(--font-size-larger);
    font-weight: bold;
  }
</style>
