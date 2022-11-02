const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

const componentsFolder = path.resolve(__dirname, 'components')
const projectFolder = path.resolve(__dirname, 'project-dist')
const projectTemplate = path.resolve(projectFolder, 'index.html')
const assetsFolder = path.resolve(__dirname, 'assets')
const stylesFolder = path.resolve(__dirname, 'styles')

const templateFile = path.resolve(__dirname, 'template.html')

let template = ''

fsPromises.mkdir(projectFolder, {recursive: true}, err => {
  if(err) throw err
});

fs.open(projectTemplate, 'w', (err) => {if (err) throw err})

fsPromises.readFile(templateFile, {}, (err, data) => {})
  .then(async (data) => {
    template = data.toString()
    await replaceTags() 
  })

async function replaceTags() {
  await fsPromises.readdir(componentsFolder, null).then(async (files) => {
    await files.forEach(async (file) => {
      const tagName = file.split('.')[0]
      const tag = `{{${tagName}}}`
      const componentFile = path.resolve(componentsFolder, file)
      await fsPromises.readFile(componentFile, (err, data) => {})
      .then(data => {
        template = template.replace(tag, data.toString())
      })
      .then(async () => {
        await fsPromises.writeFile(projectTemplate, template, () => {})
      })
    })
  })
}

const styleFolder = path.resolve(__dirname, 'styles')
const bundlePath = path.resolve(__dirname, 'project-dist')
const bundleFile = path.resolve(bundlePath, 'style.css')

fs.open(bundleFile, 'w', (err) => {if (err) throw err})

const stream = new fs.ReadStream(bundleFile)
stream.on('readable', function() {
  const data = stream.read()
  if (data != null) {
    fs.unlink(bundleFile, err => {
      if(err) throw err;
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

const newFolder = path.resolve(projectFolder, 'assets')
const dir = path.resolve(__dirname, 'assets')

fsPromises.mkdir(newFolder, {recursive: true}, err => {
  if(err) throw err
});

function copyDir(dir, name) {

  fs.readdir(dir, {withFileTypes: true} , (err, allDir) => {
    allDir.forEach(async (el) => {
      const filePath = path.resolve(__dirname, 'assets', name, el.name)  //в 1 проход это папки, потом файлы
      const newFilePath = path.resolve(newFolder, name, el.name)
      if (el.isDirectory()) {
        await fsPromises.mkdir(newFilePath, {recursive: true}, err => {
          if(err) throw err
        });
        copyDir(filePath, el.name)
      } else {
        fs.copyFile(filePath, newFilePath, (err) => {
          if (err) throw err
        } )
      }
      
      
    })
  })


}

copyDir(dir, '')