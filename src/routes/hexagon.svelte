<script>
	import { fade } from 'svelte/transition';
	import { settings } from "$lib/stores/settings";
	export let hexagon;
	let confetti = '';
	const hexagonClick = () => {
		hexagon.click();
		confetti = $settings.animations && hexagon.locked && hexagon.found ? 'confetti' : '';
		if (confetti === 'confetti') {
			setTimeout(() => {
				confetti = '';
			}, 1000);
		}
	};
</script>

<article class={`${confetti} ${hexagon.challenge.state}`}{$settings.animations ? ' animated' : ''}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg class={hexagon.state} on:click={hexagonClick} xmlns="http://www.w3.org/2000/svg" width="76" height="80">
		<path stroke="none" fill="var(--color-primary)" d="M36.5 1.0207259421637a7 7 0 0 1 7 0l28.507041555162 16.458548115673a7 7 0 0 1 3.5 6.0621778264911l0 32.917096231345a7 7 0 0 1 -3.5 6.0621778264911l-28.507041555162 16.458548115673a7 7 0 0 1 -7 0l-28.507041555162 -16.458548115673a7 7 0 0 1 -3.5 -6.0621778264911l0 -32.917096231345a7 7 0 0 1 3.5 -6.0621778264911" />
		{#if hexagon.target}
			<text class="target" x="50%" y="22%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="400" fill="var(--color-dark-disabled)" dx="2px" dy="2px">{hexagon.target.operations}</text>
		{/if}
		{#if hexagon.operationValue === null}
			<text class="value" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="500" fill="var(--color-text-dark)" dx="2px" dy="2px">{hexagon.value}</text>
		{:else}
			<text out:fade class="value" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="500" fill="var(--color-text-dark)" dx="2px" dy="2px">{hexagon.value}</text>
		{/if}
		{#if hexagon.operationValue !== null}
			<text class="operationValue" x="50%" y="74%" dominant-baseline="middle" text-anchor="middle" font-family="Quicksand" font-weight="400" fill="var(--color-dark-disabled)" dx="2px" dy="2px">{hexagon.operationValue}</text>
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
		fill: var(--color-text-light-disabled);
		z-index: 1;
	}
	text.target {
		font-size: var(--font-size-3);
		font-weight: 400;
		fill: var(--color-text-light-disabled);
	}
	/* Disabled */
	path {
		fill: var(--color-primary-disabled);
		stroke: none;
		transition: 100ms linear;
	}
	text {
		fill: var(--color-primary-transparent);
		transition: 100ms linear;
	}
	.previous text {
		font-weight: 600;
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
		text-shadow: var(--text-shadow);
	}
	/* Selected */
	.selected path {
		fill: var(--color-secondary);
	}
	.selected text.value {
		fill: var(--color-text-light);
		text-shadow: var(--text-shadow);
	}
	/* Pressed */
	.animated .pressed {
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
		fill: var(--color-dark-disabled);
	}
	.locked text {
		fill: var(--color-secondary-transparent);
	}
	.finished .locked text {
		transition: 750ms linear;
		fill: transparent;
		text-shadow: none;
	}
	/* Found */
	.found path {
		fill: var(--color-dark);
	}
	.found text.value {
		fill: var(--color-text-light);
		text-shadow: var(--text-shadow);
	}
	/* Found Locked */
	.locked.found path {
		fill: var(--color-dark-disabled);
	}
	.locked.found text {
		fill: var(--color-text-dark-disabled);
		text-shadow: none;
	}
	.finished .locked.found path {
		transition: 1s linear;
		fill: var(--color-dark);
	}
	.finished .locked.found text {
		transition: 750ms linear;
		fill: var(--color-text-light);
	}
	/* Confetti */
	.confetti {
		font-family: 'Helvetica', 'Arial', sans-serif;
		display: inline-block;
		font-size: 1em;
		-webkit-appearance: none;
		appearance: none;
		color: #fff;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		position: relative;
		background: transparent;
		transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
		z-index: 10;
	}
	.confetti:before,
	.confetti:after {
		position: absolute;
		content: '';
		display: block;
		width: 140%;
		height: 100%;
		left: -20%;
		z-index: -1000;
		transition: all ease-in-out 0.5s;
		background-repeat: no-repeat;
	}
	.confetti:before {
		display: block;
		animation: topBubbles ease-in-out 1s forwards;
		top: -75%;
		background-image: radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, transparent 20%, var(--color-secondary) 20%, transparent 30%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, var(--color-secondary) 15%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%);
		background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
	}
	.confetti:after {
		display: block;
		animation: bottomBubbles ease-in-out 1s forwards;
		bottom: -75%;
		background-image: radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, var(--color-secondary) 15%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%),
			radial-gradient(circle, var(--color-secondary) 20%, transparent 20%);
		background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
	}
	@keyframes topBubbles {
		0% {
			background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
				70% 90%;
		}
		50% {
			background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
				90% 30%;
		}
		100% {
			background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
				90% 20%;
			background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
		}
	}
	@keyframes bottomBubbles {
		0% {
			background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
		}
		50% {
			background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
		}
		100% {
			background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
			background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
		}
	}
</style>
