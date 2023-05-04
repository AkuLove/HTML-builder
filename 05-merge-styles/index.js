const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');

fs.readdir(styles, { withFileTypes: true }, function(err, files) {
    if (err) throw err;

    files.forEach(file => {
    const extension = path.parse(file.name).ext;

    if (file.isFile() && extension === '.css') {
    const readStream = fs.createReadStream(path.join(styles, file.name));
    
    readStream.on('data', data => { 
        fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css')).write(data)
            });
        }
    });
});