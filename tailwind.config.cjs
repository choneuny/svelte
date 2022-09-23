module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				acrylic_black: "#000000cc",
				acrylic_white: "#ffffffcc",
				wooden: "#8d6e63",
				leaf_green: "#638D83",
				ash: "#5b5b5b",
			},
			typography: {
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
		},
	},
	plugins: [],
};
