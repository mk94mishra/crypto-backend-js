module.exports = {
  HOST: "localhost",
  USER: "atom",
  PASSWORD: "123456",
  DB: "db_crypto",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
