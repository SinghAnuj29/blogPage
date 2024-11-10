import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const homeStartingContent = "Welcome to the 5 A.M CLUB!";

const aboutContent = "This is a Blog page and I am Superman! ";

const contactContent = "There is no way";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // In-memory storage for posts

// Home route
app.get("/", function (req, res) {
  console.log("HOme Page");
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

// "/compose" page
app.get("/compose", function (req, res) {
  console.log("I am in compose default");
  res.render("compose");
});

// Posting title and content in /compose page
app.post("/compose", function (req, res) {
  const post = {
    id: req.body.postId,
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  // Push the new post to the posts array
  posts.push(post);

  // Redirect to home route
  res.redirect("/");
});

// Display individual post based on index
app.get("/posts/:postId", function (req, res) {
  // console.log(postId);
  const requestedPostId = req.params.postId;

  // Find the post with the matching postId
  const post = posts.find((post) => post.id === requestedPostId);

  if (post) {
    res.render("post", {
      id: post.id,
      title: post.title,
      content: post.content,
    });
  } else {
    res.send("Post not found");
  }
});

//We can create a edit button also, using the same postId fetch method, just add use the chaning, this is a rough idea we can probably get the serve request at the domain form the button whcih would be app.get("/posts/:postId")

/* 
  const id = posts[req.params.postId];
  cosnt userinput = input("Enter the changes");
  posts[req.params.postId].title = userinput;

*/

app.get("/articles", (req, res) => {
  console.log("Here all the articles are displayed");
  res.render("articles", { posts: posts });
});

app.get("/about", function (req, res) {
  console.log("About Page");
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  console.log("COntact Page");
  res.render("contact", { contactContent: contactContent });
});

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});

console.log("Success");
