<script>
	import { image } from "../data/GlovalVariable.js";
	import ChartDonut from "../lib/ChartDonut.svelte";
	import Window from "../lib/Window.svelte";
	import { width as wd } from "../data/stores.js";
	const styles = {
		width: $wd * 0.25,
		height: $wd * 0.32,
		left: $wd * 0.01,
		top: $wd * 0.01,
		title: "포트폴리오",
		icon: image.chart,
		bgcolor: "#f5f5f5",
	};
	const chart_colors = ["#ff6384", "#36a2eb", "#2ab96a", "#e9c061", "#9173d8"];
	const user = JSON.parse(localStorage.getItem("user"));
	const data = user
		.map((x) => {
			const amount = x.price * x.amount;
			return { id: x.name === "cash" ? "현금" : x.name, amount: amount };
		})
		.filter((x) => x.amount > 0);
	console.log(data);
	const data_doughnut = {
		labels: data.map((x) => x.id),
		datasets: [
			{
				data: data.map((x) => x.amount),
				backgroundColor: chart_colors,
			},
		],
	};
</script>

<Window {styles}>
	<div id="pflmini_donut" class="radius">
		<ChartDonut data={data_doughnut} before="mini" />
	</div>
</Window>

<style>
	* {
		color: #000;
	}

	.radius {
		width: 98%;
		height: 98%;
		border: 1px solid transparent;
		border-radius: 1rem;
		box-shadow: var(--deep-shadow);
		padding: 3%;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>
