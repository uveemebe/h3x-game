<script>
</script>

<header>
  <div class="title">
    <span>H</span><span class="number">3</span><span>X</span>
  </div>
  <div class="menu">
    <button class="enabled"><i class="material-symbols-outlined" style="font-size: var(--font-size-4);">question_mark</i></button>
    <button class="enabled"><i class="material-symbols-outlined">bar_chart</i></button>
    <button class="enabled"><i class="material-symbols-outlined">settings</i></button>
  </div>
</header>

<!-- STYLES -->
<style>
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: solid 1px var(--color-dark-disabled);
    color: var(--color-text-dark);
  }
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  div.title {
    justify-content: left;
    font-size: var(--font-size-8);
  }
  span.number {
    color: var(--color-secondary);
  }
  div.menu {
    column-gap: 8px;
    justify-content: right;
  }

</style>
