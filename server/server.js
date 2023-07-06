require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5001, () =>
      console.log("Server is running on port 5001")
    )
  )
  .catch((error) => console.log(error.message));
