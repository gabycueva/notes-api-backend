let data = [
    {
        'id': 1,
        'content': 'HTML is easy',
        'date': '2019-05-30T17:30:31.098Z',
        'important': true
    },
    {
        'id': 2,
        'content': 'Browser can execute only JavaScript',
        'date': '2019-05-30T18:39:34.091Z',
        'important': false
    },
    {
        'id': 3,
        'content': 'GET and POST are the most important methods of HTTP protocol',
        'date': '2019-05-30T19:20:14.298Z',
        'important': true
    }
]

// Crear un servidor con node.js

const express = require('express')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hola hola</h1>')
})

app.get('/api/data', (request, response) => {
    response.json(data)
})

app.get('/api/data/:id', (request, response) => {
    const id = Number(request.params.id)
    const info = data.find(info => info.id === id)
    
    if (info) {
        response.json(info)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/data/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(info => info.id !== id)
    response.status(204).end()
})

app.post('/api/data', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        response.status(404).json(
            {
                error: 'note.content not found'
            }
        )
    }
    
    const ids = data.map(info => info.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    data = [...data, newNote]

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})