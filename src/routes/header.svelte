<script>
	import { page } from '$app/stores';
</script>

<header>
  <div class="title">
    <span>H</span><span class="number">3</span><span>X</span>
  </div>
  <nav class="menu {$page.url.pathname.replace(/\//g, "")}">
    <a class="help button enabled" href="/help"><i class="material-symbols-outlined">help</i></a>
    <a class="stats button enabled" role="button"><i class="material-symbols-outlined">bar_chart</i></a>
    <a class="settings button enabled"><i class="material-symbols-outlined">settings</i></a>
  </nav>
</header>

<!-- STYLES -->
<style>
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: solid 1px var(--color-dark-disabled);
    color: var(--color-text-dark);
    transition: all 1s;
  }
  div, nav {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  div.title {
    justify-content: left;
    font-size: var(--font-size-8);
    font-weight: 600;
  }
  span.number {
    color: var(--color-secondary);
  }
  nav.menu {
    column-gap: 12px;
    justify-content: right;
  }
  nav.help a:not(.help) {
    display: none;
  }
  nav.help a.help {
    pointer-events: none;
    color: var(--color-text-dark-disabled);
  }

</style>
