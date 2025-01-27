import { Options } from 'http-proxy-middleware';

interface ProxyConfig {
  [path: string]: Options;
}

export const proxyConfig: ProxyConfig = {
  '/api/users': {
    target: 'https://api.users.services.threadparsing.online',
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/api/users',
    },
  },
  '/api/orders': {
    target: 'https://api.orders.services.threadparsing.online',
    changeOrigin: true,
    pathRewrite: {
      '^/api/orders': '/api/orders',
    },
  },
}; 