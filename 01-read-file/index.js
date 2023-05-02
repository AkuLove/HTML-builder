const path = require('path');
const fs = require('fs');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readableStream.on('data', (text) => console.log(text.toString()));
