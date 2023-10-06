import { Hexagon, Hexagons } from "$lib/hexagon.js";
import { Operation } from "$lib/operation.js";
import { Target, Targets } from "$lib/target.js";

export class Challenge {

    constructor(data) {
        this.targets = new Targets(...data.targets.map(data => new Target(this, data)));
        this.hexagons = new Hexagons(...data.hexagons.map(data => new Hexagon(this, data)));
        this.selectedHexagon?.select();
        this.operations = data.operations.map(data => new Operation(this, data));
        this.selectedOperation?.select();
        this.targets.start();
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

    check() {}

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

export class LockChallenge extends Challenge {

    constructor(data) {
        super(data);
    }

    check(selectedHexagon) {
        const foundTarget = this.targets.isFound(selectedHexagon.value);
        if (foundTarget) {
            foundTarget.lock(true);
            this.targets.find(target => !target.enabled && !target.locked)?.enable();
            selectedHexagon.found = true;
            selectedHexagon.lock(true);
            const notFoundHexagons = this.hexagons.filter(hexagon => !hexagon.found);
            notFoundHexagons.unlock();
            notFoundHexagons.enable();
            if (this.targets.found) {
                this.hexagons.disable();
            }
        }
    }

}