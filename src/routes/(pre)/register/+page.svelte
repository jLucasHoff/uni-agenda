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
        <label for="form_email">Digite o seu e-mail:</label>
        <div class="form_area">
            <input type="e-mail" placeholder="exemplo@exemplo.com" name="email" id="form_email" required>
        </div>  
    </fieldset>
    <fieldset>
        <label for="form_code">Digite o código de convite enviado na sua caixa de entrada:</label>
        <div class="form_area">
            <input oninput={codeHandle} type="text" placeholder="XXX-XXX" name="code" id="form_code" required>
            <button type="submit"><span class="material-symbols-rounded">login</span></button>
        </div>  
    </fieldset>  
    <fieldset>
        <a href="/login">Quero acessar a agenda do meu curso.</a>
        <a href="/" class="disabled">Não recebi meu código de convite.</a>        
    </fieldset>
</form>