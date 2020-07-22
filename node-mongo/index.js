const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/node-mongo-docker',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB is on'))
  .catch(err => console.log(err));


//test the work
app.get('/', (req, res) => {
  res.json({ 'message': 'Working properly' })
})

//get all posts
app.get('/posts', (req, res) => {
  Post
    .find()
    .then(posts => res.json(posts))
    .catch(err => res.json({ 'error': err }))
})

//post a new post
app.post('/post/add', (req, res) => {
  console.log(req.body)
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  })
  newPost
    .save()
    .then(post => res.json({ 'post': post }))
});

const port = 5000;

app.listen(port, () => console.log('Server is on'));
