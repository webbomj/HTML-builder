const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')

const dir = path.resolve(__dirname, 'secret-folder')

async function getStats(dir) {
  let size;
  let ext = path.extname(dir);
  await fsPromises.stat(dir).then((data) => size = data.size)
  return {
    ext, size
  }
}

function getNameFile(file) {
  return file.split('.')[0]
}

function getExtFile(ext) {
  return ext.split('.')[1]
}

function getSizeFile(size) {
  return `${Math.trunc((size / 1024) * 1000) / 1000}kb`
}

fs.readdir(dir, {withFileTypes: true}, (err, allDir) => {
  if (err) throw err
  allDir.forEach(async (el) => {
    if (!(el.isDirectory())) {
      const elDir = path.resolve(dir, el.name)
      const {size, ext} = await getStats(elDir)
      console.log(getNameFile(el.name), '-' , getExtFile(ext), '-' , getSizeFile(size))
    }
  })
})


