const { promises: fs } = require('fs');
const path = require('path');

const copyPath = path.resolve(__dirname, 'files-copy');
const originalPath = path.resolve(__dirname, 'files');
fs.rm(copyPath, { recursive: true, force: true })
  .then(() => fs.mkdir(copyPath))
  .then(() => fs.readdir(originalPath))
  .then((files) =>
    Promise.all(
      files.map((file) =>
        fs.copyFile(path.join(originalPath, file), path.join(copyPath, file))
      )
    )
  );
