<script>
	import { settings } from "$lib/stores/settings";
	import Switch from "./Switch.svelte";
</script>
<ul>
	<li>
		<label for="animations">Ver animaciones</label>
		<Switch bind:checked={$settings.animations} />
	</li>
</ul>
<ul class="credits">
	<li>
		<i class="material-symbols-outlined">edit</i>
		<span>Víctor Melo</span>
	</li>
	<li>
		<i class="material-symbols-outlined">bug_report</i>
		<span>Roberto Pisonero</span>
	</li>
	<li>
		<i class="material-symbols-outlined">email</i>
		<a href="mailto:info@h3xgame.com" target="_blank">info@h3xgame.com</a>
	</li>
	<li>
		<i class="material-symbols-outlined">alternate_email</i>
		<a href="https://x.com/h3xgame" target="_blank">@h3xgame</a>
	</li>
</ul>

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	li+li {
		margin-top: 8px;
	}
	label {
		font-size: var(--font-size-3);
	}
	ul.credits {
		margin-top: 16px;
		padding-top: 16px;
		border-top: solid 1px var(--color-dark-disabled);
		font-size: var(--font-size-3);
	}
	ul.credits li {
		justify-content: left;
		column-gap: 8px;
	}
	a, a:visited {
		color: var(--color-secondary);
		text-decoration: none;
	}
</style>
