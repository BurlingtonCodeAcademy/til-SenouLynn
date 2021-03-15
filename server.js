//.env to refference login info
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

//Server port setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("TIL listening on port: ", port);
});

// //Static Directory
// const staticDir = path.resolve("./client/public");

//USE THIS WHEN DEPLOYING
const staticDir = path.resolve("./client/build");

//Connection through APP
// const AtlasURL = `mongodb+srv://senoulynn:${ATLASPASS}@cluster0.3sgwu.mongodb.net/til?retryWrites=true&w=majority`



app.use(express.static(staticDir));

//Bring in Mongoose dependencies
const mongoose = require("mongoose");

//Connect to specific database called 'til'
// "mongodb://localhost:27017/til"
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const ObjectId = require("mongodb").ObjectId;
//REF: to til database
const tilDB = mongoose.connection;

//Middleware
app.use(express.urlencoded({ extended: false }));

//Add post to database: Schema
const postSchema = new mongoose.Schema({
  author: String,
  postTitle: String,
  date: Date,
  postContent: String,
  keyWords: Array,
});

//<----- REF: to til posts collection within til database ----->//

const postModel = mongoose.model("posts", postSchema);

//<----- Reading database => Fetch all for /facts page ----->//

app.get("/facts", async (req, res) => {
  const allPosts = await postModel.find({});
  res.send(allPosts);
});

//<----- Reading database and finding single post by id ----->//

app.get("/facts/:objectId", async (req, res) => {
  let postId = req.params.objectId;
  console.log("REF: postId ", postId);
  const singlePost = await postModel.findById(postId);
  res.send(singlePost);
});

//<----- Info from form submit----->//

app.post("/form-post", async (req, res) => {
  //<----- Write to database ------>//
  //<----- Guard against null entries ----->//
  if (req.body.postTitle && req.body.author && req.body.content) {
    //Declare Schema
    let newPost = new postModel({
      author: req.body.author,
      postTitle: req.body.postTitle,
      date: req.body.date,
      postContent: req.body.content,
      keyWords: req.body.keyWords.split(" "),
    });

    newPost.save((err, data) => {
      console.log("REF: newPost", newPost);
      if (err) {
        console.log(err);
      } else console.log("document has been inserted!", data);

      res.redirect("/");
    });
  } else {
    console.log("You forgot to fill out all fields.");
    res.redirect("/");
  }
});

//<----- Update Single Post ----->//

app.post("/form-update", async (req, res) => {
  let updateForm = req.body;

  console.log(updateForm);

  postModel.findOneAndUpdate(
    { _id: updateForm.postId },

    {
      author: updateForm.author,
      postTitle: updateForm.postTitle,
      date: updateForm.date,
      postContent: updateForm.postContent,
      keyWords: updateForm.keyWords.split(" "),
    },
    function (err, doc) {
      if (err) {
        return res.status(500).send({ error: err });
      } else {
        console.log("Successful Update");
        return res.redirect(`/facts`);
      }
    }
  );
});

//<----- Delete Single Post ----->//

app.post("/post-delete", async (req, res) => {
  let docId = new ObjectId(req.body.postId);

  await postModel.deleteOne({ _id: docId });
  return res.redirect(`/facts`);
});

//<----- Search Bar ----->//

//<----- Get info from search bar / keywords ----->//
let searchReturn;

app.post("/searchBar", async (req, res) => {
  console.log(req.body);

  let searchField = req.body.searchField;
  let searchValue = req.body.searchValue;

  searchReturn = await postModel.find({ [searchField]: searchValue });

  console.log("REF: searchbar post:", searchReturn);
  res.redirect("/searchReturn");
});

//<----- Search return ----->//
app.get("/searchReturn", async (req, res) => {
  if (searchReturn === undefined) {
    console.log("searchReturn is undefined");
  } else {
    console.log("searchbar get", searchReturn);
    await res.send(searchReturn);
  }

  searchReturn = [];
});

// Catchall to send back to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//To referrence .env file to username and password info
// const password = process.env.PASSWORD
//const user = process.env.USER
