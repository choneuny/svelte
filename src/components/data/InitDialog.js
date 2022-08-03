const InitDialog = {
	room: [
		{
			queue: 0,
			text: "안녕! 나는 거래소 요정 Stock-Vity라고 해! \r\n주식때문에 골치가 아프다고? 그럴수록 기본이 중요한 법! ​\r\n기업의 공시를 잘 살펴보면 주가를 더 잘 이해할 수 있게 될 거야!",
		},
		{ queue: 1, text: "자, 이제부터 나와 게임을 시작할 거야. \r\n첫 판은 연습! \r\n시작해볼까?!" },
	],
	cardboard: [{ queue: 0, text: "살 주식을 고를 시간이야. \r\n네가 익숙한 산업을 골라!" }],
	corpboard: [
		{ queue: 0, text: "이제 진짜로 돈을 써 보자구! \r\n투자할 회사를 테마당 하나씩 골라." },
		{ queue: 1, text: "딱 열 개만 골라봐! \r\n예산은 하나당 백 만원씩, 총 천 만원이라고 치자." },
	],
	newspaper: [
		{ queue: 0, text: "보고서가 도착했어!" },
		{ queue: 1, text: "네가 투자한 회사에서 실제로 발표했던 내용이야." },
		{ queue: 2, text: "공시 발표 이후 주가가 20%이상 상승하거나 하락했어." },
	],
	transaction: [
		{ queue: 0, text: "지금 현금이 1000만원 남았지? 한도 안에서 '추가매수'를 할 수 있어!" },
		{
			queue: 1,
			text: "물론 '보유', '매도' 를 선택할 수도 있고​    \r\n다른 산업을 확인하고 주식을 매수 할 수도 있으니 현금은 남겨두길 바래!",
		},
	],
	roundclear: [],
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

export default InitDialog;
