/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#000010',
        'midnight-blue': '#0A0F2F',
        'cyber-navy': '#0D1B47',
        'neon-blue': '#0AE3FF',
        'electric-purple': '#6A4CFF',
      },
      fontFamily: {
        'heading': ['Poppins', 'Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'Urbanist', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(10, 227, 255, 0.5), 0 0 40px rgba(10, 227, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(106, 76, 255, 0.5), 0 0 40px rgba(106, 76, 255, 0.3)',
        'glow': '0 0 30px rgba(10, 227, 255, 0.6)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(10, 227, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(10, 227, 255, 0.8), 0 0 50px rgba(10, 227, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

