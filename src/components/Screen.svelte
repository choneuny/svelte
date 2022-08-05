<script>
	import Typer from "./lib/Typer.svelte";
	import Taskbar from "./lib/Taskbar.svelte";
	import Dialog from "./data/InitDialog.js";
	import InitSequence from "./InitSequence.svelte";
	import RoundStart from "./init/RoundStart.svelte";
	import { round, next_round } from "./data/stores.js";
	let current_round;
	round.subscribe((x) => {
		current_round = x;
	});
	let diagOpen = true;
	let roundDone = false;
	console.log(current_round);
</script>

<div class="screen">
	<div class="wallpaper">
		<!-- {#if current_round === 0} -->
		<InitSequence />
		<!-- {:else}
			<RoundStart />
			<Taskbar next={roundDone} count={0} />
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
		width: 98.8%;
		height: 98.5%;
		transform: translate(-50%, -50%);
		background: url(./img/background/parchment.png);
		background-size: contain;
	}
</style>
