

const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

// CREATE SERVER
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

    // SERVE HTML, CSS, JAVASCRIPT, AND IMAGES

    let filePath = ''

    if (page === '/') {
        filePath = 'index.html'
    } else {
        try {
            filePath = decodeURIComponent(page).replace(/^\/+/, '')
        } catch (error) {
            res.writeHead(400)
            res.end('Invalid file path')
            return
        }
    }

    const fullPath = path.resolve(__dirname, filePath)

    // PREVENT ACCESS OUTSIDE PROJECT FOLDER
    if (
        fullPath !== __dirname &&
        !fullPath.startsWith(__dirname + path.sep)
    ) {
        res.writeHead(403)
        res.end('Forbidden')
        return
    }

    // FILE TYPES
    const extension = path.extname(fullPath).toLowerCase()

    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    }

    // ONLY SERVE SUPPORTED FILE TYPES
    if (!contentTypes[extension]) {
        res.writeHead(404)
        res.end('Page not found')
        return
    }

    // READ AND DISPLAY FILE
    fs.readFile(fullPath, (err, content) => {

        if (err) {
            res.writeHead(404)
            res.end('File not found')
            return
        }

        res.writeHead(200, {
            'Content-Type': contentTypes[extension]
        })

        res.end(content)
    })
})

// RENDER PORT
const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Matching Card Game running on port ${PORT}`)
})

