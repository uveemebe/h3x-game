<header>
  <div class="title">
    <span>H</span><span class="number">3</span><span>X</span>
  </div>
  <div class="menu">
    <button on:click={() => { localStorage.clear(); window.location.reload(); }}><i class="material-icons">delete</i></button>
    <button><i class="material-icons">menu</i></button>
  </div>
</header>

<!-- STYLES -->
<style>
  header {
    display: flex;
    height: 48px;
    justify-content: space-between;
    font-weight: bold;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.title {
    padding-left: 8px;
  }
  div.title span {
    font-size: var(--font-size-larger);
  }
  span.number {
    color: hsl(301, 50%, 60%);
  }
  div.menu {
    column-gap: 8px;
  }

</style>
