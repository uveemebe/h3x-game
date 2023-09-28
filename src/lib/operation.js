import { Statable } from "$lib/statable.js";

export const OPERATION = {
    add: {calculate: (a, b) => a + b, operator: "+"},
    subtract: {calculate: (a, b) => a - b, operator: "−"},
    multiply: {calculate: (a, b) => a * b, operator: "×"},
    divide: {calculate: (a, b) => {
        const result = a / b;
        return Number.isInteger(result) ? result : result.toFixed(1);
    }, operator: "÷"}
};

export class Operation extends Statable {

    constructor(challenge, data) {
        super(data.states ?? []);
        this.challenge = challenge;
        this.name = data.name;
        this.calculate = OPERATION[data.name].calculate;
        this.operator = OPERATION[data.name].operator;
    }

    get selectedHexagon() {
        return this.challenge.selectedHexagon;
    }
    get state() {
        this.enabled = this.challenge.selectedOperation || this.selectedHexagon?.adjacents.find((hexagon) => hexagon.enabled);
        return super.state;
    }

    click() {
        this.selected ? this.deselect() : this.select();
    }

    select() {
        const previousSelectedOperation = this.selected ? null : this.challenge.selectedOperation;
        previousSelectedOperation?.deselect();
        this.selected = true;
        this.selectedHexagon.nonAdjacents.forEach((hexagon) => hexagon.disable());
        this.selectedHexagon.adjacents.forEach((hexagon) => {
            const operationValue = this.calculate(this.selectedHexagon.value, hexagon.value);
            const found = this.challenge.targetIsFound(operationValue);
            hexagon.enable(operationValue, found);
        });
    }
    deselect() {
        this.selected = false;
        this.selectedHexagon?.others.forEach((hexagon) => hexagon.enable());
    }

    toJSON() {
        return {
            name: this.name,
            states: Array.from(this.states)
        };
    }

}