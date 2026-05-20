import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname, // ✨ Mengunci folder proyek fotografi Anda sebagai root utama Turbopack
  },
};

export default withFlowbiteReact(nextConfig);
