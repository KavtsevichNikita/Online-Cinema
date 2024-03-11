const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://mongo:27017/movie-comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Comment = mongoose.model('Comment', { name: String, comment: String, rating: Number });

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const { name, comment, rating } = req.body;
    const newComment = new Comment({ name, comment, rating });
    await newComment.save();
    res.status(201).json(newComment);
});

app.delete('/comments/:id', async (req, res) => {
  const commentId = req.params.id;
  try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/comments/:id', async (req, res) => {
  const commentId = req.params.id;
  const { name, comment, rating } = req.body;
  try {
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { name, comment, rating }, { new: true });
      if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(updatedComment);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
