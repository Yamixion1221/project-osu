/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // semua file di app/
    "./components/**/*.{js,ts,jsx,tsx}", // semua file di components/
    "./pages/**/*.{js,ts,jsx,tsx}",      // kalau ada pages/
  ],
  theme: {
    extend: {
      colors: {
        body: "#808080",     // abu-abu body
        header: "#000000",   // hitam header/footer
        link: "#ffffff",     // link putih
        linkHover: "#3b82f6", // biru saat hover
        osuPink: "#ff66aa",  // background login osu!
        googleRed: "#db4437" // background login Google
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // untuk konten berita
  ],
};
