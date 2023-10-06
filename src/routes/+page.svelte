<script>
    import { challenge } from "$lib/stores/challenge";
    import Hexagon from "./hexagon.svelte";
	import Buttons from "./buttons.svelte";
	import Targets from "./targets.svelte";
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
<section class="buttons"><Buttons operations={$challenge.operations}></Buttons></section>

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
        margin-bottom: 8px;
    }
    /* hexagons */
    .hexagons div {
        display: flex;
        flex-direction: row;
        column-gap: 4px;
        justify-content: center;
    }
    .row+.row {
        margin-top: -20px;
    }
    /* buttons */
    section.buttons {
        min-height: 48px;
    }
</style>