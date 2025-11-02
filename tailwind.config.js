/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,html}'
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Bebas Neue', 'sans-serif'],
                body: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}