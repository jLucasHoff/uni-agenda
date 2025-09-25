<script lang="ts">
	import { onMount } from "svelte";

    let {message}:{message:string} = $props();
    let element:HTMLDivElement;
</script>

<div bind:this={element}>
    <button onclick={() => element.remove()} type="button"><span class="material-symbols-rounded">close</span></button>
    <p>{message}</p>
</div>

<style>
    div {
        background-color: var(--color-interactive);

        box-sizing: border-box;
        border-radius: 0.5rem;

        padding: 1rem;

        position: relative;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;

        max-width: 20vw;
        min-width: 200px;
        width: 100vw;

        & span {
            font-size: 1.25rem;

            cursor: pointer;
        }
    }
</style>