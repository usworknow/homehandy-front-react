# Home Handy web application

## Run locally

- Make sure the API server is running.
- Run `npm install` then `npm run dev`

## Run in prod mode (without the API server locally)

Install `serve` globally on the machine using `npm i -g serve`

Run `npm run build` then `serve -s build`

Prod endpoint: " ... "

## Deploy to Dev

Create a file called  .awsConfig.json
(note the starting . )

This file must be in the following format (where the keys and region are filled in appropriately):

{
  "accessKeyId": "#######",
  "secretAccessKey": "################",
  "region": "########"
}

Then from the terminal use `commit="my commit message goes here" npm run deploy:[dev|prod]`

The .env file is specified in the build script.

The build folder will be cleared, code will be built in specified mode, code will be committed with the message from the command, and code will be pushed to S3 based on awsConfig file permissions.  Note that the "bucket" is defined in the .env files
