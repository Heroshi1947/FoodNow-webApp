const express = require("express");
const app = express();
const PORT = 4000;
const connectionToDB = require("./db");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });

// very imp middleware to connect frontend to backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); // important
//frontend to backend
app.use(express.static(path.join(__dirname, "/build")));

// routes- telling our backend that following routes are made
app.use("/api", require("./routes/createUser")); // to connect createUser route
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.use("/api", require("./routes/MyOrders"));

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`server is listening at http://localhost:${PORT}`);
});
