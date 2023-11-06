<script>
    export let data;
</script>

<article>
    <header>
        <h1>{data.title}</h1>
        <a class="button enabled" href="/"><i class="material-symbols-rounded">close</i></a>
    </header>
    <slot></slot>
</article>

<style>
    article {
        margin: 8px;
        padding: 16px;
        border: solid 1px var(--color-dark-disabled);
        box-shadow: 0px 0px 8px var(--color-dark-transparent), 0px 0px 16px var(--color-dark-transparent);
        border-radius: 4px;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    h1 {
        font-size: var(--font-size-5);
    }
    a {
        position: absolute;
        top: 0px;
        right: 0px;
    }
</style>