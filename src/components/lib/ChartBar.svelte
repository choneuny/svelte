<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	export let data = null;
	const chart_colors = ["#ff6384", "#36a2eb", "#2b92d8", "#2ab96a", "#e9c061", "#d95d6b", "#9173d8"];
	data = {
		labels: ["January", "February", "March", "April"],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: chart_colors[0],
				borderColor: chart_colors[0],
				data: [65, 59, 80, 81],
				datalabels: {
					align: "end",
					anchor: "start",
				},
			},
			{
				label: "My Second dataset",
				backgroundColor: chart_colors[1],
				borderColor: chart_colors[1],
				data: [28, 48, 40, 19],
				datalabels: {
					align: "end",
					anchor: "start",
				},
			},
		],
	};
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
			datalabels: {
				anchor: "end",
				align: "end",
				labels: {
					value: {
						color: "blue",
					},
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
		}, 1000);
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
