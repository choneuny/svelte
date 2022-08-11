<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	export let data;
	let total = data.datasets[0].data.reduce((a, b) => a + b);
	const chart_colors = ["#ff6384", "#36a2eb", "#2ab96a", "#e9c061", "#d95d6b", "#2b92d8", "#9173d8"];
	const option = {
		maintainAspectRatio: false,
		responsive: true,
		cutout: 96,
		devicePixelRatio: 2,
		plugins: {
			title: {
				display: true,
				text: "자산 비중",
				font: {
					size: 30,
				},
			},
		},
	};
	const plugin = {
		id: "custom_canvas_background_color",
		beforeDraw: (chart) => {
			const { ctx } = chart;
			ctx.save();
			ctx.globalCompositeOperation = "destination-over";
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, chart.width, chart.height);
			ctx.restore();
		},
	};
	function renderChart() {
		// @ts-ignore
		var ctx = document.getElementById("chartdoughnut").getContext("2d");
		var chart = new Chart(ctx, {
			type: "doughnut",
			data: data,
			options: option,
			plugins: [plugin],
		});
	}
	afterUpdate(() => {
		setTimeout(() => {
			renderChart();
		}, 200);
	});
</script>

<div class="doughnut rounded-xl">
	<canvas id="chartdoughnut" />
	<div id="chartjs-tooltip">
		<div>
			<p>Total : <br /></p>
			<p class="text-4xl">{total}</p>
			<p>$$</p>
		</div>
	</div>
</div>

<style>
	* {
		color: #000;
	}

	p {
		display: inline;
	}
	.doughnut {
		position: relative;
		background-color: inherit;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	#chartjs-tooltip {
		left: 0;
		top: 12%;
		font-family: Arial, sans-serif;
		font-style: normal;
		right: 0;
		display: flex;
		justify-content: center;
		position: absolute;
		z-index: 0;
		height: 100%;
		padding: 0;
		align-items: center;
		color: gray;
		font-size: 20px;
	}
	canvas {
		width: 100%;
		height: 100%;
		background-color: inherit;
	}
</style>
