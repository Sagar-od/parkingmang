/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'park-gold': '#C5A059',
        'park-dark': '#0F172A',
        'park-accent': '#1E293B',
      },
      backgroundImage: {
        'luxury-car': "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')",
        'garage-dark': "url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1920')",
      }
    },
  },
  plugins: [],
}
