<script>
  	import { settings } from "$lib/stores/settings";
</script>

<h2>Encuentra el número realizando operaciones entre hexágonos adyacentes.</h2>
<p class="indent"><img src="/help/{$settings.theme}/targets.png" alt=""></p>
<p>1. Selecciona un hexágono.</p>
<p class="indent"><img src="/help/{$settings.theme}/first.png" alt=""></p>
<p>2. Escoge la operación que quieres realizar.</p>
<p class="indent"><img src="/help/{$settings.theme}/operations.png" alt=""></p>
<p>3. Selecciona un hexágono adyacente con el que quieres realizar la operación.</p>
<p class="indent"><img src="/help/{$settings.theme}/second.png" alt=""></p>
<p class="indent">El resultado de la operación sustituye el valor del segundo hexágono y ya no puedes utilizar el primero.</p>
<p class="indent"><img src="/help/{$settings.theme}/result.png" alt=""></p>
<p>4. Repite estos tres pasos hasta que encuentres el número.</p>
<p class="indent"><img src="/help/{$settings.theme}/found.png" alt=""></p>

<style>
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