
const express = require ('express')
require('dotenv').config()
const Note = require('./models/note')

// Browsers block cross-origin requests by default for security
// CORS lets the server allow exceptions, you fix it on the backend
const cors = require('cors')
const app= express()

// The json-parser takes the JSON data of
//  a request, transforms it into a Js object
//  and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json()) // The json-parser middleware should be among the very first middleware loaded into Express. this is for the json data  sent trhough http request to be available
app.use(cors({ origin: 'http://localhost:5173' })) // Only your frontend can access the backend.
app.use(express.static('dist'))


app.get('/', (request,response) => {response.send('<h1>Hello World!</h1>')})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => response.json(notes))
    .catch(error => {
      console.error('ERROR FETCHING NOTES:', error)
      response.status(500).send('Database error')
    })
})


app.get('/api/notes/:id',(request,response,next) => {

  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))// better to pass the error forward to handle them all in asingle place

})

/*  console.log(error)
    response.status(400).send({ error: 'malformatted id' */
/*  this was before mongo: const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    } */


app.delete('/api/notes/:id',(request,response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

/*  NOW MONGO WILL GENERATE IDS....
  const generateId = () => {
    const maxId = notes.length > 0 ?
     Math.max(...notes.map(note => Number(note.id))) : 0
     return String(maxId + 1)
     // Math.max does not take arrays,so we use the spread operator to convert to (1,2,3)
  } */

app.post('/api/notes', (request,response,next) => {
  console.log(request.headers) // to find out what all the headers were
  console.log(request.get('Content-Type')) // to findout the content type header


  const body = request.body
  if (!body.content) { // to make sure there was actually a body content  sent in request
    return response.status(400).json({ //  this return is crucial to avoid execution of rest of code in this case
      error: 'content missing'
    })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    //id: generateId()
  })

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))

})

app.put('/api/notes/:id', (request,response,next) => {
  const { content, important } = request.body
  Note.findById(request.params.id)
    .then(note => {
      if(!note){
        return response.status(404).end()
      }
      note.content = content
      note.important = important

      return note.save().then(updatedNote => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError'){ // A CastError happens when MongoDB cannot convert a value to a valid ObjectId
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error) // this will go to default handler → Express fallback (500 error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log( `Server running on port ${PORT}` )


/* Since from the frontend's perspective all requests are made to http://localhost:5173,
which is the single origin, there is no longer a need for the backend's cors middleware.
Therefore, we can remove references to the cors library from the backend's index.js file
and remove cors from the project's dependencies:
npm remove cors
 */


/*
REST APIs:

Organize data as resources
Each resource has a URL
HTTP verbs define actions
Usually follow CRUD operations */


/* Situation	        Use Proxy	    Use CORS	    Use Same-Origin
Dev (5173 → 3001)	    ✅ YES	      ❌ optional	 ❌
Prod (separate domains)	❌	          ✅ YES	         ❌
Prod (same server)	    ❌	          ❌            	 ✅ YES just for simple apps
 */
