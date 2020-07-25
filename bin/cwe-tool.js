#!/usr/bin/env node
'use strict'

const CweTool = require('../src/main')
const cli = require('../src/cli')

const options = cli(process.argv)

if (options.id && Array.isArray(options.id) && options.id.length > 0) {
  const cweTool = new CweTool()

  const result = cweTool.getCweIds({
    cweIds: options.id,
    indirect: options.indirect,
    parentId: options.parentId
  })

  if (result) {
    console.log(JSON.stringify(result))
  }
}
