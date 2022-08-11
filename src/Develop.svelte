<script>
	import { afterUpdate } from "svelte";
	// set the default active slide to the first one
	let count = 3;
	let screen = 1536;
	let size = screen * count;
	let moveSlide;
	afterUpdate(() => {
		// @ts-ignore
		const carousel = document.querySelector("#carousel").style;
		carousel.transform = `translateX(0)`;
		moveSlide = (moveStep) => {
			const current = carousel.transform.split("(")[1].split(")")[0].split("px")[0];
			const move = moveStep * screen;
			let new_current = Number(current) + move;
			if (new_current <= -size) {
				new_current = 0;
			} else if (new_current > 0) {
				new_current = -size + screen;
			}
			console.log(current);
			console.log(new_current);
			carousel.transform = `translateX(${new_current}px)`;
			// @ts-ignore
		};
	});
	console.log(size);

	// // change slide with the prev/next button
</script>

<!-- Implement the carousel -->
<div class="relative w-full overflow-hidden">
	<div id="carousel" class="relative mx-auto flex flex-row" style="width:{size}px">
		<div class="slide relative w-full">
			<img
				class="w-full h-full object-cover"
				src="https://www.kindacode.com/wp-content/uploads/2022/07/flower-1.jpeg"
				alt="error"
			/>
			<div class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Flower One Caption</div>
		</div>

		<div class="slide relative w-full">
			<img
				class="w-full h-full object-cover"
				src="https://www.kindacode.com/wp-content/uploads/2022/07/flower-2.jpeg"
				alt="error"
			/>
			<div class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Flower Two Caption</div>
		</div>

		<div class="slide relative w-full">
			<img
				class="w-full h-full object-cover"
				src="https://www.kindacode.com/wp-content/uploads/2022/07/flower-3.jpeg"
				alt="error"
			/>
			<div class="absolute bottom-0 w-full px-5 py-3 bg-black/40 text-center text-white">Flower Three Caption</div>
		</div>
	</div>

	<!-- The previous button -->
	<a
		href="#"
		class="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
		on:click={() => moveSlide(1)}>❮</a
	>

	<!-- The next button -->
	<a
		href="#"
		class="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
		on:click={() => moveSlide(-1)}>❯</a
	>
</div>

<style>
	#carousel {
		transition: all 1s ease-in-out 0s;
	}
</style>
