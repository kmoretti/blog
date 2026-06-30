import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Noto Sans SC 覆盖拉丁与 CJK，末尾保留系统无衬线作为兜底。
        sans: ["Noto Sans SC", ...defaultTheme.fontFamily.sans],
        // 代码块统一使用 Noto Sans Mono。
        mono: ["Noto Sans Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
