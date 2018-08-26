const express = require('express');
const path = require('path');
const db = require('./db');
const { Todo } = db.models;

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

app.use('/public', express.static(path.join(__dirname, 'dist')));

app.use(require('body-parser').json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/todos', (req, res, next)=> {
  Todo.findAll()
    .then( todos => res.send(todos))
    .catch(next);
});

app.get('/todos/:id', (req, res, next)=> {
  Todo.findById(req.params.id)
    .then( todo => res.send(todo))
    .catch(next);
});

app.post('/todos', (req, res, next)=> {
  Todo.create(req.body)
    .then( todo => res.send(todo))
    .catch(next);
});

app.put('/todos/:id', (req, res, next)=> {
  Todo.findById(req.params.id)
    .then( todo => todo.update(req.body))
    .then( todo => res.send(todo))
    .catch(next);
});

app.delete('/todos/:id', (req, res, next)=> {
  Todo.destroy({
    where: { id: req.params.id}

  })
    .then( () => res.sendStatus(204))
    .catch(next);
});



db.syncAndSeed();
