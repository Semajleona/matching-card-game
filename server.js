
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true)
    const page = parsedUrl.pathname
    const params = parsedUrl.query

    // MATCHING CARD API
    if (page === '/api') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })

        if ('choice1' in params && 'choice2' in params) {

            if (params.choice1 === params.choice2) {

                const objToJson = {
                    matchMessage: 'Its a Match'
                }

                res.end(JSON.stringify(objToJson))

            } else {

                const objToJson = {
                    dontMatchMessage: 'No match,Try Again'
                }

                res.end(JSON.stringify(objToJson))
            }

        } else {
            res.end(JSON.stringify({
                error: 'Please select two cards'
            }))
        }

        return
    }

    // SERVE HTML, CSS, AND JAVASCRIPT
    let filePath = ''

    if (page === '/') {
        filePath = 'index.html'
    } else if (page === '/style.css') {
        filePath = 'style.css'
    } else if (page === '/main.js') {
        filePath = 'main.js'
    } else {
        res.writeHead(404)
        res.end('Page not found')
        return
    }

    const fullPath = path.join(__dirname, filePath)

    fs.readFile(fullPath, (err, content) => {

        if (err) {
            res.writeHead(404)
            res.end('File not found')
            return
        }

        let contentType = 'text/html'

        if (filePath.endsWith('.css')) {
            contentType = 'text/css'
        }

        if (filePath.endsWith('.js')) {
            contentType = 'application/javascript'
        }

        res.writeHead(200, {
            'Content-Type': contentType
        })

        res.end(content)
    })
})

const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Matching Card Game running on port ${PORT}`)
})
