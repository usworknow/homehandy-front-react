var AWS = require('aws-sdk')
var creds = require('../.awsConfig.json')

console.log('CF DIST:', process.env.REACT_APP_CLOUDFRONT_DIST)
var params = {
  DistributionId: process.env.REACT_APP_CLOUDFRONT_DIST,
  InvalidationBatch: { /* required */
    CallerReference: new Date().getTime().toString(), /* required */
    Paths: { /* required */
      Quantity: 1, /* required */
      Items: [
        '/index.html'
        /* more items */
      ]
    }
  }
}
if (!process.env.REACT_APP_CLOUDFRONT_DIST) { return }
var cloudfront = new AWS.CloudFront(creds)
cloudfront.createInvalidation(params, function (err, data) {
  if (err) console.log('Cloudfront Error:', err, err.stack) // an error occurred
  else console.log('Cache busted\n') // successful response
})
