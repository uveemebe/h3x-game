<footer>
  <button class="enabled" on:click={() => { localStorage.clear(); window.location.reload(); }}><i class="material-symbols-rounded">delete</i></button>
</footer>

<style>
  footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
</style>