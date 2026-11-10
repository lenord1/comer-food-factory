import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 印章朱紅：標題、細邊框、重點文字
        brand: { DEFAULT: "#A8312D" },
        // 米白底（與 Logo 底色一致）
        paper: { DEFAULT: "#F7F1E5" },
        // 燕麥：區塊交替底色
        oat: { DEFAULT: "#F1E8D8" },
        // CTA 按鈕與價格（沿用朱紅，hover 略深）
        accent: { DEFAULT: "#A8312D", dark: "#8A2723" },
        // 暖墨色：內文與深色卡片；soft 為輔助文字
        ink: { DEFAULT: "#2B1D1A", soft: "#5B4A45" },
        // 素食標籤
        leaf: { DEFAULT: "#15803D", soft: "#DCFCE7" },
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "6px",
        md: "6px",
        lg: "6px",
        xl: "6px",
        "2xl": "6px",
      },
      fontFamily: {
        serif: [
          '"Noto Serif TC"',
          '"Source Han Serif TC"',
          '"Songti TC"',
          "PMingLiU",
          "serif",
        ],
        sans: [
          "system-ui",
          "-apple-system",
          '"PingFang TC"',
          '"Microsoft JhengHei"',
          '"Noto Sans TC"',
          "sans-serif",
        ],
        num: [
          '"Avenir Next"',
          "Futura",
          '"Segoe UI"',
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
