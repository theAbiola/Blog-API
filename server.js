import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
env.config();
const port = process.env.API_PORT;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 4,
    title: "The importance of consistency",
    content:
      "Consistency is what keeps you focused so that you can always do what you say you would do. Consistency is what helps you stay on track and always finish what you started.",
    author: "Habib Abiola",
    date: "2025-01-22T17:33:41.660Z",
  },
];

let lastId = 3;

// Middleware
app.use(express.json()); //Necessary to parse incoming JSON response
app.use(express.urlencoded({ extended: true }));

//ENDPOINT 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//ENDPOINT 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  let postId = parseInt(req.params.id);
  let foundPost = posts.find((post) => post.id === postId);
  res.json(foundPost);
});

//ENDPOINT 3: POST a new post
app.post("/posts", (req, res) => {
  let { title, content, author } = req.body;
  let newId = lastId + 1;
  let newPost = {
    id: newId,
    title: title,
    content: content,
    author: author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(newPost);
  res.status(201).json(newPost);
});

//ENDPOINT 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  let { title, content, author } = req.body;
  let postId = parseInt(req.params.id);
  let foundPost = posts.find((post) => post.id === postId);
  let newPost = {
    id: postId,
    title: title || foundPost.title,
    content: content || foundPost.content,
    author: author || foundPost.author,
    date: new Date() || foundPost.date,
  };

  let postIndex = posts.findIndex((post) => post.id === postId);
  posts[postIndex] = newPost;

  res.json(newPost);
});

//ENDPOINT 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  let postId = parseInt(req.params.id);
  let foundPostIndex = posts.findIndex((post) => post.id === postId);
  if (foundPostIndex > -1) {
    posts.splice(foundPostIndex, 1);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
