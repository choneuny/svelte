<script>
	import { image } from "../data/GlovalVariable.js";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	export let dialog;
	export let isopen;
	isopen = dialog ? true : false;
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
				typeDialog = setInterval(
					() => type(dialog[dialogQueue]?.text),
					typeSpeed
				);
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
	<img
		class="absolute scale-x-[-1] left-4 bottom-56 z-50"
		style:width="12rem"
		style:height="12rem"
		src={image.fairy}
		alt={image.alt}
	/>
	<div
		id="dialog"
		class="dialog relative"
		style:border="0.2rem solid #d6d3d1"
		style:border-radius="0.5rem"
	>
		<p
			class="small absolute w-1/4 h-1/6 text-center bg-black"
			style:top="-1rem"
			style:left="8rem"
			style:border="0.2rem solid #d6d3d1"
			style:border-radius="0.5rem"
		>
			스탁비티
		</p>
		<p class="small antialiased break-words leading-relaxed">{part}</p>
		<img
			class="next blink {done ? '' : 'hidden'} absolute"
			style:width="12rem"
			style:height="5rem"
			style:right="1rem"
			src={dialogQueue >= dialogLen - 1 ? image.close : image.next}
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
