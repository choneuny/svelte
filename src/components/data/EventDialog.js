const EventDialog = {
	cardboard: [{ queue: 0, text: "새 산업을 고를 시간이야!" }],
	corpboard: [{ queue: 0, text: "이제 돈을 써 보자구!" }],
	newspaper: [{ queue: 0, text: "보고서가 도착했어!" }],
	transaction: [{ queue: 0, text: "오늘은 이걸로 끝이야. 결과는 다음에 확인해 보자." }],
	roundstart: [
		{ queue: 0, text: "잘 지냈어?" },
		{ queue: 1, text: "공시의 영향으로 주가가 오르내렸어. 여기 설명도 읽어 봐." },
	],
	result: [
		{ queue: 0, text: "그러면 해당 종목의 주가가 어떻게​ 변동했는지 확인해 볼까?!" },
		{ queue: 1, text: "이제 내 잔고를 확인해보자! 얼마나 현명한 판단을 내렸을까?!" },
		{
			queue: 2,
			text: "이제 내가 보유하고 있는 종목들이 또 어떻게 변했는지 살펴볼까? 공시를 잘 읽고 좋은 판단을 내리기 바래!",
		},
	],
	newone: [
		{
			queue: 0,
			text: "​이번에는 요즘 새롭게 뜨는 산업에 대한 뉴스를 살펴볼게! \r\n관련된 기업의 공시도 꼼꼼하게 읽어보고  ​\r\n좋은 판단을 내리기 바랄게!",
		},
		{ queue: 1, text: "이번에는 어떤지 볼까?!" },
	],
};

export default EventDialog;
