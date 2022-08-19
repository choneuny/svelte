<script>
	import { onMount } from "svelte";
	import { background as bg } from "../data/GlovalVariable.js";
	import Newsmaster from "../data/Newsmaster.js";
	import { transaction, next_round, round } from "../data/stores.js";
	export let increasecount;
	let news, user, theme, history;
	const count = 2;
	const randompick = (arr) => {
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	};

	const reflect = () => {
		const infl = Object.values(news).reduce((total, current) => {
			current.forEach((x) => {
				console.log(x);
				const infl_list = x.infl.split("-");
				infl_list.forEach((y) => total.push({ infl: y, fluct: x.fluct }));
			});
			console.log(total);
			return total;
		}, []);
		user.forEach((x) => (x.fluct = 1));
		infl.forEach(
			(x) => (user.find((y) => y.name === x.infl).fluct += x.fluct * 0.01)
		);
		user.forEach((x) => (x.price = x.price * x.fluct));
	};

	const news_generator = () => {
		const have_any = theme.filter(
			(x) => !user.filter((y) => y.theme === x.theme).some((y) => y.amount > 0)
		);
		have_any.forEach((x) => {
			x.checked = false;
			x.fixed = false;
		});
		let unchosen = have_any.filter((x) => !x.checked).map((x) => x.theme);
		if (unchosen.length < count) {
			unchosen.push(
				randompick(theme.filter((x) => x.checked).map((x) => x.theme))
			);
		} else {
			unchosen = unchosen.sort(() => 0.5 - Math.random()).slice(0, count);
		}
		const newsarray = unchosen.map((x) =>
			randompick(Newsmaster.filter((y) => !y.corp && y.theme === x))
		);

		news.news = newsarray;
	};

	onMount(() => {
		news = JSON.parse(localStorage.getItem("news"));
		user = JSON.parse(localStorage.getItem("user"));
		theme = JSON.parse(localStorage.getItem("theme"));
		history = JSON.parse(localStorage.getItem("history"));
		console.log("before: ", history);
		console.log("transaction :", $transaction);
		$transaction.forEach((x) => {
			user.find((y) => y.name === x.name).amount += Number(x.amount);
			user.find((y) => y.name === "cash").amount -=
				Number(x.amount) * Number(x.price);
		});

		console.log(news);
		console.log(Object.values(news));

		reflect();
		news_generator();

		history.push(user);
		console.log("news is ", news);
		console.log("user is ", user);
		console.log("theme is ", theme);
		console.log("history is ", history);
		localStorage.setItem("news", JSON.stringify(news));
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("theme", JSON.stringify(theme));
		localStorage.setItem("history", JSON.stringify(history));
	});

	setTimeout(() => {
		next_round();
		console.log("round is", $round);
		increasecount();
	}, 2000);
</script>

<div style={bg.roundclear} />

<style>
	div {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
</style>
