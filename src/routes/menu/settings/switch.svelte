<script>
  export let id;
  export let checked;
</script>

<label id={id} class="switch">
  <input type="checkbox"	bind:checked={checked} />
  <span class="slider round" />
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		--toggle-width: 38px;
		--toggle-height: 22px;
		--slider-diameter: 16px;
		--slider-margin: 3px;
		width: var(--toggle-width);
		height: var(--toggle-height);
		-webkit-tap-highlight-color: transparent;
	}
	.switch input {
		display: none;
	}
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-secondary-transparent);
		-webkit-transition: 0.2s;
		transition: 0.2s;
	}
	.slider:before {
		position: absolute;
		content: '';
		height: var(--slider-diameter);
		width: var(--slider-diameter);
		left: var(--slider-margin);
		bottom: var(--slider-margin);
		background-color: white;
		-webkit-transition: 0.2s;
		transition: 0.2s;
	}
	input:checked + .slider {
		background-color: var(--color-secondary);
	}
	input:focus + .slider {
		box-shadow: 0 0 1px var(--color-secondary);
	}
	input:checked + .slider:before {
		-webkit-transform: translateX(var(--slider-diameter));
		-ms-transform: translateX(var(--slider-diameter));
		transform: translateX(var(--slider-diameter));
	}
	/* Rounded sliders */
	.slider.round {
		border-radius: var(--toggle-height);
	}
	.slider.round:before {
		border-radius: 50%;
	}
</style>