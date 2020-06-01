const fs = require('fs-extra')
console.log = function() {}
try {
  fs.copySync('src/client/res', 'dist/client/res')

  console.log('######## static assets copy: OK ########')
} catch (err) {
  console.error('######## static assets copy: ERROR ########', err.message)
}
