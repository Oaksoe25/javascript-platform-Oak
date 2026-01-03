require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/jobs", require("./routes/job.routes"));
app.use("/apply", require("./routes/application.routes"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
