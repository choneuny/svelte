import Corpmaster from "../data/Corpmaster.js";
import { image } from "../data/GlobalVariable.js";

const SetLocalStorage = () => {
	const theme = [
		{ id: "theme_01", theme: "webtoon", title: "웹툰", checked: false, fixed: false, icon: image.webtoon },
		{
			id: "theme_02",
			theme: "robot",
			title: "로봇/데이터",
			checked: false,
			fixed: false,
			icon: image.robot,
		},
		{ id: "theme_03", theme: "adtech", title: "애드테크", checked: false, fixed: false, icon: image.adtech },
		{
			id: "theme_04",
			theme: "sensor",
			title: "첨단 센서",
			checked: false,
			fixed: false,
			icon: image.sensor,
		},
	];
	const UserStock = Corpmaster.map((x) => {
		return { id: x.id, theme: x.theme, name: x.name, amount: 0, price: x.price, fluct: 1 };
	});
	const Cash = { id: 999, theme: "", name: "cash", amount: 1000, price: 1, fluct: 1 };
	const News = {
		announce: [],
		news: [],
	};
	UserStock.push(Cash);
	localStorage.clear();
	localStorage.setItem("news", JSON.stringify(News));
	localStorage.setItem("theme", JSON.stringify(theme));
	localStorage.setItem("user", JSON.stringify(UserStock));
	localStorage.setItem("history", JSON.stringify([UserStock]));
	console.log("Local Storage Set Done");
};
export default SetLocalStorage;
