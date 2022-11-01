const fs = require('fs')
const path = require('path')

const pathname = path.resolve(__dirname, 'text.txt')

const stream = new fs.ReadStream(pathname)

stream.on('readable', function() {
  const data = stream.read()
  if (data != null) {
    console.log(data.toString())
  }
})