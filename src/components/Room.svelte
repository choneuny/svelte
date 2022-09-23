<script>
	import { image, background as bg } from "./data/GlovalVariable.js";
	import { fade } from "svelte/transition";
	import Typer from "./lib/Typer.svelte";
	import InitDialog from "./data/InitDialog";
	export let page;
	export let setPage;

	const dialog = [...InitDialog[page]];
	console.log(dialog);
	let isopen = true;

	// if (!isopen) {
	// 	setTimeout(() => {
	// 		setPage("screen");
	// 	}, 200);
	// }
</script>

<div class="room" style={bg.desk} transition:fade>
	<Typer {dialog} bind:isopen />
	{#if isopen}
		<div class="absolute w-1/4 right-4 top-8" transition:fade>
			<img class="w-full h-fit" src={image.fairy} alt="err" />
		</div>
	{:else}
		{setTimeout(() => {
			setPage("screen");
		}, 500)}
	{/if}
</div>

<style>
	.room {
		position: relative;
		width: 100%;
		height: inherit;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
