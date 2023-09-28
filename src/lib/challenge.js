import { Hexagon } from "$lib/hexagon.js";
import { Operation } from "$lib/operation.js";
import { Target } from "./target";

export class Challenge {

    constructor(data) {
        this.hexagons = data.hexagons.map(data => new Hexagon(this, data));
        this.selectedHexagon?.select();
        this.operations = data.operations.map(data => new Operation(this, data));
        this.selectedOperation?.select();
        this.targets = data.targets.map(data => new Target(this, data));
        this.save = data.save ?? false;
    }

    get rows() {
        const rows = [];
        this.hexagons.forEach(hexagon => {
            const row = rows[hexagon.row] ?? [];
            row.push(hexagon);
            rows[hexagon.row] = row;
        });
        return rows;
    }

    get selectedHexagon() {
        return this.hexagons.find(hexagon => hexagon.selected);
    }
    get selectedOperation() {
        return this.operations?.find(operation => operation.selected);
    }

    targetIsFound(value) {
        return this.targets.filter(target => !target.found).find(target => target.isFound(value));
    }
    targetFound(hexagon) {
        this.targets.filter(target => !target.found).find(target => target.isFound(hexagon.value)).found = true;
        hexagon.disable();
        hexagon.lock();
        this.hexagons.filter(hexagon => !hexagon.found).forEach(hexagon => {
            hexagon.unlock();
            hexagon.enable();
        });
    }

    toJSON() {
        return {
            hexagons: this.hexagons,
            operations: this.operations,
            targets: this.targets
        };
    }
    toString() {
        return this.hexagons.map(hexagon => hexagon.value).join(", ");
    }

}