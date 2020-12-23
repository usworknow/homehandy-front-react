// This script removes files
var rimraf = require('rimraf')

rimraf('build/*', () => {
  console.log('\nBuild Folder cleared\n')
})

