<script>
	import { challenge } from '$lib/stores/challenge.js';
</script>

<div>
	{#each $challenge.targets as target}
		<span class={target.state}>{target.value}</span>
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 16px;
	}
	span {
		font-size: var(--font-size-larger);
		font-weight: 500;
	}
	.found {
		color: var(--color-secondary-light);
	}
</style>
