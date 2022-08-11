<script>
	import { onMount, afterUpdate } from "svelte";
	import ChartDoughnut from "../lib/ChartDoughnut.svelte";
	import Window from "../lib/Window.svelte";
	const pkg = {
		icon: "./img/icon/alt.png",
		title: "포트폴리오",
		left: 0,
		top: 0,
		bgcolor: "#b2b2b2",
	};

	const cash = JSON.parse(localStorage.getItem("cash"));
	const user = JSON.parse(localStorage.getItem("user"));
	const cash_assets = { id: "현금 자산", amount: cash.amount };
	const data = user
		.map((x) => {
			const amount = x.price * x.amount;
			return { id: x.name, amount: amount };
		})
		.filter((x) => x.amount > 0);
	data.push(cash_assets);
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

<div class="portmini">
	<Window {...pkg}>
		<div class="radius">
			<ChartDoughnut data={data_doughnut} />
		</div>
	</Window>
</div>

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
	.portmini {
		position: absolute;
		width: 25%;
		height: 60%;
		margin: 1%;
	}
</style>
