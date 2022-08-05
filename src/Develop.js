import Corpmaster from "./components/data/Corpmaster";

const Develop_set = () => {
	const theme = [
		{ id: "theme_01", theme: "webtoon", title: "웹툰", checked: false, fixed: false, icon: "./img/icon/webtoon.svg" },
		{
			id: "theme_02",
			theme: "robot",
			title: "로봇/데이터",
			checked: false,
			fixed: false,
			icon: "./img/icon/robot.svg",
		},
		{ id: "theme_03", theme: "adtech", title: "애드테크", checked: false, fixed: false, icon: "./img/icon/adtech.svg" },
		{
			id: "theme_04",
			theme: "sensor",
			title: "첨단 센서",
			checked: false,
			fixed: false,
			icon: "./img/icon/sensor.svg",
		},
	];
	const user = Corpmaster.map((x) => {
		return { id: x.id, theme: x.theme, name: x.name, amount: 0, price: x.price, fluct: 1 };
	});
	const history = [
		Corpmaster.map((x) => {
			return { id: x.id, theme: x.theme, name: x.name, amount: 0, price: x.price, fluct: 1 };
		}),
	];
	const Cash = { id: 999, amount: 2000, price: 1 };
	const news = [
		{
			id: 0,
			theme: "webtoon",
			corp: "가이드미디어",
			title: "주식등의 대량보유상황보고서",
			body: "- 대량보유자에 관한 사항 : 한국증권가치자산운용(주) - 구분 : 신규 - 보유주식등의 수 및 보유비율 : 5.03%",
			fluct: 20,
			why: "실제 사례로 보았을 때 디앤씨미디어는 2019년 11월 한국투자밸류자산운용의 지분 변동 공시가 있은 이후로 여러 증권사에서 기업 매수 레포트가 나오면서 2달 동안 70% 가량 상승하였다.",
			infl: "가이드미디어",
		},
		{
			id: 10,
			theme: "robot",
			corp: "비쥬얼비트",
			title: "유상증자 결정",
			body: "- 신주의 종류와 수 : 보통주식 2,589,445 - 증자전 발행주식총수 : 32,59,777 - 자금조달의 목적 : 운영자금 5,000,000,000 - 증자방식 : 제3자배정증자 - 보호예수기간 : 1년",
			fluct: 20,
			why: "재무건전성이 좋지 못한 기업의 유상증자 소문이 돌기 시작하면서부터 주가가 하락하는 경우가 많기 때문에 대부분의 투자자들은 유상증자를 달갑지 않게 받아들인다. 하지만 같은 유상증자라 하더라도 제3자배정증자는 시장에 긍정적인 시그널로 해석되는 경우가 많다. 기업의 사업내용에 대해 잘 이해하는 개인 혹인 기업들이 자발적으로 제3자배정을 받게 되는데, 거액의 자금으로 해당기업의 주식을 매수하는 주체가 있다는 것은 (유상증자일지라도) 일반투자자로 하여금 진행하고 있는 사업에 대한 기대감을 높이기 때문이다. 한가지 유의할 점은 제3자배정 유상증자 공시 이후 대금 납입이 정상적으로 이루어지지 않는 경우 주가에 큰 악재로 작용할 수 있기에 납입까지 확인해야 한다.",
			infl: "비쥬얼비트",
		},
	];
	theme[0].checked = true;
	theme[1].checked = true;
	user[0].amount = 7;
	user[2].amount = 5;
	const recodeHistory = () => {
		const tmp = [...history];
		const current = [...user];
		console.log(current);
		tmp.push(current);
		console.log(tmp);
		localStorage.setItem("history", JSON.stringify(tmp));
	};

	recodeHistory();
	localStorage.clear();
	localStorage.setItem("history", JSON.stringify(history));
	localStorage.setItem("news", JSON.stringify(news));
	localStorage.setItem("theme", JSON.stringify(theme));
	localStorage.setItem("cash", JSON.stringify(Cash));
	localStorage.setItem("user", JSON.stringify(user));
	console.log("Set Done");
};
export default Develop_set;
