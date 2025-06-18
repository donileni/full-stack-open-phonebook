require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static("dist"));

morgan.token("tokenData", (req) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :tokenData'))

const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

app.get("/version", (req, res) => {
  res.send("5");
});

app.get("/health", (req, res) => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw "error...  ";
  res.send("ok");
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {

  Person.find().count().then(count => {
    const entriesText = `Phonebook has info for ${count} people`
    const now = new Date().toString()
    const combinedText = `<p>${entriesText}</p><p>${now}</p>`
    response.send(combinedText)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

const generateId = () => {
  return Math.floor(Math.random() * 1000)
}

app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const id = generateId()

  const person = new Person({
    "name": body.name,
    "number": body.number,
    "id": id,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    "name": body.name,
    "number": body.number,
    "id": body.id,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true }).then(updatedPerson => {
    response.json(updatedPerson)
  })
    .catch(error => next(error))

})

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})