import dotenv from "dotenv";
dotenv.config();

// export default {
//   port: process.env.PORT,
//   db_url: process.env.DATABASE_URL,
//   bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
//   NODE_ENV: process.env.NODE_ENV,
//   jwt_access_secret: process.env.JWT_ACCESS_SECRET,
// };



export default {
  // jwt: {
  //   secret: 'your_jwt_secret',
  //   expiresIn: '30d',
  // },
  // database: {
  //   url: 'mongodb://localhost:27017/car-wash',
  // },
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
