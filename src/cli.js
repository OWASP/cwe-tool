'use strict'

const debug = require('debug')('cwe-tool')
const yargs = require('yargs')

module.exports = (argv, exitProcess = false) => {
  const parsedArgs = yargs(argv)
    .version()
    .usage('Usage: cwe-tool --id <cwe-id>')
    .help('help')
    .alias('help', 'h')
    .options({
      i: {
        alias: ['id'],
        type: 'array',
        describe: 'one or more CWE IDs',
        demandOption: true
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
      }
    })
    .example('cwe-tool --id 22')
    .example('cwe-tool --id 222 223 --parent-id 664 --indirect')
    .epilogue('curated by Liran Tal at https://github.com/lirantal/cwe-tool')
    .detectLocale(false)
    .fail((msg, err, yargs) => {
      console.error(yargs.help())
      console.error()
      console.error(msg)
      debug(`command line error, stack trace:`)
      debug(err)
      process.exit(1)
    })
    .exitProcess(exitProcess).argv

  debug(`parsed the following command arguments: ${JSON.stringify(parsedArgs)}`)
  return parsedArgs
}
