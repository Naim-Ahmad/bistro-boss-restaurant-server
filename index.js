const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const { run, client } = require("./config/db.config");
const menusRouter = require("./routes/menusRouter");
const cartRouter = require("./routes/cartRouter");
const adminRoutes = require("./routes/admin/adminRoutes");

const app = express();
const port = process.env.PORT || 5000;

/******** middlewares ********/
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
  express.json(),
  morgan("dev")
);

app.get("/", (req, res) => {
  res.send("Bistro boss server is running... :)");
});

/******** DB Collections ********/
const reviewsCollection = client.db("bistroBoss").collection("reviews");

/******** auth related api ********/
app.post("/crateToken", (req, res) => {
  const token = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.send({ token });
});

/******** admin routes ********/
app.use("/admin", adminRoutes);

/******** menus route ********/
app.use(menusRouter);

/******** review route ********/
app.get("/reviews", async (req, res) => {
  const result = await reviewsCollection.find().toArray();
  res.send(result);
});

/******** cart routes ********/
app.use(cartRouter);

/******** user router ********/
app.use(userRouter);

async function main() {
  // mongodb
  await run().catch(console.dir);
  app.listen(port, () => {
    console.log(`server is running on ${port} port...`);
  });
}

main();
