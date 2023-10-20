<script>
	import { challenge } from '$lib/stores/challenge.js';
</script>

<article>
	{#each $challenge.targets.filter(target => !target.found) as target}
		<div class={target.state} style="--order: {target.sortedIndex}">
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
		color: var(--color-dark-1);
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
		color: var(--color-dark-8);
		font-size: var(--font-size-7);
	}
	.found {
		color: var(--color-secondary-2);
	}
	div>div {
		position: absolute;
		bottom: 100%;
		font-size: var(--font-size-4);
		color: var(--color-dark-4);
	}
	div>div span {
		font-weight: 400;
		text-align: right;
	}
</style>
