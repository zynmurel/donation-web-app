import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins"],
      },
    },
  },
  plugins: [require("daisyui")],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
