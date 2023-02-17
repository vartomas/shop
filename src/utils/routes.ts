const devEnv = process.env.NODE_ENV === 'development';
const baseUrl = (devEnv ? 'http://localhost:3000/' : 'https://shop-seven-sigma.vercel.app/') + 'api/';

export const routes = {
  CREATE_USER_URL: baseUrl + 'user/create',
  LOG_IN_URL: baseUrl + 'user/login',
  LOG_OUT_URL: baseUrl + 'user/logout',
};
