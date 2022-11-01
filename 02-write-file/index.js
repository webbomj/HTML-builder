const fs = require('fs')
const path = require('path')
const process = require('process')

const {stdin, stdout} = process
const pathname = path.resolve(__dirname, 'text.txt')

fs.open(pathname, 'w', (err) => {
  if (err) throw err;
  stdout.write('Plz, enter something:  ')
  stdin.on('data', data => {
    if (data !== null) {
      const dataToString = data.toString()
      if (data.toString().trim() !== 'exit') {
        fs.appendFile(pathname, dataToString, (err) => {
          if (err) throw err
        })
      } else {
        process.exit()
      }
      
    }
  })

  process.on('SIGINT', () => {
   process.exit()
  })
  
  process.on('exit', (code) => {
    if (code === 0) {
      stdout.write('Good Bye!')
    }
  })
  
})