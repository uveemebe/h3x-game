<script>
    import { challenge } from "$lib/stores/challenge";
	import Targets from "./targets.svelte";
    import Hexagon from "./hexagon.svelte";
	import Operation from "./operation.svelte";
	import Undo from "./undo.svelte";
</script>

<section class="targets">
    <Targets></Targets>
</section>
<section class="hexagons">
    {#each $challenge.rows as row}
        <div class="row">
            {#each row as hexagon}
                <Hexagon hexagon={hexagon}></Hexagon>
            {/each}
        </div>
    {/each}
</section>
<section class="buttons">
    {#each $challenge.operations as operation}
        <Operation operation={operation}></Operation>
    {/each}
    <Undo></Undo>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    section+section {
        margin-top: 8px;
    }
    /* targets */
    section.targets {
        height: 40px;
        margin-bottom: 8px;
    }
    /* hexagons */
    .hexagons div {
        display: flex;
        flex-direction: row;
        column-gap: 4px;
        justify-content: center;
    }
    section.buttons {
        display: flex;
        flex-direction: row;
        column-gap: 12px;
        min-height: 80px;
    }
    .row+.row {
        margin-top: -20px;
    }
    /* buttons */
    section.buttons {
        min-height: 80px;
    }
</style>