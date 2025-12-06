/** @type {import('tailwindcss').Config} */
module.exports = {
  //
  // ★ 監視するファイル（content）のパスを修正します。
  // 'src' フォルダは存在しないため、'./app' フォルダを直接見にいくように指定します。
  //
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/customers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // DaisyUIプラグインを読み込みます
  plugins: [require("daisyui")],

  // DaisyUIのテーマを指定します (これが無いとbtnなどのスタイルが効きません)
  daisyui: {
    themes: ["light"], // "light", "corporate", "aqua" など好みのテーマに変更可能です
  },
};

