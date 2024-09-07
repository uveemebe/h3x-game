import { Hexagon, Hexagons } from "$lib/hexagon.js";
import { Operation } from "$lib/operation.js";
import { Target, Targets } from "$lib/target.js";

import challengeDataMock from "$lib/data/challenge.json";
import { challenge as challengeStore } from '$lib/stores/challenge.js';

const STATES = {
    STARTED: "started",
    FINISHED: "finished"
};

export class Challenge {

    constructor(data = challengeDataMock) {
        this.load(data);
    }
    load(data) {
        this.targets = new Targets(...data.targets.map(data => new Target(this, data)));
        this.hexagons = new Hexagons(...data.hexagons.map(data => new Hexagon(this, data)));
        this.selectedHexagon?.select();
        this.operations = data.operations.map(data => new Operation(this, data));
        this.selectedOperation?.select();
        this.previous = data.previous ?? JSON.stringify(this.toJSONWithoutHistory());
        this.history = data.history ?? [];
        this.date = data.date ? new Date(data.date) : new Date();
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
        //return this.targets.found ? STATES.FINISHED : STATES.STARTED;
        return STATES.STARTED;
    }

    save() {
        const previous = this.previous;
        this.history.push(previous);
        this.previous = JSON.stringify(this.toJSONWithoutHistory());
        challengeStore.set(this);
    }
    undo(all) {
        if (all) {
            this.load(challengeDataMock);
            this.history = [];
        } else if (this.selectedHexagon) {
            this.selectedHexagon.deselect();
        } else {
            const previousChallenge = JSON.parse(this.history.pop());
            previousChallenge.history = this.history;
            this.load(previousChallenge);
        }
        challengeStore.set(this);
    }

    toJSON() {
        return {
            hexagons: this.hexagons,
            operations: this.operations,
            targets: this.targets,
            previous: this.previous,
            history: this.history,
            date: this.date
        };
    }
    toJSONWithoutHistory() {
        return {
            hexagons: this.hexagons,
            operations: this.operations,
            targets: this.targets,
            date: this.date
        };
    }
    toString() {
        return this.hexagons.map(hexagon => hexagon.value).join(", ");
    }

}