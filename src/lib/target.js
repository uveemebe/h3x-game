import { STATES, Statable } from '$lib/statable.js';

export class Target extends Statable {
	constructor(challenge, data) {
		super(data.states ?? [STATES.ENABLED]);
		this.challenge = challenge;
		this.index = data.index;
		this.sortedIndex = data.sortedIndex ?? data.index;
		this.value = data.value;
		this.time = data.time ?? 0;
		this.operations = data.operations ?? 0;
		//this.startTimer();
	}

	startTimer() {
		if (this.enabled) {
			this.timer = setInterval(() => {
				this.time++;
			}, 1000);
		}
	}

	lock(found = false) {
			super.lock(found);
			this.sortedIndex = found ? this.index + this.challenge.targets.length : this.index;
	}

	isFound(value) {
		return this.enabled && !this.found && this.value === value;
	}

	check(selectedHexagon) {
		this.operations++;
		const found = this.isFound(selectedHexagon.value);
		if (found) {
			this.lock(true);
			this.challenge.targets.find(target => !target.enabled && !target.locked)?.enable();
			selectedHexagon.lock(this);
			const notFoundHexagons = this.challenge.hexagons.filter(hexagon => !hexagon.found);
			if (this.challenge.targets.found) {
				notFoundHexagons.lock();
			} else {
				notFoundHexagons.previousIndexes = [];
				notFoundHexagons.unlock();
				notFoundHexagons.enable();
			}
		}
	}

	toJSON() {
		return {
			index: this.index,
			sortedIndex: this.sortedIndex,
			value: this.value,
			time: this.time,
			initialTime: this.initialTime,
			states: Array.from(this.states),
			operations: this.operations
		};
	}
}

export class Targets extends Array {
	constructor(...targets) {
		super(...targets);
	}

	isFound(value) {
		return this.find((target) => target.isFound(value));
	}

	get found() {
		return this.every((target) => target.found);
	}
	get pending() {
		return this.filter((target) => !target.found);
	}
}
