const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3005;
const cors = require("cors");
const bin = require("./routes/bin");

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/", bin);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
