import { Hexagon, Hexagons } from "$lib/hexagon.js";
import { Operation } from "$lib/operation.js";
import { Target, Targets } from "$lib/target.js";

import challengeDataMock from "$lib/data/challenge.json";
challengeDataMock.date = new Date();

const STATES = {
    STARTED: "started",
    FINISHED: "finished"
};

export class Challenge {

    constructor(data = challengeDataMock) {
        this.targets = new Targets(...data.targets.map(data => new Target(this, data)));
        this.hexagons = new Hexagons(...data.hexagons.map(data => new Hexagon(this, data)));
        this.selectedHexagon?.select();
        this.operations = data.operations.map(data => new Operation(this, data));
        this.selectedOperation?.select();
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
    get enabledTarget() {
        return this.targets.find(target => target.enabled);
    }

    get state() {
        return this.targets.found ? STATES.FINISHED : STATES.STARTED;
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