import { Hexagon } from "$lib/hexagon.js";
import { Operation } from "$lib/operation.js";

export class Challenge {

    constructor(data) {
        this.hexagons = data.hexagons.map(data => new Hexagon(this, data));
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

    toJSON() {
        return {
            hexagons: this.hexagons,
            operations: this.operations,
            selectedHexagon: this.selectedHexagon
        };
    }
    toString() {
        return this.hexagons.map(hexagon => hexagon.value).join(", ");
    }

}