const bg_cover = (x) =>
	"background:url(img/background/" + x + ") no-repeat; background-size:cover;";

const gloval_variable = {
	image: {
		alt: "img/icon/alt.png",
		brickwall: "img/background/brickwall.webp",
		fairy: "img/icon/StockVity.svg",
		webtoon: "img/icon/webtoon.svg",
		adtech: "img/icon/adtech.svg",
		robot: "img/icon/robot.svg",
		sensor: "img/icon/sensor.svg",
		internet: "img/icon/internet.svg",
		settings: "img/icon/settings.svg",
		card_back: "img/icon/card_back.svg",
		next: "img/icon/next.svg",
		close: "img/icon/close.svg",
		history: "img/icon/history.svg",
		translate: "img/icon/translation_icon.svg",
		fullscreen: "img/icon/fullscreen.svg",
		down_arrow: "img/icon/downward_arrow.png",
		chart: "img/icon/chart.png",
		taptostart: "img/taptostart.png",
		title: "img/title.png",
		krx: "img/icon/krx.svg",
		krx_logo: "img/icon/krx_logo.svg",
		teacher: "img/icon/teacher.svg",
		goodbye: "img/icon/goodbye.png",
	},
	background: {
		brickwall: "img/background/brickwall.webp",
		announce: bg_cover("announce.svg"),
		newspaper: bg_cover("newspaper.png"),
		intro: bg_cover("intro.gif"),
		gradient: bg_cover("gradient.svg"),
		desk: bg_cover("desk.png"),
		roundclear: bg_cover("sunset.gif"),
		monitor: bg_cover("monitor.png"),
		headeralt: bg_cover("headeralt.png"),
	},
};

export default gloval_variable;
export const image = gloval_variable.image;
export const background = gloval_variable.background;
