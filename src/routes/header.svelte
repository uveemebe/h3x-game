<script>
</script>

<header>
  <div class="title">
    <span>H</span><span class="number">3</span><span>X</span>
  </div>
  <div class="menu">
    <button class="enabled"><i class="material-symbols-rounded">bar_chart</i></button>
  </div>
</header>

<!-- STYLES -->
<style>
  header {
    display: flex;
    height: 48px;
    justify-content: space-between;
  }
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  div.title {
    padding-left: 8px;
    justify-content: left;
  }
  div.title span {
    font-size: var(--font-size-7);
  }
  span.number {
    color: var(--color-secondary);
  }
  div.menu {
    column-gap: 8px;
    justify-content: right;
  }

</style>
