const express = require("express");
const morgan = require("morgan");
const ctrl = require("./controller");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(logger("dev"));

app.get("/posts", ctrl.getAllPosts);
app.get("/post/:id", ctrl.getPost);
app.put("/post/:id", ctrl.editPost);
app.post("/post", ctrl.addPost);
app.delete("/remove/:id", ctrl.removePost);

app.listen(
  port,

  () => console.log("Express server ready for requests on:", port)
);
