/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default () => ({
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRETKEY,
});
