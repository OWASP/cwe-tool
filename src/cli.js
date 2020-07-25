'use strict'

const debug = require('debug')('cwe-tool')
const yargs = require('yargs')

function isMissingOptions(parsedArgs) {
  return !parsedArgs.id && !parsedArgs.search
}

module.exports = (argv, exitProcess = false) => {
  const argvBuilder = yargs(argv)
    .version()
    .usage('Usage: cwe-tool --id <cwe-id>')
    .help('help')
    .alias('help', 'h')
    .options({
      i: {
        alias: ['id'],
        type: 'array',
        describe: 'one or more CWE IDs'
      },
      p: {
        alias: ['parent-id'],
        type: 'string',
        describe: 'filter for all CWE IDs which match the parent id'
      },
      t: {
        alias: ['indirect'],
        type: 'boolean',
        default: false,
        describe: 'allow indirect relations to parents across the tree'
      },
      s: {
        alias: ['search'],
        type: 'string',
        describe: 'filter for all CWE IDs which match a string'
      }
    })
    .example('cwe-tool --id 22')
    .example('cwe-tool --id 222 223 --parent-id 664 --indirect')
    .example('cwe-tool --search "SQL Injection"')
    .epilogue('curated by Liran Tal at https://github.com/lirantal/cwe-tool')
    .detectLocale(false)
    .exitProcess(exitProcess)

  const parsedArgs = argvBuilder.argv
  debug(`parsed the following command arguments: ${JSON.stringify(parsedArgs)}`)

  if (isMissingOptions(parsedArgs)) {
    argvBuilder.parse('--help')
    console.error()
    console.error('Missing at least one required argument: --id or --search')
    process.exit(1)
  }

  return parsedArgs
}
