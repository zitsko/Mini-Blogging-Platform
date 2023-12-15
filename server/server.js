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
//const linkRouter = require("./routers/linkRouter.js");

app.use("/user", userRouter);
// app.use("/links", linkRouter);

const PORT = 3636;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});