<script>
	import { width as wd } from "./components/data/stores.js";
	import Carousel from "./components/lib/Carousel.svelte";
	let moveSlide;
	let count = 1;

	const graph = "/img/background/graph.png";
	const p1 =
		"Stockvity는 정형, 비정형 데이터를 모두 활용해 컨텐츠를 제작합니다.";
	const p2 =
		"기술분석 보고서, 공시정보, 상장기업 분석보고서 등의 비정형 데이터로부터 게임 내적으로 쓰이는 자연어 컨텐츠를 생성할 수 있을 뿐만 아니라 효과적인 전처리를 거쳐 감성 분석 등의 지표화를 거쳐 대략적인 결과를 예측할 수 있습니다.";
	const p3 =
		"이후 주가, 업종별지수 등의 정형 데이터를 통해 이벤트에 결과가 연동되므로, 사용자가 주식시장에서 실시간으로 일어난 사건의 인과관계를 학습할 수 있습니다.";
	const p4 = "Stockvity는 데이터 윤리를 준수해 수집한 데이터로 제작되었습니다.";
	const p5 =
		"StockVity의 데이터를 생성하는 파이프라인의 결과물은 고객사의 니즈에 따라 유연하게 변형시킬 수 있습니다.";
	const p6 =
		"StockVity와 같은 기능성게임 데이터로 활용할 수 있고 추가적인 글로벌 이벤트 변수 생성으로 상업용게임에 준하는 주식투자 게임을 제작할 가능성이 있습니다. 또한, 증가하는 금융교육 수요에 맞춰 학습 교재 및 컨텐츠 제작에 사용할 수 있습니다.";
	const p7 =
		"이 모든 활용에서 StockVity가 가지는 가장 명확한 장점은 주식시장을 실시간 반영한 데이터로 예측이 어려운 주식시장 그대로를 학습할 수 있다는 것입니다.";
</script>

<div id="about" class="about">
	<!--HEADER-->
	<p class="temp larger font-bold gray">ABOUT STOCKVITY</p>
	<!--CAROUSEL FRAME-->
	<div
		id="image"
		class="bg-black overflow-hidden w-full h-full flex flex-col items-center image"
	>
		<div id="container" class="relative h-full">
			<Carousel {count} width={$wd * 0.94} bind:moveSlide show_control={true}>
				{#each new Array(1) as a, i}
					<div
						id="item-{i}"
						class="relative w-full bg-white text-gray flex flex-row justify-center items-center gap-4 px-4"
						on:dblclick={() => moveSlide(-1)}
					>
						<img src={graph} alt="graph" />
					</div>
				{/each}
			</Carousel>
		</div>
	</div>
	<!--ABOUTS-->
	<div id="body" class="temp">
		<p class="subtitle large">데이터 처리 과정</p>
		<blockquote class="blockquotes">
			<p class="text">{p1}</p>
			<p class="text gray">{p2}</p>
			<p class="text gray">{p3}</p>
			<p class="text gray">{p4}</p>
		</blockquote>
		<p class="subtitle">활용 방안과 사업 모델</p>
		<blockquote class="blockquotes">
			<p class="text">{p5}</p>
			<p class="text gray">{p6}</p>
			<p class="text gray">{p7}</p>
		</blockquote>
	</div>
</div>

<style>
	.about {
		width: calc(var(--size) * 1px);
		display: block;
		justify-content: center;
		align-items: center;
		color: white;
		font-family: "roboto", "sans-serif";
		padding: 1rem 0;
		box-sizing: border-box;
		word-break: keep-all;
		gap: 2rem;
	}

	#image {
		width: calc(var(--size) * 1px);
		height: calc(var(--size) * 0.5225px);
		margin: 2rem 0;
	}

	#container {
		width: 94%;
		height: 100%;
	}

	.subtitle {
		font-size: 3rem;
		font-weight: bold;
		margin: 2rem 0;
	}

	.blockquotes {
		font-size: 2rem;
		display: inline-block;
		margin-left: 1em;
		margin-right: 15rem;
		padding: 0.5rem 0;
		line-height: 3.5rem;
	}

	.temp {
		padding: 1rem 3rem;
	}

	.gray {
		color: #aaa;
	}
</style>
