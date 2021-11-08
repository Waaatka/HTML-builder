const { promises: fs } = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'text.txt'), 'r').then((file) => {
  const stream = file.createReadStream();
  stream.setEncoding('UTF8');
  stream.on('data', (chunk) => {
    console.log(chunk);
  });
});
