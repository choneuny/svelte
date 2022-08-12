<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	export let data;
	const option = {
		maintainAspectRatio: false,
		devicePixelRatio: 2,
		scales: {
			xAxes: {
				offset: true,
				ticks: {
					font: {
						color: "#969696",
						size: 20,
					},
				},
				grid: {
					display: false,
				},
			},
			yAxes: {
				beginAtZero: true,
				ticks: {
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
			legend: {
				display: true,
			},
		},
	};
	function renderChart() {
		// @ts-ignore
		const ctx = document.getElementById("chartline").getContext("2d");
		const chart = new Chart(ctx, {
			type: "line",
			data: data,
			options: option,
		});
	}
	afterUpdate(() => {
		setTimeout(() => {
			renderChart();
		}, 1000);
	});
</script>

<div class="chartline rounded-xl overflow-hidden">
	<canvas id="chartline" />
</div>

<style>
	* {
		color: #000;
		font-size: 40px;
	}

	.chartline {
		width: 100%;
		height: 100%;
	}

	canvas {
		background: #fff;
	}
</style>
