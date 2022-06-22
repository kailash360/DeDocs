module.exports = {
    content: [
        "./src/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/**/**/*.{js,jsx,ts,tsx}",
        "./index.html"
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#1B262C',
            secondary: '#0F4C75',
            tertiary: '#3282B8',
            white: '#fff',
            black: '#000'
        },
        fontFamily: {
            'poppins': ['Poppins']
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
    important: '#root'

}