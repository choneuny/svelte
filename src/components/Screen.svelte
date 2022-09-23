<script>
	// @ts-nocheck
	import { image, background as bg } from "./data/GlovalVariable.js";
	import { fade, crossfade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { round } from "./data/stores.js";
	import Taskbar from "./lib/Taskbar.svelte";
	import Typer from "./lib/Typer.svelte";
	import ThemeSelect from "./app/ThemeSelect.svelte";
	import Announce from "./app/Announce.svelte";
	import Transaction from "./app/Transaction.svelte";
	import PortfolioMini from "./app/PortfolioMini.svelte";
	import Portfolio from "./app/Portfolio.svelte";
	import RoundClear from "./lib/RoundClear.svelte";
	import Explain from "./app/Explain.svelte";
	import News from "./app/News.svelte";
	import Fairy from "./lib/Fairy.svelte";
	import InitDialog from "./data/InitDialog.js";
	import Ending from "./lib/Ending.svelte";

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			};
		},
	});
	const diag_event = (dialog) => {
		diag_open = true;
		diag = InitDialog[dialog];
	};
	let diag_open = true;
	let step_done = false;
	let check_done = (...args) => {
		step_done = args.length > 0 ? false : true;
		console.log("done");
	};
	let count = 0;
	let increasecount = () => {
		if ($round >= 2 && count > 3) {
			current_step = {
				apps: [
					{
						id: "ending",
						component: Ending,
						props: {},
					},
				],
			};
			return;
		}
		if (count < step.length - 1) {
			count++;
		} else {
			count = 0;
		}
		current_step = step[count];
		if ($round === 0) {
			diag = InitDialog[current_step.id];
		} else {
			diag = InitDialog[current_step.id + "_" + $round.toString()];
		}
		console.log("diag id is", diag);
		console.log("diag id is", current_step.id + "_" + $round.toString());
		if (diag?.length > 0) {
			diag_open = true;
		}
		console.log(count);
	};

	let step = [
		{
			id: "select",
			title: "Select Theme",
			apps: [
				{
					id: "themeselect",
					component: ThemeSelect,
					props: { check_done: check_done, diag_event: diag_event },
				},
			],
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
				{ id: "pfl_mini", component: PortfolioMini, props: {} },
			],
		},
		{
			id: "roundclear",
			title: "Round Clear",
			apps: [
				{ id: "loading", component: RoundClear, props: { increasecount } },
			],
		},
		{
			id: "roundstart",
			title: "Round Start",
			apps: [
				{ id: "pfl", component: Portfolio, props: {} },
				{ id: "explain", component: Explain, props: { check_done } },
			],
		},
		{
			id: "news",
			title: "News",
			apps: [{ id: "news", component: News, props: { check_done } }],
		},
	];

	let current_step = step[count];
	let diag = InitDialog[current_step.id];
</script>

<div class="screen" style={bg.monitor} transition:fade>
	<div class="wallpaper" style={bg.gradient}>
		{#if count !== step.length - 3}
			<Fairy stop_it={diag_event} />
		{/if}
		{#each current_step.apps as app (app.id)}
			<svelte:component this={app.component} {...app.props} />
		{/each}
		{#if diag_open}
			<Typer bind:dialog={diag} bind:isopen={diag_open} />
		{/if}
		<Taskbar
			bind:step_done
			{check_done}
			{increasecount}
			bind:current_apps={current_step.apps}
		/>
	</div>
</div>

<style>
	.screen {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.wallpaper {
		position: absolute;
		width: 99%;
		height: 97.5%;
		left: 0.5%;
		top: 1%;
		overflow: hidden;
	}
</style>
