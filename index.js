// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();

server.use(express.json());
server.use(cors());

server.post('/api/users', (req, res) => {
  const {name, bio} = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
  }
  db.insert(req.body)
    .then(data => res.status(201).json({...data, name, bio}))
    .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database" }))
})

server.get('/api/users', (req, res) => {
  db.find()
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json({ error: "The users information could not be retrieved."}))
})

server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(404).json({ error: "The user with the specified ID does not exist."}))
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      else {
        res.status(200).json({ message: `Deleted user with ID ${id}`})
      }
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (!user.name || !user.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  db.update(id, user)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      else {
        res.status(200).json({message: "The user was updated", user: {...user, id}})
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." })
    })
})


server.listen(4000, () => console.log(`Running on port 4000`))