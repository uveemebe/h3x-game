import { Statable } from "$lib/statable.js";

export class Target extends Statable {

    constructor(challenge, data) {
        super(data.states ?? []);
        this.challenge = challenge;
        this.value = data.value;
    }

    isFound(value) {
        return this.value === value;
    }

    toJSON() {
        return {
            value: this.value,
            states: Array.from(this.states)
        };
    }

}