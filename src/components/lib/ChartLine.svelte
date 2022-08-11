<script>
	import { afterUpdate } from "svelte";
	import Chart from "chart.js/auto";
	const chart_colors = ["#ff6384", "#36a2eb", "#2b92d8", "#2ab96a", "#e9c061", "#d95d6b", "#9173d8"];
	const data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: chart_colors[0],
				borderColor: chart_colors[0],
				data: [65, 59, 80, 81, 56, 55, 40],
				pointRadius: 6,
				hoverRadius: 12,
				borderWidth: 3,
				pointBorderRadius: 4,
				pointBorderColor: "#fff",
			},
			{
				label: "My Second dataset",
				backgroundColor: chart_colors[1],
				borderColor: chart_colors[1],
				data: [28, 48, 40, 19, 86, 27, 90],
				pointRadius: 6,
				hoverRadius: 12,
				borderWidth: 3,
				pointBorderRadius: 4,
				pointBorderColor: "#fff",
			},
		],
	};
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
