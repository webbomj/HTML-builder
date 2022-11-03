const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')

const newFolder = path.resolve(__dirname, 'files-copy')
const dir = path.resolve(__dirname, 'files')

function copyDir() {

  fs.readdir(newFolder, (err, files) => {
    if(err) {}
    else {
      files.forEach((el) => {
        const direct = path.resolve(newFolder, el)
        fs.unlink(direct, err => {
          if(err) throw err; 
       });
      })
      
    }
    
 });

// fs.rmdir(newFolder, err => {
//   if(err) throw err;
// });
  

  fsPromises.mkdir(newFolder, {recursive: true}, err => {
    if(err) throw err
  });

  fs.readdir(dir, (err, allDir) => {
    allDir.forEach((el) => {
      const filePath = path.resolve(__dirname, 'files', el)
      const newFilePath = path.resolve(newFolder, el)
      fs.copyFile(filePath, newFilePath, (err) => {
        if (err) throw err
      } )
    })
  })


}

copyDir()