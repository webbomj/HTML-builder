const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')

const newFolder = path.resolve(__dirname, 'files-copy')
const dir = path.resolve(__dirname, 'files')

function copyDir() {
  fsPromises.mkdir(newFolder, {recursive: true}, err => {
    if(err) throw err
  });

  fs.readdir(dir, (err, allDir) => {
    allDir.forEach((el) => {
      const filePath = path.resolve(__dirname, 'files', el)
      const newFilePath = path.resolve(newFolder, el)
      console.log(filePath, el)
      fs.copyFile(filePath, newFilePath, (err) => {
        if (err) throw err
      } )
    })
  })


}

copyDir()