const mongoose = require("mongoose");
const consts = require("./consts");
const Post = require("./post");

const { MLAB_URL, DB_USER, DB_PASS } = consts;

const url = MLAB_URL;
const options = {
  useNewUrlParser: true, // For deprecation warnings
  useCreateIndex: true, // For deprecation warnings
  user: DB_USER,
  pass: DB_PASS
};

module.exports = {
  getAllPosts(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        // Query goes here
        const result = await Post.find({});
        if (result) res.status(200).json(result);
        else res.status(404).send("not found");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  getPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.params;
        // Query goes here
        const result = await Post.findOne({ id });
        if (result) res.status(200).json(result);
        else res.status(404).send("not found");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  editPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.params;
        const { title = null, body = null } = req.body;
        // Query goes here
        const result = await Post.updateOne({ id }, { body, title });
        if (result) res.status(200).json(result);
        else res.status(404).send("not found");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  addPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const {
          id = null,
          userId = null,
          title = null,
          body = null
        } = req.body;
        // Query goes here
        const post = new Post({ id, userId, title, body });
        const result = await post.save();
        if (result) res.status(200).json(result);
        else res.status(404).send("not found");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  removePost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.params;
        // Query goes here
        const result = await Post.deleteOne({ id });
        if (result) res.status(200).json(result);
        else res.status(404).send("not found");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  }
};
