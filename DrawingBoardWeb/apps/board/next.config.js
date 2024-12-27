import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    authentication: `authentication@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

const sharedDependencies = {
  react: {
    singleton: true,
    requiredVersion: false,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: false,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'board',
          filename: 'static/chunks/remoteEntry.js',
          remotes: remotes(isServer),
          shared: sharedDependencies
        })
      )

    return config;
  },
};

export default nextConfig;
