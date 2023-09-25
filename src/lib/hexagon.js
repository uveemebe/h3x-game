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
        return this.challenge;
    }

    deselect() {
        this.selected = false;
        this.challenge.selectedOperation?.deselect();
        this.others.forEach((hexagon) => hexagon.enable());
        this.operation && (this.operation.selected = false);
    }
    select() {
        const selectedOperation = this.challenge.selectedOperation;
        if (!selectedOperation) {
            this.others.filter(hexagon => hexagon.selected).forEach((hexagon) => hexagon.deselect());
            this.selected = true;
        } else {
            this.press();
            this.value = this.operationValue;
            const selectedHexagon = this.challenge.selectedHexagon;
            selectedHexagon.others.forEach((hexagon) => hexagon.enable());
            selectedHexagon.lock();
            selectedOperation.deselect();
            this.challenge.save = true;
        }
    }

    disable() {
        this.enabled = false;
        this.operation = null;
    }
    enable(operation = null) {
        this.operation = operation;
        this.operationValue = operation ? operation.calculate(this.operation.selectedHexagon.value, this.value) : null;
        this.enabled = this.operationValue === null || (this.operationValue > 0 && this.operationValue < 10000 && Number.isInteger(this.operationValue));
    }

    unlock() {
        this.locked = false;
    }
    lock() {
        this.value = this.initialValue;
        this.enabled = false;
        this.selected = false;
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