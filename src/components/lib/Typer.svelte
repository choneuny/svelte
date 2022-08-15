<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Fairy from "./Fairy.svelte";
	export let dialog;
	export let isopen;
	const dialogLen = dialog.length;
	const typeSpeed = 20;
	const fairy = "./img/icon/StockVity.png";
	let done = true;
	let dialogQueue = -1;
	let part = "";
	let cursor = 0;
	let typeDialog;
	if (dialogLen === 0) {
		isopen = false;
	}

	const type = (text) => {
		if (cursor >= text?.length || done) {
			done = true;
			cursor = text?.length;
			part = text?.substring(0, cursor);
			clearInterval(typeDialog);
		} else {
			cursor++;
			if (text?.substring !== undefined) {
				part = text?.substring(0, cursor);
			} else {
				clearInterval(typeDialog);
			}
		}
	};

	const nextDialog = () => {
		if (dialogQueue >= dialogLen || (dialogQueue >= dialogLen - 1 && done)) {
			dialogQueue++;
			isopen = false;
			console.log(dialog);
		} else {
			if (done && isopen) {
				dialogQueue++;
				cursor = 0;
				done = false;
				typeDialog = setInterval(() => type(dialog[dialogQueue]?.text), typeSpeed);
			} else {
				done = true;
			}
		}
	};

	onMount(async () => {
		dialogQueue++;
		cursor = 0;
		done = false;
		typeDialog = setInterval(() => type(dialog[dialogQueue]?.text), typeSpeed);
	});
</script>

<div
	class="overlay {isopen ? '' : 'fadeout'}"
	transition:fade
	on:click={() => {
		nextDialog();
	}}
>
	<img class="absolute scale-x-[-1] left-4 bottom-56 z-50" src={fairy} alt="err" />
	<div class="dialog">
		<p class="text-3xl antialiased">{part}</p>
		<img class="next blink {done ? '' : 'hidden'}" src="./img/icon/downward-nobg.png" alt="error" />
	</div>
</div>

<style>
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(3px);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.dialog {
		color: white;
		position: fixed;
		width: inherit;
		top: 70%;
		height: 30%;
		width: 100%;
		padding: 2em;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.8);
		box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
		z-index: 20;
	}
</style>
