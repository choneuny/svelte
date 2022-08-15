import { derived, writable } from "svelte/store";

let apps = ["chart", "news", "stock", "develop", "history"];
let stocks = [
	{
		id: 0,
		theme: "webtoon",
		name: "가이드미디어",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 1,
		theme: "webtoon",
		name: "웹투니움",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 2,
		theme: "robot",
		name: "비쥬얼비트",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 3,
		theme: "robot",
		name: "엑스텍콘",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 4,
		theme: "adtech",
		name: "크로크스",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 5,
		theme: "adtech",
		name: "트렌트마케팅",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 6,
		theme: "sensor",
		name: "데브센스",
		amount: 0,
		price: 100,
		fluct: 1,
	},
	{
		id: 7,
		theme: "sensor",
		name: "센서베스",
		amount: 0,
		price: 100,
		fluct: 1,
	},
];
export const stock_store = writable(stocks);
export const round = writable(0);
export const pfl_page = writable("chart");
export const switch_page = (page) => pfl_page.update((value) => page);
export const next_round = () => round.update((x) => x + 1);
