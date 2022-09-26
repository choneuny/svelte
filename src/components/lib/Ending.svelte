<script>
	import { onMount } from "svelte";
	import { image, background as bg } from "../data/GlobalVariable.js";
	import Typer from "./Typer.svelte";
	import html2canvas from "html2canvas";
	const user = JSON.parse(localStorage.getItem("user"));
	const history = JSON.parse(localStorage.getItem("history"));
	const money = user.reduce((total, cur) => total + cur.price * cur.amount, 0);
	const exclame = money > 3000 ? "대단해!" : "";
	let isopen = false;
	let dialog = [
		{
			queue: 0,
			text: exclame + " 자금을 " + money + " 만원으로 만들었어!",
		},
		{
			queue: 1,
			text: "결과에 자신이 있다면 우리에게도 보여줘!",
		},
		{
			queue: 2,
			text: "카카오톡 채널에서 '스탁비티' 를 검색하면 우리를 찾을 수 있어. ",
		},
		{
			queue: 3,
			text: "놀라운 결과를 캡쳐해서 보내준 사람들을 뽑아 스타벅스 기프티콘도 주기로 했다구!!",
		},
		{
			queue: 4,
			text: "그러면 다음에 또 만나! ",
		},
	];

	function capture() {
		html2canvas(document.querySelector("#capture")).then((canvas) =>
			canvas.toBlob((blob) =>
				navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
			)
		);
		setTimeout(() => {
			alert("캡쳐되었습니다! 카카오톡 채널로 이동합니다.");
			window.open("https://pf.kakao.com/_SxdPExj/chat");
		}, 500);
	}

	onMount(() => {
		isopen = true;
	});
</script>

s
<div id="capture" class="bg" style={bg.roundclear}>
	{#if isopen}
		<Typer bind:dialog bind:isopen />
	{:else}
		<!-- <img class="title nodrag blink not" src={image.goodbye} alt="good bye" /> -->
		<div class="title">
			<div on:click={capture}>
				<p class="text large">
					당신의 결과 : {money}만원!
				</p>
				<p class="text larger">스탁비티 채널로 가기</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 98;
		top: 0;
	}
	.title {
		left: calc(var(--size) * 0.22px);
		top: calc(var(--size) * 0.05px);
		width: calc(var(--size) * 0.5px);
		height: calc(var(--size) * 0.43px);
		display: flex;
		position: absolute;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text {
		font-family: roboto, Courier, monospace;
		font-weight: 600;
		color: aliceblue;
	}
</style>
