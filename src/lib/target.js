import { STATES, Statable } from '$lib/statable.js';
import { challenge as challengeStore } from '$lib/stores/challenge.js';

export class Target extends Statable {
	constructor(challenge, data) {
		super(data.states ?? [STATES.ENABLED]);
		this.challenge = challenge;
		this.index = data.index;
		this.sortedIndex = data.sortedIndex ?? data.index;
		this.value = data.value;
		this.time = data.time;
		this.initialTime = data.initialTime ?? data.time;
	}

	start() {
		if (this.initialTime && this.enabled) {
			this.countdown = setInterval(() => {
				if (this.time <= 0) {
					clearInterval(this.countdown);
					this.countdown = null;
				}
				this.time--;
				challengeStore.update(() => this.challenge);
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

	toJSON() {
		return {
			index: this.index,
			sortedIndex: this.sortedIndex,
			value: this.value,
			time: this.time,
			initialTime: this.initialTime,
			states: Array.from(this.states)
		};
	}
}

export class Targets extends Array {
	constructor(...targets) {
		super(...targets);
	}

	start() {
		this.filter((target) => target.enabled).forEach((target) => target.start());
	}

	isFound(value) {
		return this.find((target) => target.isFound(value));
	}

	get found() {
		return this.every((target) => target.found);
	}
}
