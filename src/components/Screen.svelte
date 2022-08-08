<script>
	import { fade } from "svelte/transition";
	import ThemeSelect from "./app/ThemeSelect.svelte";
	import Typer from "./lib/Typer.svelte";
	import Taskbar from "./lib/Taskbar.svelte";
	import Dialog from "./data/InitDialog.js";
	import { round, next_round } from "./data/stores.js";
	let diag_open = true;
	let step_done = false;
	const app_list = [{ id: "select", component: ThemeSelect }];
	let app_list_open = app_list;
	let app_list_call = [];
	let event_app_open = () => {
		app_list_open = [...app_list_call];
	};
</script>

<div class="screen" transition:fade>
	<div class="wallpaper">
		{#each app_list_open as app}
			<svelte:component this={app.component} />
		{/each}
		<Taskbar {step_done} {event_app_open} />
		<!-- {#if current_round === 0} -->
		<!-- <InitSequence /> -->
		<!-- {:else}
			<RoundStart />
		{/if} -->
	</div>
</div>

<style>
	.screen {
		position: relative;
		width: inherit;
		height: inherit;
		background: url(./img/background/monitor.png) no-repeat;
		background-size: cover;
	}
	.wallpaper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 99%;
		height: 98.5%;
		transform: translate(-50%, -50%);
		background: url(./img/background/gradient.png);
		background-size: contain;
	}
</style>
