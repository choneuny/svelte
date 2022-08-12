<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	export let data;
	const option = {
		maintainAspectRatio: false,
		responsive: true,
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
						size: 15,
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false, //This will do the task
			},
			title: {
				display: true,
				text: "자산 현황",
				font: {
					size: 30,
				},
			},
		},
	};
	function renderChart() {
		// @ts-ignore
		const ctx = document.getElementById("chartbar").getContext("2d");
		const chart = new Chart(ctx, {
			type: "bar",
			data: data,
			options: option,
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
		font-size: 40px;
	}

	.chartbar {
		width: 100%;
		height: 100%;
	}

	canvas {
		width: 100%;
		height: 100%;
		background: #fff;
	}
</style>
