<script>
	import { fade } from "svelte/transition";
	import Taskbar from "./lib/Taskbar.svelte";
	import Typer from "./lib/Typer.svelte";
	import Dialog from "./data/InitDialog.js";
	import { round, next_round } from "./data/stores.js";
	import ThemeSelect from "./app/ThemeSelect.svelte";
	import Announce from "./app/Announce.svelte";
	import Transaction from "./app/Transaction.svelte";
	import PortfolioMini from "./app/PortfolioMini.svelte";
	import Portfolio from "./app/Portfolio.svelte";
	import RoundClear from "./lib/RoundClear.svelte";
	import Explain from "./app/Explain.svelte";
	let diag_open = true;
	let step_done = false;
	let check_done = () => {
		step_done = true;
		console.log("done");
	};

	let count = 0;
	let increasecount = () => {
		if (count < step.length - 1) {
			count++;
		} else {
			count = 0;
		}
		console.log(count);
	};
	let step = [
		{
			id: "select",
			title: "Select Theme",
			apps: [{ id: "themeselect", component: ThemeSelect, props: { check_done } }],
		},
		{
			id: "announce",
			title: "Announce",
			apps: [{ id: "announce", component: Announce, props: { check_done } }],
		},
		{
			id: "transaction",
			title: "Transaction",
			apps: [
				{ id: "transaction", component: Transaction, props: { check_done } },
				{ id: "pfl_mini", component: PortfolioMini, props: { check_done } },
			],
		},
		{
			id: "roundclear",
			title: "Round Clear",
			apps: [{ id: "loading", component: RoundClear, props: { increasecount } }],
		},
		{
			id: "roundstart",
			title: "Round Start",
			apps: [
				{ id: "pfl", component: Portfolio, props: { check_done } },
				{ id: "explain", component: Explain, props: { check_done } },
			],
		},
	];

	let current_step = step[count];
	$: current_step = step[count];
	$: console.log(step_done);
</script>

<div class="screen" transition:fade>
	<div class="wallpaper">
		{#each current_step.apps as app}
			<svelte:component this={app.component} {...app.props} />
		{/each}
		<Taskbar {step_done} bind:count />
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
