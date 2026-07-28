/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#070B14", // Rich Charcoal/Navy Black
                secondary: "#0F1626", // Dark Slate/Glass base
                accent: "#14F1D9", // Cyber Teal/Cyan Accent
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Space Grotesk', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
