const http = require('http');
const fs = require('fs');
const port = 3000; // Set your desired port

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/add-email') {
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            const email = body.trim();
            if (email && isValidEmail(email)) {
                fs.appendFile('waitlist.txt', email + '\n', (err) => {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end('Error saving email.');
                    } else {
                        res.statusCode = 200;
                        res.end('Email added to the waitlist.');
                    }
                });
            } else {
                res.statusCode = 400;
                res.end('Invalid email address.');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
