<script>
	import { image } from "../data/GlovalVariable.js";
	import ChartDoughnut from "../lib/ChartDoughnut.svelte";
	import Window from "../lib/Window.svelte";
	import app_styles from "../lib/__AppStyles";
	const mystyle = {
		width: 400,
		height: 500,
		left: 20,
		top: 20,
		title: "포트폴리오",
		icon: image.chart,
		bgcolor: "#f5f5f5",
	};
	const styles = Object.assign(app_styles, mystyle);

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
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};
</script>

<Window {styles}>
	<div class="radius">
		<ChartDoughnut data={data_doughnut} />
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
		border-radius: 20px;
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2), 4px 8px 8px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2), 16px 32px 32px rgba(0, 0, 0, 0.2);
		padding: 3%;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>
