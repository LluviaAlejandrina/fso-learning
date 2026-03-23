
const express = require ('express')
// Browsers block cross-origin requests by default for security
// CORS lets the server allow exceptions, you fix it on the backend
const cors = require('cors')



const app= express()

// The json-parser takes the JSON data of
//  a request, transforms it into a Js object
//  and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'})) // Only your frontend can access the backend.

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
    response.json(notes)
})


app.get('/api/notes/:id',(request,response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    }

})



app.delete('/api/notes/:id',(request,response) => {
     const id = request.params.id
     notes = notes.filter(note => note.id !== id)

     response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ?
     Math.max(...notes.map(note => Number(note.id))) : 0
     return String(maxId + 1)
     // Math.max does not take arrays,so we use the spread operator to convert to (1,2,3)

}
app.post('/api/notes', (request,response) => {
    console.log(request.headers) // to find out what all the headers were
    console.log(request.get('Content-Type')) // to findout the content type header


    const body = request.body
     if (!body.content) { // to make sure there was actually a body content  sent in request
        return response.status(400).json({ //  this return is crucial to avoid execution of rest of code in this case
            error: 'content missing'
        })
     }

     const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
     }

     notes = notes.concat(note)
     response.json(note)

})

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)



/*
REST APIs:

Organize data as resources
Each resource has a URL
HTTP verbs define actions
Usually follow CRUD operations */
