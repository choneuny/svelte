import Newsmaster from "../data/Newsmaster.js";

const SetCurrentNews = () => {
	const userstock = JSON.parse(localStorage.getItem("user"));
	const validStock = userstock.filter((item) => item.amount > 0);
	const validCorpname = validStock.map((item) => item.name);

	let Newsarray = [];
	for (let corp of validCorpname) {
		const validNewses = Newsmaster.filter((x) => x.corp === corp);
		const picked = validNewses[Math.floor(Math.random() * validNewses.length)];
		Newsarray.push(picked);
	}
	localStorage.setItem("news", JSON.stringify(Newsarray));
	const check = JSON.parse(localStorage.getItem("news"));
	return check;
};

export default SetCurrentNews;
