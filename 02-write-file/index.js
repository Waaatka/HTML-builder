const { promises: fs } = require('fs');
const readline = require('readline');
const process = require('process');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(path.join(__dirname, 'text.txt'), 'w').then((file) => {
  const stream = file.createWriteStream();
  rl.setPrompt('Enter your text: ');
  rl.prompt();
  rl.on('line', (line) => {
    stream.write(line + '\n');
    rl.prompt();
  });
});

process.on('exit', () => {
  rl.close();
  console.log('\nGood bye!');
});
