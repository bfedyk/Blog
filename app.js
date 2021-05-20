//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const portNum = 3000;

// Truncated blog content length
const summaryLength = 100;

// Global variables
// Array to store the posts
let posts = [];

// Set the path to the views folder and set ejs as the default engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Render the home page displaying the starting content
app.get("/", function(req, res){

  // res.render home page passing the two variables
  res.render("home",{
    startContent: homeStartingContent,
    posts: posts,
    summaryLength: summaryLength
  });

});

// Render the about page
app.get("/about", function(req, res){
  res.render("about",{aboutContent: aboutContent});
});

// Render the contact page
app.get("/contact", function(req, res){
  res.render("contact",{contactContent: contactContent});
});

// Render the compose page
app.get("/compose", function(req, res){
  res.render("compose");
});

// Use Express route parameters
app.get("/posts/:postName", function(req, res){

    // Use nodejs modulde lodash: _lowerCase
    let requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){

    // Use lodash module to convert to lower case
    const storedTitle = _.lowerCase(post.title);

      // Render the post page
      if (storedTitle === requestedTitle){
          res.render("post",{
            postTitle: post.title,
            postContent: post.content
          });
      };

    });
  });


// Get POST from the compose page
app.post("/compose", function(req, res){
  // console.log(req.body.postBody);

// Store the post title and body and add to array of posts
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
    };

    posts.push(post);

    res.redirect("/");

});

// Server port
app.listen(portNum, function() {
  console.log("Server started on port " + portNum);
});
