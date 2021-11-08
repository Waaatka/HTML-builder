const { promises: fs } = require('fs');
const path = require('path');

const pathToStylesDir = path.join(__dirname, 'styles');

fs.readdir(pathToStylesDir).then((dir) => {
  Promise.allSettled(
    dir.map((file) => {
      const filePath = path.join(pathToStylesDir, file);
      return new Promise((resolve, reject) => {
        const chunks = [];
        fs.stat(filePath).then((stat) => {
          if (stat.isDirectory() || path.extname(file) !== '.css') {
            reject();
            return;
          }
          fs.open(filePath, 'r').then((file) => {
            const reader = file.createReadStream();
            reader.setEncoding('utf8');
            reader.on('data', (chunk) => {
              chunks.push(chunk);
            });
            reader.on('end', () => {
              resolve(chunks.join(''));
            });
          });
        });
      });
    })
  ).then((promiseResult) => {
    fs.open(path.join(__dirname, 'project-dist/bundle.css'), 'w').then(
      (file) => {
        const writer = file.createWriteStream();
        promiseResult
          .filter((x) => x.status === 'fulfilled')
          .map((promiseResult) => promiseResult.value)
          .forEach((x) => {
            writer.write(x);
          });
      }
    );
  });
});
