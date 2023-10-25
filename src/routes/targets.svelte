<script>
	import { fade } from 'svelte/transition';
	import { challenge } from '$lib/stores/challenge.js';
</script>

<article>
	{#each $challenge.targets.filter(target => !target.found) as target}
		<div out:fade class={target.state} style="--order: {target.sortedIndex}">
			<span class="value">{target.value}</span>
			{#if target.enabled}
			<div>
				<span class="operations">{target.operations}</span>
				<!--<span class="time">{target.time}"</span>-->
			</div>
			{/if}
		</div>
	{/each}
</article>

<style>
	article {
		display: flex;
		flex-direction: row;
		column-gap: 12px;
		justify-content: left;
		color: var(--color-disabled);
		width: 52px;
	}
	div {
		position: relative;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		order: var(--order);
	}
	.enabled {
		color: var(--color-dark);
		font-size: var(--font-size-7);
	}
	div>div {
		position: absolute;
		bottom: 100%;
		font-size: var(--font-size-4);
		color: var(--color-disabled);
	}
	div>div span {
		font-weight: 400;
		text-align: right;
	}
</style>
