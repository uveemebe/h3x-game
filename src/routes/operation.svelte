<script>
  import { challenge } from "$lib/stores/challenge";

  export let operation;
  const handleClick = () => {
    operation.click();
    challenge.update(() => operation.challenge);
  }
</script>

<article>
  <button class={operation.state} on:click={handleClick}>
    <span>{operation.operator}</span>
  </button>
</article>

<style>
  button {
    height: 48px;
    width: 48px;
    transition: background-color 200ms;
    color: var(--color-text-light);
  }
  button.enabled {
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
