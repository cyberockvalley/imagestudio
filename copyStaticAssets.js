const fs = require('fs-extra')
console.log = function() {}
try {
  fs.copySync('src/static', 'dist/client/')
  //fs.copySync('src/server/cloud', 'dist/server/cloud')

  console.log('######## static assets copy: OK ########')
} catch (err) {
  console.error('######## static assets copy: ERROR ########', err.message)
}
