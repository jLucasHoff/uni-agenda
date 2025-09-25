<script lang="ts">
	import { codeHandle, notify } from "$lib";
	import type { PageProps } from "./$types";

    let {data, form}: PageProps = $props();

    $effect(() => {
        if (form?.message) notify(form?.message)
    })
</script>

<form method="POST">
    <fieldset>
        <label for="">Digite o código do seu curso:</label>
        <div class="form_area">
            <input oninput={codeHandle} type="text" placeholder="XXX-XXX" name="code" id="code" maxlength="7" required />
            <button type="submit"><span class="material-symbols-rounded">login</span></button>
        </div>  
    </fieldset>
    
    <a href="/" class="disabled">Quero criar uma agenda para meu curso!</a>
</form>