#!/usr/bin/env node
/* eslint-disable no-process-exit */
'use strict'

const CweTool = require('../src/main')
const cli = require('../src/cli')

const options = cli(process.argv)

if (options.id && Array.isArray(options.id) && options.id.length > 0) {
  const cweTool = new CweTool()

  let result = []
  result = cweTool.getCweIds({
    cweIds: options.id,
    indirect: options.indirect,
    parentId: options.parentId
  })

  console.log(JSON.stringify(result))
}

if (options.search) {
  const cweTool = new CweTool()

  let result = []
  result = cweTool.getCweByName({ searchString: options.search })

  console.log(JSON.stringify(result))
}
