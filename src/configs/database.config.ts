/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default () => ({
  db_host: process.env.DATABASE_HOST,
  db_port: parseInt(process.env.DATABASE_PORT),
  db_name: process.env.DATABASE_NAME,
  db_user: process.env.DATABASE_USER,
  db_password: process.env.DATABASE_PASSWORD,
});
