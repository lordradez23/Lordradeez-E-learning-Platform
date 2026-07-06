declare module "next-pwa" {
  import type { NextConfig } from "next";
  type PWAConfig = {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  export default function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}
