const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    //allow requests from our defined origins or no origin (like mobile apps or curl requests like postman)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true, //allow cookies from our origin
  optionsSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = corsOptions;
