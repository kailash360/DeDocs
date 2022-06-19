module.exports = {
    content: [
        "./src/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#1B262C',
            secondary: '#0F4C75',
            tertiary: '#3282B8',
            white: '#fff'
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
    important: '#root'

}