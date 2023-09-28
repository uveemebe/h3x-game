import { STATES, Statable } from "$lib/statable.js";

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
    }

    get adjacents() {
        return this.adjacentIndexes.map((index) => this.challenge.hexagons[index]).filter(hexagon => !hexagon.locked);
    }
    get nonAdjacents() {
        return this.challenge.hexagons.filter((hexagon) => !hexagon.locked && ![this.index, ...this.adjacentIndexes].includes(hexagon.index));
    }
    get others() {
        return this.challenge.hexagons.filter((hexagon) => !hexagon.locked && hexagon.index !== this.index);
    }

    click() {
        this.selected ? this.deselect() : this.select();
    }

    deselect() {
        this.selected = false;
        this.challenge.selectedOperation?.deselect();
        this.others.forEach((hexagon) => hexagon.enable());
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
            this.press();
            const found = this.found;
            selectedOperation.selected = false;
            previousSelectedHexagon.deselect();
            previousSelectedHexagon.lock(previousSelectedHexagon.initialValue);
            this.challenge.save = true;
            if (found) {
                this.found = true;
                this.challenge.targetFound(this);
            }
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
    lock(value) {
        this.value = value ?? this.value;
        this.locked = true;
    }

    toJSON() {
        return {
            index: this.index,
            row: this.row,
            states: Array.from(this.states)?.filter(state => state !== STATES.PRESSED),
            value: this.value,
            initialValue: this.initialValue,
            operationValue: this.operationValue,
            adjacentIndexes: this.adjacentIndexes
        };
    }

    toString() {
        return `${this.index} (${this.value}): ${this.state}`;
    }

}