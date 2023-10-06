<script>
	import { challenge } from '$lib/stores/challenge.js';
</script>

<article>
	{#each $challenge.targets as target}
		<div class={target.state} style="--order: {target.sortedIndex}">
			{#if !target.found}
				<span>{target.value}</span>
			{:else}
				<i class="material-symbols-rounded">star</i>
			{/if}
		</div>
	{/each}
</article>

<style>
	article {
		display: flex;
		flex-direction: row-reverse;
		column-gap: 12px;
		justify-content: right;
		color: var(--color-text-1);
		width: 2em;
	}
	div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		order: var(--order);
	}
	.enabled {
		color: var(--color-text);
		font-size: var(--font-size-7);
	}
	.found {
		color: var(--color-secondary-lighter);
	}
	span {
		position: relative;
	}
</style>
