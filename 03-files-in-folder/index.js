const { promises: fs } = require('fs');
const path = require('path');

const pathToSecretDir = path.join(__dirname, 'secret-folder');
fs.readdir(pathToSecretDir).then((dir) => {
  dir.forEach((file) => {
    const filePath = path.join(pathToSecretDir, file);
    fs.stat(filePath).then((stat) => {
      if (stat.isDirectory()) {
        return;
      }
      console.log(
        `${path.basename(file, path.extname(file))} - ${path
          .extname(file)
          .slice(1)} - ${stat.size}b`
      );
    });
  });
});
