<script>
	import { image, background as bg } from "./data/GlovalVariable.js";
	export let setPage;
	let done = false;
</script>

<div id="intro" class="anim nodrag" style={bg.intro}>
	<div
		class="hiddeninput {done ? ' nodrag fadeout' : ''}"
		on:click={() => {
			setPage("room");
			done = true;
		}}
	>
		<img class="title nodrag" src={image.title} alt="TITLE" />
		<img
			class="title subtitle blink nodrag"
			src={image.taptostart}
			alt="subtitle"
		/>
	</div>
</div>

<style>
	.anim {
		position: relative;
		width: 100%;
		height: inherit;
	}

	.hiddeninput {
		position: relative;
		width: 100%;
		height: inherit;
		/* backdrop-filter: blur(3px); */
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		z-index: 3;
	}

	.title {
		width: calc(var(--size) * 0.6px);
		height: calc(var(--size) * 0.1px);
		display: block;
	}

	.subtitle {
		width: calc(var(--size) * 0.45px);
		height: calc(var(--size) * 0.09px);
	}
</style>
