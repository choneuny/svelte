<script>
	import Typer from "./lib/Typer.svelte";
	import InitDialog from "./data/InitDialog";
	export let page;
	export let setPage;
	let isopen = true;
	const dialog = [...InitDialog[page]];
	console.log(dialog);
</script>

<div class="room">
	<Typer {dialog} bind:isopen />
	{#if !isopen}
		<div
			class="hiddenbutton"
			on:click={() => {
				isopen ? null : setPage("screen");
			}}
		/>
		<div id="arrowAnim">
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
	{/if}
</div>

<style>
	.room {
		position: absolute;
		width: inherit;
		height: inherit;
		background: url(./img/background/desk_source.png) no-repeat;
		background-size: cover;
	}
	.hiddenbutton {
		position: absolute;
		width: inherit;
		height: inherit;
		background-size: cover;
		z-index: 99;
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
		width: 1.5vw;
		height: 1.5vw;
		border: 0.75vw solid;
		border-color: transparent white white transparent;
		transform: rotate(-45deg);
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
