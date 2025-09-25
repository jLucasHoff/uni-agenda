<script lang="ts">
	import { timeDiff } from "$lib";

    let now:Date = $state(new Date());

    let {title, description, expiration}: {title: string, description: string, expiration: string} = $props();

    let remain: string = $state("");
    let complete: number = $state(0);
    let scope: string = $state("");

    $effect(() => {
        const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		// cleanup quando o componente desmonta
		return () => clearInterval(interval);
    });

    $effect(() => {
        const result = timeDiff(now.toISOString(), expiration, true);
        remain = result.remain;
        complete = result.complete;
        scope = result.scope;
    })

    function isLink(text: string): boolean {
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        return urlPattern.test(text.trim());
    }
</script>

<article>
    <h4 class={isLink(title) ? 'link' : ''}>
        {#if isLink(title)}
            <span class="material-symbols-rounded">link</span>
            <a href={title} target="_blank" rel="noopener noreferrer">{description}</a>
        {:else}
            {title}
        {/if}
    </h4>
    <p id="notice_description">{description}</p>
    <div class="scope-{scope}">
        <p id="notice_time_remain">
            <span class="material-symbols-rounded">
            {#if complete >= 90}
                clock_loader_90
            {:else if complete >= 80}
                clock_loader_80
            {:else if complete >= 60}
                clock_loader_60
            {:else if complete >= 40}
                clock_loader_40
            {:else if complete >= 20}
                clock_loader_20
            {:else}
                clock_loader_10
            {/if}
            </span>
            {remain}
        </p>
        <p id="notice_expiration">{expiration}</p>
    </div>
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 10px;

        max-width: 500px;
        width: 100%;

        & h4 {
            font-size: 1rem;
            font-weight: normal;

            &.link {
                color: var(--color-link);
            }
        }

        & #notice_description {
            opacity: 0.4;
        }

        & div {
            display: flex;
            justify-content: space-between;
            align-items: center;

            opacity: .6;

            &.scope-segundos #notice_time_remain {
                color: #d32f2f;
            }
            &.scope-minutos #notice_time_remain {
                color: #f57c00;
            }
            &.scope-horas #notice_time_remain {
                color: #fbc02d;
            }

            & #notice_time_remain {
                display: flex;
                align-items: center;
                gap: 5px;

                font-size: 1rem;

                & .material-symbols-rounded {
                    font-size: 1.25rem;
                }
            }
        }
    }
</style>