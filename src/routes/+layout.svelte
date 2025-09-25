<script lang="ts">
	import "../app.css";
	import favicon from '$lib/assets/favicon.svg';
	import { onDestroy, onMount } from 'svelte';
	import Notifications from '$lib/components/notifications.svelte';

	let { children } = $props();

	  onMount(() => {
		const handleClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.tagName === "A" && target.classList.contains("disabled")) {
			e.preventDefault();
			e.stopImmediatePropagation();
			alert("Este link está desabilitado no momento");
		}
		};

		document.addEventListener("click", handleClick, true);

		onDestroy(() => document.removeEventListener("click", handleClick, true));
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=app_badging,clock_loader_10,clock_loader_20,clock_loader_40,clock_loader_60,clock_loader_80,clock_loader_90,close,link,login,menu&display=block" />
</svelte:head>

{@render children?.()}

<Notifications />