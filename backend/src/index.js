// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const questions = [
  {
    id: 1,
    title: 'Pasta recipe',
    description: 'Does anyone have a good pasta recipe?',
    answers: [
      "Try this spaghetti cabonara recipe I've been using: https://recipe.com/spaghetti-cabonara",
    ],
  },
  {
    id: 2,
    title: 'Lost Pet',
    description: 'Has anyone seen my lost corgie?',
    answers: [
      'Does it have a collar?',
      "I think I've seen one wandering around lately.",
      'We found a corgie this afternoon. Contact me at j.doe@gmail.com so we can sort this out.',
    ],
  },
];

// app security with Helmet
app.use(helmet());

// bodyParser to parse app/json content
app.use(bodyParser());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// GET all questions
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers,
  }));
  res.send(qs);
});

// GET a specific question
app.get('/question/:id', (req, res) => {
  const question = questions.filter(q => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

// POST a new question
app.post('/', (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// POST an answer to a question
app.post('/answer/:id', (req, res) => {
  const {answer} = req.body;
  // filtering for question id
  const question = questions.filter(q => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  // push answer into questions array
  question[0].answers.push({
    answer,
  });
  res.status(200).send();
});

// Start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
