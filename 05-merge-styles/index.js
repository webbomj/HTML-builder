const fs = require('fs')
const path = require('path')

const styleFolder = path.resolve(__dirname, 'styles')
const bundlePath = path.resolve(__dirname, 'project-dist')
const bundleFile = path.resolve(bundlePath, 'bundle.css')

fs.open(bundleFile, 'w', (err) => {if (err) throw err})

const stream = new fs.ReadStream(bundleFile)
stream.on('readable', function() {
  const data = stream.read()
  if (data != null) {
    fs.unlink(bundleFile, err => {
      if(err) throw err;
      console.log('Файл успешно удалён');
   });
  }
})

fs.readdir(styleFolder, {}, (err, allStyles) => {
  allStyles.forEach((el) => {
    const styleFile = path.resolve(__dirname, 'styles', el)
    const fileExt = path.extname(styleFile)
    if (fileExt === '.css') {
      const stream = new fs.ReadStream(styleFile)
      stream.on('readable', function() {
        const data = stream.read()
        if (data != null) {
          const dataToString = data.toString()
          fs.appendFile(bundleFile, dataToString, (err) => {
            if (err) throw err
          })
        }
      })
    }
  })
})