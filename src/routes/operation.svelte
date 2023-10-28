<script>
  export let operation;
</script>

<button class={operation.state} on:click={operation.click()}>
  <span>{operation.operator}</span>
</button>

<style>
  span {
    font-size: var(--font-size-7);
  }
</style>
