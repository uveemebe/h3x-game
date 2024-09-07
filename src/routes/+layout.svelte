<script>
	import '../app.css';
	export let data;
</script>

<div class="container">
	<header>
		<div class="title">
			<span>H</span><span class="number">3</span><span>X</span>
		</div>
		<nav class="menu {data.route}">
			<a class="help button enabled" href="/menu/help"><i class="material-symbols-outlined">help</i></a>
			<a class="stats button enabled" href="/menu/stats"><i class="material-symbols-outlined">bar_chart</i></a>
			<a class="settings button enabled" href="/menu/settings"><i class="material-symbols-outlined">settings</i></a>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<button class="enabled" on:click={() => { localStorage.clear(); window.location.reload(); }}><i class="material-symbols-rounded">delete</i></button>
	</footer>
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		margin: 8px;
		width: calc(100vw - 16px);
	}
	/* HEADER */
	header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding-bottom: 8px;
		border-bottom: solid 1px var(--color-dark-disabled);
		color: var(--color-text-dark);
		transition: all 1s;
	}
	header div, header nav {
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
			font-size: 44px;
	}
	nav.menu {
		column-gap: 12px;
		justify-content: right;
	}
	.menu.help a:not(.help), .menu.stats a:not(.stats), .menu.settings a:not(.settings) {
		display: none;
	}
	.menu.help a.help, .menu.stats a.stats, .menu.settings a.settings {
		color: var(--color-text-dark-disabled);
		cursor: default;
		pointer-events: none;
	}
	/* MAIN */
	main {
		display: flex;
		flex-direction: column;
	}
	/* FOOTER */
	footer {
		margin-top: 16px;
		display: flex;
		justify-content: center;
	}
</style>
