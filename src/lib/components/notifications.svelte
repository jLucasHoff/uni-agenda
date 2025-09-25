<script>
	import { notifications } from "$lib";
	import Notification from "./notification.svelte";

</script>

<div>
    {#each $notifications as {id, message} (id)}
        <Notification {message} />
    {/each}
</div>

<style>
    div {
        position: absolute;
        bottom: 25px;
        right: 25px;

        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        gap: 15px;
    }
</style>