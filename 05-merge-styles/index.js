const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
const extendedFiles = files.filter(file => path.extname(file.name) === '.css');
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

extendedFiles.forEach((file) => {
const readStream = fs.createReadStream(path.join(styles, file.name));

readStream.on('data', data => writeStream.write(data + '\n'));
    });
});