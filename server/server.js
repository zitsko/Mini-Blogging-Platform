const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();


app.use(
  cors({
      origin:"*"
  })
);

const userRouter = require("./routers/userRouter.js");
const blogRouter = require("./routers/blogRouter.js");

app.use("/user", userRouter);
app.use("/blogs", blogRouter);

const PORT = 3636;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});