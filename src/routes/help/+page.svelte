<script>
</script>

<article>
    <header>
        <h1>Cómo se juega</h1>
        <a class="button enabled" href="/"><i class="material-symbols-rounded">close</i></a>
    </header>
    <h2>Encuentra el número realizando operaciones entre hexágonos adyacentes.</h2>
    <p>1. Selecciona un hexágono.</p>
    <p class="indent"><img src="/help/light/first.png" alt=""></p>
    <p>2. Escoge la operación que quieres realizar.</p>
    <p class="indent"><img src="/help/light/operations.png" alt=""></p>
    <p>3. Selecciona un hexágono adyacente con el que quieres realizar la operación.</p>
    <p class="indent"><img src="/help/light/second.png" alt=""></p>
    <p class="indent">El resultado de la operación sustituye el valor del segundo hexágono y como ya lo has utilizado, el primero queda bloqueado.</p>
    <p class="indent"><img src="/help/light/result.png" alt=""></p>
    <p>4. Repite estos tres pasos hasta que encuentres el número.</p>
    <p class="indent"><img src="/help/light/targets.png" alt=""></p>
    <p class="indent"><img src="/help/light/found.png" alt=""></p>
</article>

<style>
    article {
        margin: 8px;
        padding: 8px 8px 8px 16px;
        border: solid 1px var(--color-dark-disabled);
        box-shadow: 0px 0px 8px var(--color-dark-transparent), 0px 0px 16px var(--color-dark-transparent);
        border-radius: 4px;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h1 {
        font-size: var(--font-size-5);
    }
    h2 {
        font-size: var(--font-size-3);
        margin-bottom: 16px;
    }
    .indent {
        margin-left: 8px;
    }
    p {
        font-size: var(--font-size-3);
        margin: 8px 0;
    }
    img {
        width: 150px;
    }
</style>