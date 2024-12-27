import { NextFederationPlugin } from '@module-federation/nextjs-mf';

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
          name: 'authentication',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './login': './components/Login/index.tsx',
          },
          shared: sharedDependencies
        })
      )

    return config;
  },
};

export default nextConfig;
