<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	export let dialog;
	export let isopen;
	const fairy = "./img/icon/StockVity.png";
	const dialogLen = dialog.length;
	const typeSpeed = 20;
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
	<div class="relative dialog border-4 border-stone-300 rounded-t-2xl">
		<p class="absolute -top-4 left-36 w-1/4 h-1/6 border-4 border-stone-300 rounded-xl text-2xl text-center bg-black">
			스톡비티
		</p>
		<p class="text-3xl antialiased break-words leading-relaxed">{part}</p>
		<img
			class="next blink {done ? '' : 'hidden'} right-8 absolute"
			src={dialogQueue >= dialogLen - 1 ? "./img/icon/close.svg" : "./img/icon/next.svg"}
			alt="error"
		/>
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
		padding: 3em 16em 2em 2em;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.8);
		box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
		z-index: 20;
	}

	.next {
		position: absolute;
		height: 70px;
		width: fit-content;
		right: 15px;
		bottom: 10px;
		filter: invert(100%);
		z-index: 99;
	}
</style>
