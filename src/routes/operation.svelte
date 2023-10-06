<script>
  import { challenge } from "$lib/stores/challenge.js";

  export let operation;
  const handleClick = () => {
    operation.click();
    challenge.update(() => $challenge);
  }
</script>

<button class={operation.state} on:click={handleClick}>
  <span>{operation.operator}</span>
</button>

<style>
  span {
    font-size: var(--font-size-7);
  }
</style>
