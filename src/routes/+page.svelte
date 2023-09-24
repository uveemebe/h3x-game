<script>
    import { challenge } from "$lib/stores/challenge";
    import Hexagon from "./hexagon.svelte";
	import Buttons from "./buttons.svelte";
</script>

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
<section class="log">
    <div><button on:click={() => localStorage.clear()}>Clear</button></div>
    <div>
        {#each $challenge.hexagons as hexagon}
            <span>{hexagon.toString()}</span>
        {/each}
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
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
    /* log */
    section.log div {
        display: flex;
        flex-direction: column;
        color: var(--color-text-light);
    }
    section.log div span {
        font-size: var(--font-size-small);
    }
</style>