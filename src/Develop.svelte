<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";
	onMount(async () => {});
	const proportion = [
		{ id: 0, symbol: "웹투니움", value: 50, dashboard: 520 },
		{ id: 1, symbol: "센서베스", value: 100, dashboard: 470 },
		{ id: 2, symbol: "애드", value: 250, dashboard: 220 },
		{ id: 999, symbol: "현금", value: 120, dashboard: 100 },
	];
	function renderChart() {
		// @ts-ignore
		let canvas = document.querySelector("#myChart");
		console.log(canvas);
		let ctx = canvas.getContext("2d");
		console.log(ctx);
		let chart = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: proportion.map((x) => x.symbol),
				datasets: [
					{
						label: "dataset",
						backgroundColor: [...Array(proportion.length)].map(
							(_) => "#" + Math.round(Math.random() * 0xffffff).toString(16)
						),
						data: proportion.map((x) => x.value),
					},
				],
			},
			options: {},
		});
	}
	let page = "balance";
	const total_asset = [100, 220, 440, 280, 520];
	let total_value = proportion.reduce((acc, curr) => {
		return acc + curr.value;
	}, 0);
	let highest = Math.max(...total_asset);
	let most = proportion.reduce((prev, current) => {
		return prev.value > current.value ? prev : current;
	});
	$: most = proportion.reduce((prev, current) => {
		return prev.value > current.value ? prev : current;
	});
	console.log(total_value);
	console.log(most);
	console.log(highest);
</script>

<div class="main-container">
	<div class="year-stats">
		{#each total_asset as asset, i}
			<div class="month-group">
				<div class="bar" style="--height:{asset / highest}" />
				<p class="month">{asset}</p>
			</div>
		{/each}
	</div>

	<div class="stats-info">
		<canvas id="myChart" />
		<p>Total: {total_value}$</p>

		<div class="info">
			<p>총 자산<br /><span>{total_value} $$</span></p>
			<p>
				현금 / 주식<br /><span
					>{proportion.filter((x) => x.id == 999)[0].value} / {total_value -
						proportion.filter((x) => x.id == 999)[0].value} $$</span
				>
			</p>
			<p>가장 높은 비중<br /><span>{most.symbol}</span></p>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	.main-container {
		font-family: "Roboto", sans-serif;
		background: #444e80;
		color: #abafc6;
		border-radius: 5px;
		padding: 20px;
		width: 800px;
		height: 600px;
	}

	.year-stats {
		white-space: nowrap;
		max-height: 170px;
		overflow: hidden;
	}

	.year-stats:hover {
		overflow-x: auto;
	}

	.month-group {
		cursor: pointer;
		max-width: 400px;
		height: 110px;
		margin: 10px;
		display: inline-block;
	}

	.bar {
		background-color: #abafc6;
		width: 20px;
		height: calc((var(--height) * 100px));
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.month-group:hover .bar {
		background: #5397d6;
	}

	.month-group:hover p {
		color: #fff;
	}

	.stats-info {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}

	.info p {
		margin-bottom: 10px;
	}

	.info span {
		color: #fff;
	}
</style>
