<script>
	import { image } from "../data/GlovalVariable.js";
	import { width as wd } from "../data/stores";
	export let stop_it;
	let dialog = "fairy";
	let moving = false;
	let left = $wd * 0.75;
	let top = $wd * 0.005;
	function mousemove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	function outside_check() {
		let x_out = left > $wd * 0.87 || left < $wd * -0.05;
		let y_out = top > $wd * 0.4 || top < $wd * -0.09;
		if (x_out || y_out) {
			left = $wd * 0.75;
			top = $wd * 0.005;
			stop_it(dialog);
		}
	}
</script>

<div
	class="fairy"
	style:left="{left}px"
	style:top="{top}px"
	style:background-image="url({image.fairy})"
	style:background-size="cover"
	style:background-repeat="no-repeat"
	on:mousedown={() => (moving = true)}
/>
<svelte:window
	on:mouseup={() => {
		moving = false;
		outside_check();
	}}
	on:mousemove={mousemove}
/>

<style>
	.fairy {
		cursor: move;
		top: 0%;
		right: 0%;
		width: 17rem;
		height: 18rem;
		appearance: None;
		z-index: 999;
		user-select: none;
		position: absolute;
	}
</style>
