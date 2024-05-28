const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        sans: ["Haskoy", ...fontFamily.sans],
        // mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      backgroundImage: (theme) => ({
        gradientTopRight:
          "linear-gradient(229.7deg,#ffbb88 10.61%,#ff7cba 26.17%,#887bff 31.93%,#03c7f6 46.54%,#0F1014 54.36%)",

        gradientTopRightLight:
          // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ff7eb9 20.61%, #ff65a3 31.93%, #7afcff 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // red wow !
          // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #84fab0 20.61%, #8fd3f4 31.93%, #a6c1ee 46.54%, rgba(255, 255, 255, 0.3) 80.36%)", // blue-green !
          // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ffecd2 20.61%, #fcb69f 31.93%, #ff6f61 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // red-orange !
          "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #fbc2eb 20.61%, #a6c1ee 31.93%, #d4fc79 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // lime-blue-pink!
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ff9a8b 20.61%, #ff6a88 31.93%, #ff99ac 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // deep-red-pink
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #a1ffce 20.61%, #faffd1 31.93%, #ffc3a0 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // cool-orange-green

        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ffabbb 20.61%, #ffdfba 31.93%, #fcd1d1 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // pink-orange
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #a1c4fd 20.61%, #c2e9fb 31.93%, #b3e5fc 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // blue-lightblue
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #fad0c4 20.61%, #ffd1ff 31.93%, #fbc2eb 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // peach-pink
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #f6d365 20.61%, #fda085 31.93%, #fcb69f 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // orange-yellow
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #a8edea 20.61%, #fed6e3 31.93%, #c3cfe2 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // teal-pink
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ff9a9e 20.61%, #fad0c4 31.93%, #fad0c4 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // red-peach

        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #a18cd1 20.61%, #fbc2eb 31.93%, #f5f7fa 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // purple
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ff9a9e 20.61%, #fad0c4 31.93%, #fad0c4 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // orange
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ff758c 20.61%, #ff7eb3 31.93%, #ffe39f 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // orange-pink
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #ffafbd 20.61%, #ffc3a0 31.93%, #ff96f9 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // pink-yellow-orange
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #f6d365 20.61%, #fda085 31.93%, #fcb69f 46.54%, rgba(255, 255, 255, 0.3) 50.36%)", // orange-yellow
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #a1c4fd 20.61%, #c2e9fb 31.93%, #8fd3f4 46.54%, rgba(255, 255, 255, 0.3) 50.36%)",
        // "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3)  14.85%, #6edbff 20.61%,  #ffadd4 31.93%,  #ffe0b3 46.54%, rgba(255, 255, 255, 0.3) 50.36%)",

        gradientTopRightLightHeader:
          "linear-gradient(30.7deg,#ffe0b3  0.61%,  #ffadd4 17.93%,  #6edbff 49.54%, rgba(255, 255, 255, 0.3)  56.36% )",

        gradientTopRightLightHeaderSm:
          "linear-gradient(30.7deg, #ffadd4 0.93%,  #6edbff 41.54%, rgba(255, 255, 255, 0.3)  64.36% )",
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
}
