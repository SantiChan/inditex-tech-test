// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: ["col-start-1", "col-start-2", "col-start-3"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			gridTemplateColumns: {
				subgrid: "repeat(3, minmax(0, 1fr))",
			},
		},
	},
	plugins: [],
};

export default config;
