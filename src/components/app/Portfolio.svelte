<script>
	import ChartDoughnut from "../lib/ChartDoughnut.svelte";
	import ChartBar from "../lib/ChartBar.svelte";
	import ChartLine from "../lib/ChartLine.svelte";
	import Window from "../lib/Window.svelte";
	const pkg = {
		icon: "./img/icon/chart.png",
		title: "포트폴리오",
		left: 0,
		top: 0,
		bgcolor: "#b2b2b2",
	};
	const cash = JSON.parse(localStorage.getItem("cash"));
	const user = JSON.parse(localStorage.getItem("user"));
	const cash_assets = { id: "현금 자산", amount: cash.amount };
	const doughnut = user
		.map((x) => {
			const amount = x.price * x.amount;
			return { id: x.name, amount: amount };
		})
		.filter((x) => x.amount > 0)
		.push(cash_assets);
	const data_doughnut = {
		labels: doughnut.map((x) => x.id),
		datasets: [
			{
				data: doughnut.map((x) => x.amount),
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};
	const bar =
</script>

<div class="portfolio">
	<Window {...pkg}>
		<div class="chartbox">
			<div class="radius rounded-xl">
				<ChartDoughnut data={data_doughnut} />
			</div>
			<div class="radius rounded-xl">
				<ChartBar />
			</div>
			<div class="radius rounded-xl col-span-full">
				<ChartLine />
			</div>
			<p class="radius rounded-lg col-span-full text-3xl p-2 bg-white border-2 border-[#323232] border-inset">
				(주)웹투니움 $80 -20%
			</p>
			<p class="radius rounded-lg col-span-full text-3xl p-2 bg-white border-2 border-[#323232] border-inset">
				(주)센서비스 $120 +20%
			</p>
		</div>
	</Window>
</div>

<style>
	* {
		color: #000;
		text-align: center;
	}

	.radius {
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), 2px 4px 4px rgba(0, 0, 0, 0.2), 4px 8px 8px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2);
	}

	.portfolio {
		position: absolute;
		width: 50%;
		height: 90%;
		margin: 1%;
	}

	.chartbox {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: fit-content(90%);
		gap: 20px;
		justify-content: center;
		padding: 10px 20px;
		box-sizing: border-box;
	}
</style>
