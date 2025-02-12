const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const newRouter = require("./routes/new");

app.use(express.urlencoded({ extended: true }));
app.use("/new", newRouter);
app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
