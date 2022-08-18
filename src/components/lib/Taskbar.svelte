<script>
	import { image } from "../data/GlovalVariable.js";
	import { scale } from "svelte/transition";
	import Announce from "../app/Announce.svelte";
	import Portfolio from "../app/Portfolio.svelte";
	import Explain from "../app/Explain.svelte";

	import { round } from "../data/stores.js";
	export let step_done;
	export let check_done;
	export let increasecount;
	export let current_apps;
	let apps = [
		{
			id: "announce",
			component: Announce,
			props: { check_done: check_done, instant_show: true },
			icon: image.internet,
			on: true,
		},
		{ id: "pfl", component: Portfolio, props: { check_done }, icon: image.chart, on: true },
		{ id: "history", component: Explain, props: { check_done }, icon: image.history, on: true },
	];

	let open = (e) => {
		const target = e.target;
		const app = apps.find((app) => app.id === target.id);
		const is_open = current_apps.find((x) => x.id == app.id);
		current_apps = is_open
			? current_apps.filter((x) => x.id != app.id)
			: [...current_apps, apps.find((x) => x.id == app.id)];
		target.style.filter = "brightness(" + (is_open ? "1" : "0.5") + ")";
	};

	// let current = apps.filter((x) => current_apps.map((y) => y.id).includes(x.id));
	// let deactivated = apps.filter((x) => !current_apps.map((y) => y.id).includes(x.id));
	// $: current = apps.filter((x) => current_apps.map((y) => y.id).includes(x.id));
	// $: deactivated = apps.filter((x) => !current_apps.map((y) => y.id).includes(x.id));
	$: apps.forEach((x) => (x.on = !current_apps.map((y) => y.id).includes(x.id)));
</script>

<div class="taskbar">
	{#each apps as app (app.id)}
		<button id={app.id} class="custom-button" disabled={$round === 0} on:click={open} transition:scale>
			<img class="custom-icon pointer-events-none" src={app.icon} alt="error" />
		</button>
	{/each}
	<button class="custom-button" on:click={() => (step_done = !step_done)} />
	<div
		id="arrowAnim"
		class={step_done ? "" : "invisible disabled"}
		on:click={() => {
			increasecount();
			step_done = false;
		}}
	>
		<div class="arrowSliding">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay1">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay2">
			<div class="arrow" />
		</div>
		<div class="arrowSliding delay3">
			<div class="arrow" />
		</div>
	</div>
</div>

<style>
	.taskbar {
		position: absolute;
		left: calc(var(--size) * 0.07px);
		bottom: -1px;
		width: calc(var(--size) * 0.65px);
		height: calc(var(--size) * 0.035px);
		background: black;
		opacity: 0.9;
		border-radius: 8px 8px 0 0;

		display: flex;
		gap: 15px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.custom-button {
		position: relative;
		width: calc(var(--size) * 0.03px);
		height: calc(var(--size) * 0.03px);

		background-color: white;
		background-size: cover;
		background-position: center;
		border: 3px solid transparent;
		border-radius: 8px;
		padding: 0;
		z-index: 3;
	}
	.custom-button:hover {
		opacity: 0.7;
	}
	.custom-button:disabled {
		opacity: 0.7;
	}
	.custom-icon {
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	#arrowAnim {
		position: absolute;
		width: 15%;
		height: 80%;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.arrow {
		width: calc(var(--size) * 0.01px);
		height: calc(var(--size) * 0.01px);
		border: calc(var(--size) * 0.005px) solid;
		border-color: transparent white white transparent;
		transform: rotate(-45deg);
		box-sizing: content-box;
	}

	.arrowSliding {
		position: absolute;
		-webkit-animation: slide 4s linear infinite;
		animation: slide 4s linear infinite;
	}

	.delay1 {
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}
	.delay2 {
		-webkit-animation-delay: 2s;
		animation-delay: 2s;
	}
	.delay3 {
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
	}

	@-webkit-keyframes slide {
		0% {
			opacity: 0;
			transform: translateX(-100%);
		}
		20% {
			opacity: 1;
			transform: translateX(-150%);
		}
		80% {
			opacity: 1;
			transform: translateX(60%);
		}
		100% {
			opacity: 0;
			transform: translateX(100%);
		}
	}
	@keyframes slide {
		0% {
			opacity: 0;
			transform: translateX(-100%);
		}
		20% {
			opacity: 1;
			transform: translateX(-150%);
		}
		80% {
			opacity: 1;
			transform: translateX(60%);
		}
		100% {
			opacity: 0;
			transform: translateX(100%);
		}
	}
</style>
