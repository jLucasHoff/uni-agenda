<script lang="ts">
	import type { Snippet } from "svelte";

    let {children}:{children:Snippet} = $props();
</script>

<main>
    {@render children?.()}
</main>

<style>
    main {
        flex: 1;
        
        max-width: var(--ref-max-width);

        display: flex;
        flex-direction: column;
        justify-content: center;

        box-sizing: border-box;

        padding: 25px;
    }
</style>