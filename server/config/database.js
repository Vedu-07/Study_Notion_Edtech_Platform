const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DataBase Connected Successfully");
    })
    .catch((error) => {
      console.log("DataBase Connection Failed");
      console.error(error);
      process.exit(1);
    });
};
