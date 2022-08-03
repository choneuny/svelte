const SetUserHistory = (userId, history) => {
	// const recordHistory = () => {
	// 	const tmp = [...history];
	// 	const temp = tmp[round];
	// 	const validname = validStock.map((x) => x.name);
	// 	console.log(validname);
	// 	for (let i of validname) {
	// 		const currentAmount = validStock.filter((x) => x.name === i)[0].amount;
	// 		temp.filter((x) => x.name === i)[0].amount *= 0;
	// 		temp.filter((x) => x.name === i)[0].amount += currentAmount;
	// 		console.log(temp);
	// 	}
	// 	console.log(tmp);
	// 	localStorage.setItem("history", JSON.stringify(tmp));
	// };
	// const temp = [...JSON.parse(localStorage.getItem("history"))];
	// const arr = temp[0].map((x) => {
	// 	return { name: x.name, data: [], amount: [] };
	// });
	// for (let i of temp) {
	// 	for (let j of arr) {
	// 		j.data.push(Math.floor(i.filter((x) => x.name === j.name).map((x) => x.price)[0]));
	// 		j.amount.push(i.filter((x) => x.name === j.name).map((x) => x.amount)[0]);
	// 	}
	// }
	// const newSeries = arr
	// 	.filter((x) => x.amount.reduce((accumulator, current) => accumulator + current, 0) !== 0)
	// 	.map((x) => {
	// 		return { name: x.name, data: x.data };
	// 	});
	// console.log(newSeries);
};

export default SetUserHistory;
