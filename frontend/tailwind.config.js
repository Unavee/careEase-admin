/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'black' },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        typewriter: 'typewriter 3s steps(30) 1s 1 normal both',
        blink: 'blink 0.5s step-end infinite alternate',
        "fade-in": "fadeIn 3s ease-in-out",
      },
      backdropBlur: {
        sm: "4px",
        md: "10px",
        lg: "20px",
      },
      colors: {
        primary: {
          blue: '#5DADE2', // Main Blue
          green: '#8BC53F', // Main Green
        },
        neutral: {
          white: '#FFFFFF', // Background and light sections
          gray: '#F5F5F5', // Light gray for sections
          dark: '#222222', // Dark text and headings
        },
        accent: {
          hoverBlue: '#008CBF', // Darker shade of blue for hover
          hoverGreen: '#6CA82F', // Darker shade of green for hover
          line: '#D1D5DB', // Line separators
        },
      },
    },
  },
  plugins: [],
}

