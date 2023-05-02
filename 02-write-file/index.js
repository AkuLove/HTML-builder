const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');
const input = fs.createWriteStream(path.join(__dirname, 'text.txt'));


stdout.write('Введите текст\n');
stdin.on('data', (text) => {
    if (text.toString().trim() === 'exit') {
    exit();
    }
    input.write(text);
});


process.on('exit', () => stdout.write('До свидания =D'));
process.on('SIGINT', exit);