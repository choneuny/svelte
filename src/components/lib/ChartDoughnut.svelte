<script>
	// @ts-nocheck
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";
	export let data;
	const option = {
		maintainAspectRatio: false,
		responsive: true,
		devicePixelRatio: 1.5,
		animations: {
			tension: {
				duration: 1000,
				easing: "linear",
				from: 1,
				to: 0,
			},
		},
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
	function renderChart() {
		const ctx = document.getElementById("chartdoughnut").getContext("2d");
		const chart = new Chart(ctx, {
			type: "doughnut",
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

<div class="doughnut rounded-xl overflow-hidden">
	<canvas id="chartdoughnut" />
</div>

<style>
	* {
		color: #000;
	}
	.doughnut {
		width: 100%;
		height: 100%;
	}
	canvas {
		width: 100%;
		height: 100%;
		background-color: inherit;
	}
</style>
