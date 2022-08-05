<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";
	onMount(async () => {});
	function renderChart() {
		let color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
		// @ts-ignore
		var ctx = document.getElementById("myChart").getContext("2d");
		var chart = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "My First dataset",
						backgroundColor: [...Array(7)].map((_) => "#" + Math.round(Math.random() * 0xffffff).toString(16)),
						data: [0, 10, 5, 2, 20, 30, 45],
					},
				],
			},
			options: {},
		});
	}
</script>

<button on:click={renderChart}>Load</button>
<canvas id="myChart" />
