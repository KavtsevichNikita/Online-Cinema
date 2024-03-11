const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Подключение к MongoDB
mongoose.connect('mongodb://mongo:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Создание модели Todo
const Todo = mongoose.model('Todo', { text: String });

// Создание приложения Express
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
    });

    app.post('/todos', async (req, res) => {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
