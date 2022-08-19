<script>
	import { quadOut, quadIn } from "svelte/easing";
	import { scale } from "svelte/transition";
	// width, height, left, top are integers
	// title, bgcolor, icon are strings, + icon is a path to an image
	export let styles;
	let moving = false;

	function spin(node, { duration, go_up = true }) {
		console.log(node);
		return {
			duration,
			css: (t) => {
				const eased = quadOut(t);
				const eased_tozero = quadOut(t) - 1;
				return `
					perspective: 1000px;
					transform-origin: center bottom 0px;
				  top: 1000px;
					transform: scale(${quadIn(t)}) translateY(-${eased * 1000}px) rotateX(${
					eased_tozero * 180
				}deg);`;
			},
		};
	}

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

<div class="window draggable" style={cssVarStyles} transition:scale>
	<!-- TITLEBAR -->
	<div class="titlebar" on:mousedown={() => (moving = true)}>
		<div class="nav">
			<img src={styles.icon} alt={null} />
		</div>
		<p id="title">{styles.title}</p>
	</div>
	<!-- CONTENT SLOT -->
	<div class="slot">
		<slot />
	</div>
</div>
<!-- WINDOWS EVENTLITSENOR -->
<svelte:window on:mouseup={() => (moving = false)} on:mousemove={onMouseMove} />

<style>
	p {
		font-size: 2.2rem;
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
		border: 0.15rem solid #000000;
		border-radius: 0.5rem;
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
		padding: 0.3rem 1.5rem;

		top: 0;
		width: calc(100% + 4px);
		height: 4rem;

		overflow: hidden;
		background: #2c2c2c;
		border-radius: 0.15rem 0.15rem 0 0;
		box-sizing: border-box;
	}
	.nav {
		position: absolute;
		left: 1rem;
		width: 3rem;
		height: 3rem;
	}
	.slot {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background: inherit;
	}

	.draggable {
		user-select: none;
		position: absolute;
	}
</style>
