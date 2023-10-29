<script>
	import { fade } from 'svelte/transition';
	export let target;
</script>

<div out:fade class={target.state}>
	<span class="value">{target.value}</span>
</div>

<style>
	div {
		position: relative;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		color: var(--color-text-dark-disabled);
		font-weight: 400;
	}
	.enabled {
		color: var(--color-text-dark);
		font-size: var(--font-size-7);
		font-weight: 600;
	}
</style>
