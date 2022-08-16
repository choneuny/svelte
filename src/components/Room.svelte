<script>
	import { fade } from "svelte/transition";
	import Typer from "./lib/Typer.svelte";
	import InitDialog from "./data/InitDialog";
	export let page;
	export let setPage;
	const fairy = "./img/icon/StockVity.png";
	const dialog = [...InitDialog[page]];
	console.log(dialog);
	let isopen = true;
	// if (!isopen) {
	// 	setTimeout(() => {
	// 		setPage("screen");
	// 	}, 200);
	// }
</script>

<div class="room" transition:fade>
	<Typer {dialog} bind:isopen />
	{#if isopen}
		<div class="absolute w-1/4 right-4 top-8" transition:fade>
			<img class="w-full h-fit" src={fairy} alt="err" />
		</div>
	{:else}
		{setTimeout(() => {
			setPage("screen");
		}, 500)}
	{/if}
</div>

<style>
	.room {
		position: absolute;
		width: inherit;
		height: inherit;
		background: url(./img/background/desk.png) no-repeat;
		background-size: cover;
	}
</style>
