const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3001",
  "http://127.0.0.1",

  "http://172.23.4.80",
  "http://172.23.4.80:3001",
  "http://172.23.4.80:3001/data",
  "http://192.168.1.99:3001",
  "*",
];

module.exports = allowedOrigins;
