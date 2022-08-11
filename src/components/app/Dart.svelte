<script>
	import Window from "../lib/Window.svelte";
	const pkg = {
		func: null,
		icon: "null",
		title: "인터넷",
	};
	let side = 0;
	let change = () => {
		console.log(side);
		side = side ? 0 : 1;
		console.log(side);
	};
</script>

<Window {...pkg}>
	<div class="dart">
		<div class="header">
			<img src="./img/icon/dart.png" alt="error!" />
			<span>
				<h1>(주)웹투니움</h1>
			</span>
		</div>
		<div class="content">
			<label class="carousel">
				<input type="button" on:click={change} />
				<slot />
			</label>
		</div>
	</div>
</Window>

<style>
	* {
		color: #000;
	}

	label:hover {
		filter: brightness(60%);
	}

	input {
		display: none;
	}

	h1 {
		text-align: center;
		display: inline-block;
	}
	.dart {
		width: 800px;
		height: 600px;
		padding: 10px;
		gap: 10px;
		box-sizing: border-box;
		display: grid;

		grid-template-rows: 0.5fr 2fr;
	}

	.header {
		width: 100%;
		height: 0.5fr;
		border: 1px solid transparent;
		border-radius: 8px;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
		background-color: #1975db;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.carousel {
		width: 200%;
		height: 100%;
		padding: 0;
		border: 0;
		display: flex;
		flex-direction: row;
		z-index: 999;
		border: 1px solid transparent;
		border-radius: 8px;
		box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
	}

	.content {
		overflow: hidden;
	}
</style>
