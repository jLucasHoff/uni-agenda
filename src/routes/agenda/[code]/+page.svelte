<script lang="ts">
	import Notice from '$lib/components/notice.svelte';
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- <div id="agenda_menu">
    <button type="button"><span class="material-symbols-rounded">close</span></button>
</div> -->
{#if !data}
<div id="loading_overlay">
    <span class="material-symbols-rounded">app_badging</span>
    <p>Carregando...</p>
</div>
{:else}
<div id="agenda_viewer">
    <div>
        <!-- <button type="button"><span class="material-symbols-rounded">menu</span></button> -->
        <h1>{data?.agenda.name}</h1>
    </div>
    <section>
        {#each data?.agenda.agenda as notice}
            <Notice title={notice.title} description={notice.description} expiration={new Date(notice.expire_at).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'})} />
        {/each}
    </section>
</div>
{/if}

<style>
    #agenda_viewer {
        display: flex;
        flex-direction: column;
        gap: 25px;

        padding: 1rem;

        min-width: 500px;
        max-width: 900px;
        width: 100vw;

        margin: 0 auto;

        & div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;

            position: relative;

            & button {
                all: unset;
                cursor: pointer;

                position: absolute;
                left: 0;
            }
        }

        & section {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;

            background-color: white;
            border-radius: 25px;

            box-sizing: border-box;
            padding: 2rem;

            & > :global(article):not(:last-child) {
                border-bottom: 1px solid var(--color-interactive);
                padding-bottom: 15px;
            }
        }
    }
</style>