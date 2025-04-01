/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img0.baidu.com",
        port: "",
        pathname: "/it/**",
      },
      {
        protocol: "http",
        hostname: "minio-api.k8s.qc.host.dxy",
        port: "",
        pathname: "/file-image/**",
      },
    ],
  },
};

export default nextConfig;
