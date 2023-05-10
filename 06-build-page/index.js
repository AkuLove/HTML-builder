const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist', 'assets');
const styles = path.join(__dirname, 'styles');
const template = path.join(__dirname, 'template.html');
const index = path.join(__dirname, 'project-dist', 'index.html');
//=========04======================
// Копирование папки assets
fs.mkdir(dist, { recursive: true, force: true }, err => {
    if (err) throw err;
});

fs.mkdir(assetsCopy, { recursive: true, force: true }, err => {
    if (err) throw err;
});

function copyDirectory(assets, assetsCopy) {
fs.readdir(path.join(assets),{ withFileTypes: true },(err, files) => {
    if (err) throw err;

files.forEach(file => {
if (file.isDirectory()) {

fs.mkdir(path.join(assetsCopy, file.name), { recursive: true, force: true }, (err) => {
    if (err) throw err;
    copyDirectory(path.join(assets, file.name), path.join(assetsCopy, file.name));
    });
}

if (file.isFile()) {
fs.copyFile(path.join(assets, file.name), path.join(assetsCopy, file.name), (err) => {
    if (err) throw err;
                });
            }
        });
    });
}
copyDirectory (assets,assetsCopy);

//============05=======================
//Сборка style.css
fs.readdir(styles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
const extendedFiles = files.filter(file => path.extname(file.name) === '.css');
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));

extendedFiles.forEach((file) => {
const readStream = fs.createReadStream(path.join(styles, file.name));

readStream.on('data', data => writeStream.write(data + '\n'));
    });
});

//Сборка index.html
fs.copyFile(template, index, (err) => {
    if (err) throw err;
});

fs.readFile(template, 'utf-8', (err, data) => {
    if (err) throw err;
    const tags = data.match(/{{\w+}}/gm);

tags.forEach(tag => {
    const tagPath = path.join(__dirname, 'components', `${tag.slice(2, -2)}.html`);

fs.readFile(tagPath, 'utf-8', (err, dataTag) => {
    if (err) throw err;
    data = data.replace(tag, dataTag);

fs.rm(index, {recursive: true, force: true}, (err) => {
    if (err) throw err;
    const indexHTML = fs.createWriteStream(index);
    indexHTML.write(data);
            });
        });
    });
});