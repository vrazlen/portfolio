/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class', // Enables toggleable dark mode
    theme: {
        extend: {
            fontFamily: {
                // Implementing our font choices
                sans: ['"Instrument Sans"', ...defaultTheme.fontFamily.sans],
                display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Semantic color naming
                surface: {
                    50: '#f8fafc', // Slate 50
                    100: '#f1f5f9',
                    900: '#0f172a',
                    950: '#020617',
                },
                accent: {
                    DEFAULT: '#6366f1', // Indigo 500
                    foreground: '#ffffff'
                }
            },
            animation: {
                'blob': 'blob 7s infinite', // For animated backgrounds
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
