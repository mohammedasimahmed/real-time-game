const mongoose = require("mongoose");
const url = process.env.MongoDB_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
