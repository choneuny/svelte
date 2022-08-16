<script>
	// width, height, left, top are integers
	// title, bgcolor, icon are strings, + icon is a path to an image
	export let styles;
	let alt = "./img/icon/alt.png";
	let moving = false;

	// object to css styles
	$: cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(";");

	// on drag, move the window
	function onMouseMove(e) {
		if (moving) {
			styles.left += e.movementX;
			styles.top += e.movementY;
		}
	}
</script>

<div class="window draggable" style={cssVarStyles}>
	<!-- TITLEBAR -->
	<div class="titlebar" on:mousedown={() => (moving = true)}>
		<div class="nav">
			<img src={styles.icon} {alt} />
		</div>
		<p id="title">{styles.title}</p>
	</div>
	<!-- CONTENT SLOT -->
	<div class="slot">
		<slot />
	</div>
</div>
<!-- DRAGGABLE WINDOWS -->
<svelte:window on:mouseup={() => (moving = false)} on:mousemove={onMouseMove} />

<style>
	p {
		font-size: 24px;
		font-weight: 600;
		color: #fff;
	}
	p::before {
		content: var(--title);
	}

	img {
		filter: invert();
		width: 100%;
		height: 100%;
	}

	.window {
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
		left: calc(var(--left) * 1px);
		top: calc(var(--top) * 1px);
		background-color: var(--bgcolor);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 2px solid #000000;
		border-radius: 8px;
		box-sizing: border-box;
		backdrop-filter: blur(10px);
		overflow: hidden;
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

		overflow: hidden;
		background: #2c2c2c;
		border-radius: 8px 8px 0 0;
		box-sizing: border-box;
	}
	.nav {
		position: absolute;
		left: 15px;
		width: 36px;
		height: 36px;
	}
	.slot {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
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
