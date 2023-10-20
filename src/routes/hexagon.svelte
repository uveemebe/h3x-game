<script>
	import { fade } from 'svelte/transition';
	export let hexagon;
</script>

<article class={hexagon.challenge.state}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg class={hexagon.state} on:click={hexagon.click()} xmlns="http://www.w3.org/2000/svg" width="76" height="80" >
		<path stroke="none" fill="var(--color-primary-5)" d="M36.5 1.0207259421637a7 7 0 0 1 7 0l28.507041555162 16.458548115673a7 7 0 0 1 3.5 6.0621778264911l0 32.917096231345a7 7 0 0 1 -3.5 6.0621778264911l-28.507041555162 16.458548115673a7 7 0 0 1 -7 0l-28.507041555162 -16.458548115673a7 7 0 0 1 -3.5 -6.0621778264911l0 -32.917096231345a7 7 0 0 1 3.5 -6.0621778264911" />
		{#if hexagon.target}
			<text class="target" x="50%" y="22%" dominant-baseline="middle" text-anchor="middle" font-family="Roboto Mono" fill="var(--color-dark-1)" dx="2px" dy="2px">{hexagon.target.operations}</text>
		{/if}
		{#if hexagon.operationValue === null}
			<text class="value" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="600" fill="var(--color-dark-8)" dx="2px" dy="2px">{hexagon.value}</text>
		{:else}
			<text out:fade class="value" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="600" fill="var(--color-dark-1)" dx="2px" dy="2px">{hexagon.value}</text>
		{/if}
		{#if hexagon.operationValue !== null}
			<text class="operationValue" x="50%" y="74%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" fill="var(--color-dark-1)" dx="2px" dy="2px">{hexagon.operationValue}</text>
		{/if}
	</svg>
</article>

<style>
	svg {
		margin-left: -4px;
		cursor: default;
		pointer-events: none;
		user-select: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}
	text.value {
		z-index: 2;
	}
	text.operationValue {
		font-size: var(--font-size-3);
		fill: var(--color-text-light-transparent);
		z-index: 1;
	}
	text.target {
		font-size: var(--font-size-3);
		font-weight: 400;
		fill: var(--color-text-light-transparent);
	}
	/* Disabled */
	path {
		fill: #dcfce7;
		transition: 100ms linear;
	}
	text {
		fill: var(--color-primary-transparent);
		font-weight: 500;
		transition: 100ms linear;
		--shadow: 0px 0px 8px var(--color-text-shadow), 0px 0px 16px var(--color-text-shadow);
	}
	/* Enabled */
	.enabled {
		cursor: pointer;
		pointer-events: all;
	}
	.enabled path {
		fill: var(--color-primary);
	}
	.enabled text.value {
		fill: var(--color-text-light);
		text-shadow: var(--shadow);
	}
	/* Selected */
	.selected path {
		fill: var(--color-secondary);
	}
	.selected text.value {
		fill: var(--color-text-light);
		text-shadow: var(--shadow);
	}
	/* Pressed */
	.pressed {
		animation: pressed-rotate 500ms linear;
	}
	@keyframes pressed-rotate {
		from {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}
	.pressed path {
		animation: pressed-path 500ms linear;
	}
	@keyframes pressed-path {
		from {
			fill: var(--color-secondary);
		}
	}
	/* Locked */
	.locked {
		cursor: default;
		pointer-events: none;
	}
	.locked path {
		fill: var(--color-disabled);
	}
	.locked text {
		fill: var(--color-secondary-transparent);
	}
	/* Found */
	.found path {
		fill: var(--color-dark);
	}
	.found text.value {
		fill: var(--color-text-light);
		text-shadow: var(--shadow);
	}
	/* Found Locked */
	.locked.found path {
		fill: var(--color-disabled);
	}
	.locked.found text {
		fill: var(--color-dark-transparent);
		text-shadow: none;
	}

</style>
