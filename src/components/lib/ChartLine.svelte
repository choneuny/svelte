<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";
	import { width as wd } from "../data/stores";
	export let data;
	const rem = $wd * 0.008;
	const option = {
		maintainAspectRatio: false,
		devicePixelRatio: 2,
		scales: {
			xAxes: {
				offset: true,
				ticks: {
					font: {
						family: "Galmuri11",
						color: "#969696",
						size: rem * 1.5,
						weight: "bold",
					},
				},
				grid: {
					display: false,
				},
			},
			yAxes: {
				beginAtZero: true,
				ticks: {
					font: {
						family: "Galmuri11",
					},
					color: "#969696",
					display: true,
				},
				grid: {
					display: true,
				},
			},
			title: {
				display: false,
			},
		},
		plugins: {
			datalabels: {
				align: "start",
				textAlign: "center",
				display: "auto",
				formatter: (val, ctx) => {
					// Grab the label for this value
					const label = ctx.chart.data.datasets[ctx.datasetIndex].label;

					// Format the number with 2 decimal places
					const formattedVal = Intl.NumberFormat("en-US", {
						maximumFractionDigits: 2,
						minimumFractionDigits: 0,
					}).format(val);

					// Put them together
					return `${label}: ${formattedVal}`;
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
					size: rem,
					weight: 600,
				},
			},
			legend: {
				display: "auto",
			},
		},
	};
	function renderChart() {
		// @ts-ignore
		const ctx = document.getElementById("chartline").getContext("2d");
		const chart = new Chart(ctx, {
			type: "line",
			data: data,
			// @ts-ignore
			options: option,
			plugins: [ChartDataLabels],
		});
	}
	afterUpdate(() => {
		setTimeout(() => {
			renderChart();
		}, 500);
	});
</script>

<div class="chartline rounded-xl overflow-hidden">
	<canvas id="chartline" />
</div>

<style>
	* {
		color: #000;
		font-size: 3rem;
		--size: 100%;
	}

	.chartline {
		width: 100%;
		height: 100%;
	}

	canvas {
		background: #fff;
	}
</style>
