const fs = require('fs');
const path = require('path');
const files = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

fs.rm(filesCopy, {recursive: true, force: true}, (err) => {
    if (err) throw err;

fs.readdir(files,{withFileTypes: true},(err, files) => {
    if (err) throw err;

fs.mkdir(filesCopy, {recursive: true, force: true}, err => {
    if (err) throw err;
        
files.forEach(file => {
fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
    if (err) throw err;
                });
            });
        }); 
    });
});