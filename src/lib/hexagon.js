import { STATES, Statable } from "$lib/statable.js";
import { challenge as challengeStore } from '$lib/stores/challenge.js';

export class Hexagon extends Statable {

    constructor(challenge, data) {
        super(data.states ?? [STATES.ENABLED]);
        this.challenge = challenge;
        this.index = data.index;
        this.row = data.row;
        this.value = data.value;
        this.initialValue = data.initialValue ?? data.value;
        this.operationValue = data.operationValue ?? null;
        this.adjacentIndexes = data.adjacentIndexes;
        this.previousIndexes = data.previousIndexes ?? [];
        this.target = data.target ?? null;
    }

    get adjacents() {
        return this.challenge.hexagons.filter((hexagon) => !hexagon.locked && this.adjacentIndexes.includes(hexagon.index));
    }
    get nonAdjacents() {
        return this.challenge.hexagons.filter((hexagon) => !hexagon.locked && ![this.index, ...this.adjacentIndexes].includes(hexagon.index));
    }
    get others() {
        return this.challenge.hexagons.filter((hexagon) => !hexagon.locked && hexagon.index !== this.index);
    }
    get state() {
        return `${super.state} ${this.previousIndexes.length ? 'previous' : ''}`;
    }

    click() {
        this.selected ? this.deselect() : this.select();
		challengeStore.update(() => this.challenge);
    }

    press() {
        this.states.add(STATES.PRESSED);
        setTimeout(() => {
            this.states.delete(STATES.PRESSED);
            challengeStore.set(this.challenge);
        }, 1000);
    }

    deselect() {
        this.selected = false;
        this.challenge.selectedOperation?.deselect();
        this.others.enable();
    }
    select() {
        const previousSelectedHexagon = this.selected ? null : this.challenge.selectedHexagon;
        const selectedOperation = this.challenge.selectedOperation;
        if (!selectedOperation) {
            this.selected = true;
            previousSelectedHexagon?.deselect();
        } else {
            this.value = this.operationValue;
            this.operationValue = null;
            this.previousIndexes = [...this.previousIndexes, ...previousSelectedHexagon.previousIndexes, previousSelectedHexagon.index];
            this.press();
            selectedOperation.selected = false;
            previousSelectedHexagon.deselect();
            previousSelectedHexagon.lock(false, previousSelectedHexagon.initialValue);
            this.challenge.targets.check(this);
            this.challenge.save();
        }
    }

    disable() {
        this.enabled = false;
        this.operationValue = null;
    }
    enable(operationValue = null, found = null) {
        this.operationValue = operationValue;
        this.enabled = operationValue === null || (this.operationValue > 0 && this.operationValue < 10000 && Number.isInteger(this.operationValue));
        this.found = found;
    }

    unlock() {
        this.locked = false;
    }
    lock(targetFound = null, value = null) {
        this.value = value ?? this.value;
        this.target = targetFound;
        super.lock(targetFound);
    }

    toJSON() {
        return {
            index: this.index,
            row: this.row,
            states: Array.from(this.states)?.filter(state => state !== STATES.PRESSED),
            value: this.value,
            initialValue: this.initialValue,
            operationValue: this.operationValue,
            adjacentIndexes: this.adjacentIndexes,
            previousIndexes: this.previousIndexes,
            target: this.target
        };
    }

    toString() {
        return `${this.index} (${this.value}): ${this.state}`;
    }

}

export class Hexagons extends Array {

    constructor(...hexagons) {
        super(...hexagons);
    }

    enable() {
        this.forEach(hexagon => hexagon.enable());
    }
    disable() {
        this.forEach(hexagon => hexagon.disable());
    }

    lock() {
        this.forEach(hexagon => hexagon.lock());
    }
    unlock() {
        this.forEach(hexagon => hexagon.unlock());
    }

}