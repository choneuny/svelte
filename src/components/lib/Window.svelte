<script>
	export let left = 100;
	export let top = 100;
	export let icon = "./img/icon/alt.png";
	export let title = null;
	export let bgcolor = "transparent";
	let alt = "./img/icon/alt.png";
	let moving = false;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
	}
</script>

<div
	class="window draggable"
	on:mousedown={onMouseDown}
	style="left: {left}px; top: {top}px; background-color:{bgcolor}"
>
	<div class="titlebar">
		<div class="nav">
			<img src={icon} {alt} />
		</div>
		<div class="title">
			<h1 class="text-2xl">{title}</h1>
		</div>
	</div>
	<div class="slot">
		<slot />
	</div>
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	* {
		font-family: "roboto";
		font-weight: 600;
		color: #fff;
		box-sizing: border-box;
	}
	h1 {
		text-align: center;
		text-transform: uppercase;
	}
	img {
		filter: invert();
		width: 100%;
		height: 100%;
	}
	.window {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0px;
		mix-blend-mode: normal;
		border: 2px solid #000000;
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}

	.titlebar {
		cursor: move;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 20px;

		top: 0;
		width: calc(100% + 4px);
		height: 50px;

		background: #2c2c2c;
		border-radius: 8px 8px 0 0;
	}
	.title {
		width: 70%;
	}
	.nav {
		position: absolute;
		left: 15px;
		width: 36px;
		height: 36px;
		border-radius: 5px;
	}
	.slot {
		width: 100%;
		height: 100%;
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: auto;
		background: inherit;
	}

	.draggable {
		user-select: none;
		position: absolute;
	}
</style>
