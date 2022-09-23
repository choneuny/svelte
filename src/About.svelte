<script>
	import Carousel from "./components/lib/Carousel.svelte";
	let moveSlide;
	let count = 3;
	let size;
	let frame_size;
	$: size = screen.width * 0.8;
	$: frame_size = ((size - 60) * 5) / 6;
</script>

<div id="about" class="about">
	<!--HEADER-->
	<p class="text-4xl font-bold">ABOUT STOCKVITY</p>
	<!--CAROUSEL FRAME-->
	<div id="image" class="bg-black overflow-hidden w-full h-[600px] flex flex-col items-center">
		<div id="container" class="relative w-5/6 h-full">
			<Carousel {count} width={frame_size} bind:moveSlide show_control={true}>
				{#each new Array(3) as a, i}
					<div
						id="item-{i}"
						class="relative w-full bg-white text-gray flex flex-row justify-center items-center gap-4 px-4"
						on:dblclick={() => moveSlide(-1)}
					>
						<div class="text-black">sample image</div>
					</div>
				{/each}
			</Carousel>
		</div>
	</div>
	<!--ABOUTS-->
	<div id="body">
		<p class="subtitle">Lorem ipsum</p>
		<blockquote class="blockquotes">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis nisi aliquet luctus ultricies. Orci
			varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ornare nisi vitae est
			convallis, at maximus erat faucibus. Cras tempor velit ac condimentum consectetur. Donec tempor et lectus in
			sodales. Nulla eget rhoncus ipsum. Nullam eu interdum odio. Nam sed mauris volutpat, mattis nunc ac, rutrum risus.
			Duis faucibus faucibus sem in accumsan. Nulla sodales ante magna, quis laoreet lectus ultricies non. Proin aliquet
			magna vel iaculis sagittis. Nulla ullamcorper nulla orci, ut volutpat turpis ultrices ut. Integer sed quam
			fermentum ligula varius ullamcorper non vel quam. Orci varius natoque penatibus et magnis dis parturient montes,
			nascetur ridiculus mus. Praesent in semper quam. Mauris eu justo vel leo sodales rutrum eu dictum magna. Sed
			hendrerit ex ac est iaculis vulputate.
		</blockquote>
		<p class="subtitle">Lorem ipsum</p>
		<blockquote class="blockquotes">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis nisi aliquet luctus ultricies. Orci
			varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ornare nisi vitae est
			convallis, at maximus erat faucibus. Cras tempor velit ac condimentum consectetur. Donec tempor et lectus in
			sodales. Nulla eget rhoncus ipsum. Nullam eu interdum odio. Nam sed mauris volutpat, mattis nunc ac, rutrum risus.
			Duis faucibus faucibus sem in accumsan. Nulla sodales ante magna, quis laoreet lectus ultricies non. Proin aliquet
			magna vel iaculis sagittis. Nulla ullamcorper nulla orci, ut volutpat turpis ultrices ut. Integer sed quam
			fermentum ligula varius ullamcorper non vel quam. Orci varius natoque penatibus et magnis dis parturient montes,
			nascetur ridiculus mus. Praesent in semper quam. Mauris eu justo vel leo sodales rutrum eu dictum magna. Sed
			hendrerit ex ac est iaculis vulputate.
		</blockquote>
		<p class="subtitle">Lorem ipsum</p>
		<blockquote class="blockquotes">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis nisi aliquet luctus ultricies. Orci
			varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ornare nisi vitae est
			convallis, at maximus erat faucibus. Cras tempor velit ac condimentum consectetur. Donec tempor et lectus in
			sodales. Nulla eget rhoncus ipsum. Nullam eu interdum odio. Nam sed mauris volutpat, mattis nunc ac, rutrum risus.
			Duis faucibus faucibus sem in accumsan. Nulla sodales ante magna, quis laoreet lectus ultricies non. Proin aliquet
			magna vel iaculis sagittis. Nulla ullamcorper nulla orci, ut volutpat turpis ultrices ut. Integer sed quam
			fermentum ligula varius ullamcorper non vel quam. Orci varius natoque penatibus et magnis dis parturient montes,
			nascetur ridiculus mus. Praesent in semper quam. Mauris eu justo vel leo sodales rutrum eu dictum magna. Sed
			hendrerit ex ac est iaculis vulputate.
		</blockquote>
	</div>
</div>

<style>
	.about {
		width: calc(var(--size) * 0.8px);
		display: block;
		justify-content: center;
		margin: 5% 0px;
		color: white;
		padding: 30px;
		box-sizing: border-box;
		word-break: keep-all;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.subtitle {
		font-size: 2rem;
		font-weight: bold;
		margin: 10px 0;
	}

	.blockquotes {
		display: inline-block;
		margin-left: 1em;
	}
</style>
