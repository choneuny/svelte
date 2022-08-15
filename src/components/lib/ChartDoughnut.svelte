<script>
	// @ts-nocheck

	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";
	export let data;
	let total = data.datasets[0].data.reduce((a, b) => a + b);
	const option = {
		maintainAspectRatio: false,
		responsive: true,
		devicePixelRatio: 1.5,
		plugins: {
			legend: {
				display: false, //This will do the task
			},
			title: {
				display: true,
				text: "자산 비중",
				font: {
					size: 30,
					family: "Galmuri11",
					weight: "bold",
				},
			},
			datalabels: {
				align: "center",
				textAlign: "center",
				formatter: (val, ctx) => {
					// Grab the label for this value
					const label = ctx.chart.data.labels[ctx.dataIndex];

					// Format the number with 2 decimal places
					const formattedVal = Intl.NumberFormat("en-US", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					}).format(val);

					// Put them together
					return `${label} \n ${formattedVal}`;
				},
				labels: {
					title: {
						color: "black",
					},
					value: {
						color: "black",
					},
				},
				font: {
					family: "Galmuri11",
					size: 16,
					weight: 600,
				},
			},
		},
	};
	const plugin = {
		ChartDataLabels,
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
			plugins: [ChartDataLabels],
			options: option,
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
	<!-- <div id="chartjs-tooltip">
		<div>
			<p>Total : <br /></p>
			<p class="text-4xl">{total}</p>
			<p>$$</p>
		</div>
	</div> -->
</div>

<style>
	* {
		color: #000;
	}

	.doughnut {
		position: relative;
		background-color: inherit;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	/* 
	#chartjs-tooltip {
		left: 0;
		top: 12%;
		font-family: Arial, sans-serif;
		font-style: normal;
		right: 0;
		display: flex;
		justify-content: center;
		position: absolute;
		z-index: -3;
		height: 100%;
		padding: 0;
		align-items: center;
		color: gray;
		font-size: 20px;
	} */
	canvas {
		width: 100%;
		height: 100%;
		background-color: inherit;
	}
</style>
