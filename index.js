require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json())

// custom token formats for morgan
morgan.token('content', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content')
);


let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});
app.get('/info', (req, res) => {
  const time = Date();
  console.log(time);
  res.send(`Phonebook has info for ${persons.length} people </br> ${Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    // res.send(`ID ${id} is out of the range`);
    res.sendStatus(404).end();
  }
});

const generateId = () => {
  const maxId = persons.id > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (req, res) => {

  const body = req.body;

  // if SOME of the array values correspond to the passed condition, .some() will return true
  // unlike find() which returns the first value, .some() returns boolean.
  if (persons.some((n) => n.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((persons) => persons.id !== id);

  res.sendStatus(204).end();
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});
