const data = [
    {
        id: "1",
        nombre: "Gabriela",
        foranea: true
    },
    {
        id: "2",
        nombre: "Elizabeth",
        foranea: false
    },
    {
        id: "3",
        nombre: "Cueva",
        foranea: true
    }
];

// Crear un servidor con node.js

const http = require('http');

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(data))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running in port ${PORT}`)