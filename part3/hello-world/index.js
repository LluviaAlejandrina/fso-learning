
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
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'})) // Only your frontend can access the backend.
app.use(express.static('dist'))



let notes = [
    {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]




app.get('/', (request,response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => response.json(notes))
    .catch(error => {
      console.error("ERROR FETCHING NOTES:", error)
      response.status(500).send("Database error")
    })
})


app.get('/api/notes/:id',(request,response) => {

  Note.findById(request.params.id).then(note => response.json(note))

    /*  this was before mongo: const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    } */

})



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

app.post('/api/notes', (request,response) => {
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

     note.save().then(savedNote => response.json(savedNote))

})

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


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
