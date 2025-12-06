import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Azure App Service用にスタンドアロンモードを有効化
  output: 'standalone', 
};

export default nextConfig;