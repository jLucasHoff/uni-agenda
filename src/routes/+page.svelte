<script lang="ts">
	import { onMount } from "svelte";
</script>

<main>
    <h1>UniAgenda</h1>
    <p>Plataforma construída para alunos monitorarem eventos e prazos relacionados ao seu curso.</p>

    <div>
        <a href="/login">acessar agenda</a>
        <a href="/" class="disabled">criar agenda</a>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 25px;

        margin: 0 auto;

        text-align: center;

        max-width: 50vw;

        & div {
            width: 100%;
            display: flex;
            justify-content: space-between;

            & a {
                background-color: var(--color-clickable);
                color: black;
                padding: 1rem;
                border-radius: 0.5rem;
            }
        }
    }
</style>

