<script>
	import { onMount } from 'svelte';
  import Chart from 'chart.js/auto/auto.js'
  export let chartData;
  export let dataKeys;

  let numLines = dataKeys.length;
	let chartValues = chartData.map(x => x.map(y => y.value));
	let chartLabels = chartData.map(x => x.label);
	let ctx;
	let chartCanvas;

  onMount(async (promise) => {
		  ctx = chartCanvas.getContext('2d');
			var chart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: chartLabels,
						datasets: [{
								label: 'Revenue',
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: chartValues
						}]
				}
		});
  });
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>