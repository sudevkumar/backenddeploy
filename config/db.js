const mongoose = require("mongoose");
require("dotenv").config();

const conection = mongoose.connect(process.env.mongo_url);

module.exports = { conection };
