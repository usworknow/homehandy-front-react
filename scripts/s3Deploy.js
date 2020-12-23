var s3 = require('s3')
var FileSystem = require('fs')
const pathModule = require('path')

var awsJson = JSON.parse(FileSystem.readFileSync('.awsConfig.json', 'utf8'))

const appDirectory = FileSystem.realpathSync(process.cwd())
const resolveApp = relativePath => pathModule.resolve(appDirectory, relativePath)

// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
var client = s3.createClient({
  s3Options: awsJson
})

function runS3Deploy () {
  console.log('bucket', process.env.REACT_APP_S3_BUCKET)
  //**************
  //
  // Appropriate Bucket must be set
  //
  //**************
  const bucket = process.env.REACT_APP_S3_BUCKET
  var params = {
    localDir: resolveApp('build'),
    deleteRemoved: true,
    s3Params: {
      Bucket: bucket
    }
  }
  return new Promise((resolve, reject) => {
    var uploader = client.uploadDir(params)
    uploader.on('error', function (err) {
      return reject(err)
    })
    uploader.on('progress', function () {
      if (uploader.progressAmount > 0 || uploader.progressTotal > 0) {
        console.log('progress', uploader.progressAmount, uploader.progressTotal)
      }
    })
    uploader.on('end', function () {
      return resolve()
    })
  })
}

runS3Deploy()
