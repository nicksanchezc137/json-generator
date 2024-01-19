
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {
            colors:{
              "primary":"#fff",
              "secondary":"#100D1B",
              "blue":"#034CB9",
              "light-blue":"#3063b0",
              "gray":"#7A7A7A",
              "gray_x":"#F5F5F5",
              "red":"#F00"
            }
          },
        },
        plugins: [],
       };
      