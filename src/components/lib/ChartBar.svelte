<script>
	// @ts-nocheck
	import { afterUpdate } from "svelte";
	import { width as wd } from "../data/stores";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";
	export let data;
	const rem = $wd * 0.008;
	const option = {
		responsive: true,
		maintainAspectRatio: false,
		devicePixelRatio: 2,
		scales: {
			title: {
				display: false,
			},
			y: {
				stacked: true,
				beginAtZero: true,
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
			},
			x: {
				stacked: true,
				grid: {
					display: true,
				},
				ticks: {
					font: {
						family: "Galmuri11",
						size: rem,
						weight: "bold",
					},
				},
			},
		},
		plugins: {
			datalabels: {
				display: function (context) {
					return context.dataset.data[context.dataIndex] > 200; // or >= 1 or ...
				},
				color: "blue",
				formatter: (val, ctx) => {
					// Grab the label for this value
					const label = ctx.chart.data.datasets[ctx.datasetIndex].label;
					// console.log(label);
					// const label = ["현금", "주식"];
					// Format the number with 2 decimal places
					const formattedVal = Intl.NumberFormat("en-US", {
						maximumFractionDigits: 1,
						minimumFractionDigits: 0,
					}).format(val);

					// Put them together
					return `${label} \n\n ${formattedVal}`;
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
				display: false, //This will do the task
			},
			title: {
				display: true,
				text: "자산 현황",
				font: {
					family: "Galmuri11",
					size: rem * 2,
					weight: "bold",
				},
			},
		},
	};
	function renderChart() {
		const ctx = document.getElementById("chartbar").getContext("2d");
		const chart = new Chart(ctx, {
			type: "bar",
			data: data,
			options: option,
			plugins: [ChartDataLabels],
		});
	}
	afterUpdate(() => {
		setTimeout(() => {
			renderChart();
		}, 200);
	});
</script>

<div class="chartbar rounded-xl overflow-hidden">
	<canvas id="chartbar" />
</div>

<style>
	* {
		color: #000;
		font-size: 3rem;
	}
	.chartbar {
		width: 100%;
		height: 100%;
	}
	canvas {
		width: 100%;
		height: 100%;
		background-color: inherit;
	}
</style>
