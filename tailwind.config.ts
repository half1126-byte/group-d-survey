import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "deep-navy": "#1e293b", // Slate 800
                "deep-navy-light": "#334155", // Slate 700 - for cards/hover
                "teal": {
                    DEFAULT: "#14b8a6", // Bright Teal for Dark Mode
                    50: "#f0fdfa",
                    100: "#ccfbf1", // Hover text
                    200: "#99f6e4",
                    300: "#5eead4",
                    400: "#2dd4bf",
                    500: "#14b8a6",
                    600: "#0d9488",
                    700: "#0f766e",
                },
                "background-gray": "#1e293b", // Override to Navy
            },
            fontFamily: {
                sans: ["var(--font-noto-sans-kr)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
