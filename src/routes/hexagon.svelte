<script>
	import { fade } from 'svelte/transition';
	import { challenge } from '$lib/stores/challenge.js';

	export let hexagon;
	const handleClick = () => {
		hexagon.click();
		challenge.update(() => $challenge);
  };
</script>

<article>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg
		class={hexagon.state}
		on:click={handleClick}
		xmlns="http://www.w3.org/2000/svg"
		width="76"
		height="80"
	>
		<path
			stroke="none"
			fill="var(--color-principal)"
			d="M36.5 1.0207259421637a7 7 0 0 1 7 0l28.507041555162 16.458548115673a7 7 0 0 1 3.5 6.0621778264911l0 32.917096231345a7 7 0 0 1 -3.5 6.0621778264911l-28.507041555162 16.458548115673a7 7 0 0 1 -7 0l-28.507041555162 -16.458548115673a7 7 0 0 1 -3.5 -6.0621778264911l0 -32.917096231345a7 7 0 0 1 3.5 -6.0621778264911"
		/>
		{#if hexagon.operationValue === null}
			<text
				class="value"
				x="50%"
				y="50%"
				text-anchor="middle"
				font-family="Quicksand"
				font-weight="500"
				fill="#222"
				dx="2px"
				dy="7px">{hexagon.value}</text
			>
		{:else}
			<text
				out:fade
				class="value"
				x="50%"
				y="50%"
				text-anchor="middle"
				font-family="Quicksand"
				font-weight="500"
				fill="#222"
				dx="2px"
				dy="7px">{hexagon.value}</text
			>
		{/if}
		{#if hexagon.operationValue !== null}
			<text
				class="operationValue"
				x="50%"
				y="72.5%"
				text-anchor="middle"
				font-family="Quicksand"
				font-weight="400"
				fill="#222"
				dx="2px"
				dy="7px">{hexagon.operationValue}</text
			>
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
	svg.locked {
		cursor: default;
		pointer-events: none;
	}
	path {
		transition: fill 200ms;
		fill: var(--color-principal-light);
	}
	.enabled {
		cursor: pointer;
		pointer-events: all;
	}
	.enabled path {
		fill: var(--color-principal);
	}
	.selected path {
		fill: var(--color-secondary-light);
	}
	.enabled.selected path {
		fill: var(--color-secondary);
	}
	.enabled.pressed path {
		animation-name: pressed;
		animation-duration: 500ms;
	}
	@keyframes pressed {
		from {
			fill: var(--color-secondary);
		}
	}
	.found path {
		fill: var(--color-text);
	}
	.locked path {
		fill: var(--color-text-lighter);
	}

	text {
		pointer-events: none;
		fill: var(--color-text-lighter);
	}
	.enabled text {
		fill: var(--color-text);
	}
	.found text {
		fill: hsl(0, 0%, 100%);
	}
	.locked text {
		fill: var(--color-text-lighter);
	}
	.found.locked text {
		fill: var(--color-secondary-light);
	}
	text.operationValue {
		font-size: var(--font-size-smaller);
		fill: hsl(0, 0%, 20%, 0.15);
	}
	.enabled text.operationValue {
		fill: var(--color-text-light);
	}
	.found text.operationValue {
		fill: var(--background-color-dark);
	}
</style>
