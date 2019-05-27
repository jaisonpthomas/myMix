const express = require("express");
const app = express();
const mongoose = require("mongoose");

const db = mongoose
  .connect(
    "mongodb+srv://jpt:jpt123@cluster0-lzwpd.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"));

app.use(express.json());

app.use("/api/artists", require("./routes/api/artists"));
app.use("/api/subscribers", require("./routes/api/subscribers"));
app.use("/api/albums", require("./routes/api/albums"));
app.use("/api/rentals", require("./routes/api/rentals"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
