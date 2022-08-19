<script>
	import { afterUpdate } from "svelte";
	export let count = 3;
	export let width = 1536;
	export let show_control = true;
	export let moveSlide = (x) => {};
	let size = width * count;
	afterUpdate(() => {
		// @ts-ignore
		const carousel = document.querySelector("#carousel").style;
		carousel.transform = `translateX(0)`;
		moveSlide = (moveStep) => {
			const current = carousel.transform
				.split("(")[1]
				.split(")")[0]
				.split("px")[0];
			const move = moveStep * width;
			let new_current = Number(current) + move;
			if (new_current <= -size) {
				new_current = 0;
			} else if (new_current > 0) {
				new_current = -size + width;
			}
			console.log(current);
			console.log(new_current);
			carousel.transform = `translateX(${new_current}px)`;
			// @ts-ignore
		};
	});
	console.log("carousel size :", size);
</script>

<!-- Implement the carousel -->
<div class="relative w-full h-full overflow-hidden">
	<div
		id="carousel"
		class="relative h-full flex flex-row shrink-0 grow-0"
		style="width:{size}px"
	>
		<slot />
	</div>
	{#if show_control}
		<!-- The previous button -->
		<a
			href={null}
			class="absolute left-0 top-1/2 p-4 -translate-y-1/2  hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer rounded"
			on:click={() => moveSlide(1)}>❮</a
		>

		<!-- The next button -->
		<a
			href={null}
			class="absolute right-0 top-1/2 p-4 -translate-y-1/2  hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer rounded"
			on:click={() => moveSlide(-1)}>❯</a
		>
	{/if}
</div>

<style>
	#carousel {
		transition: all 800ms ease-in-out 0s;
	}
</style>
