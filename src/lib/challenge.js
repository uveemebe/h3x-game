import { Hexagon } from "$lib/hexagon";
import { Operation } from "$lib/operation";

export class Challenge {

    constructor(data) {
        this.hexagons = data.hexagons.map(data => new Hexagon(this, data));
        this.operations = data.operations.map(data => new Operation(this, data));
        this._selectedHexagon = this.hexagons.find(hexagon => hexagon.selected);
        this.hexagons.find(hexagon => hexagon.selected)?.select();
        this.operations.find(operation => operation.selected)?.select();
        this.save = data.save ?? false;
        this.changed = data.changed ?? false;
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
        return this._selectedHexagon;
    }
    set selectedHexagon(hexagon) {
        this._selectedHexagon = hexagon;
        this.operations.forEach(operation => operation.hexagon = hexagon);
    }

    toJSON() {
        return {
            hexagons: this.hexagons,
            operations: this.operations,
            selectedHexagon: this.selectedHexagon,
            changed: this.changed
        };
    }
    toString() {
        return this.hexagons.map(hexagon => hexagon.value).join(", ");
    }

}