const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Lesson = require('./models/lesson');


app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
// For cli logging
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
  ].join(' ');
}));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/lessons', (request, response) => {
  Lesson.find({}).then((lessons) => {
    response.json(lessons);
  });
});

app.get('/api/lessons/:id', (request, response, next) => {
  Lesson.findById(request.params.id)
      .then((lesson) => {
        if (lesson) {
          response.json(lesson);
        } else {
          response.status(404).end();
        }
      })
      .catch((error) => next(error));
});

app.delete('/api/lessons/:id', (request, response) => {
  Lesson.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
});

app.post('/api/lessons', (request, response, next) => {
  const body = request.body;

  if (body.fName === undefined) {
    return response.status(400).json({error: 'content missing'});
  }

  const lesson = new Lesson({
    fName: body.fName,
    lName: body.lName,
    email: body.email,
    date: body.date,
    time: body.time
  });

  lesson.save().then((savedLesson) => {
    response.json(savedLesson);
  })
      .catch((error) => next(error));
});

const unknownEndpoint = (_, response)=> {
  response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }
  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

