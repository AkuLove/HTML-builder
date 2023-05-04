const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');


const files = fs.readdir(secretFolder, (err,files) => {
    files.forEach(file => {
        fs.stat(path.join(secretFolder,file), (err, stats) => {
            if (stats.isFile()) {
                const name = (path.basename(file, path.extname(file)));
                const extname = (path.extname(file).slice(1));
                const size = (parseFloat((stats.size / Math.pow(1024, 1)).toFixed(2)));
                console.log(`${name} -- ${extname} -- ${size}kb`);
            }
         });
    });
  },{withFileTypes: true});
