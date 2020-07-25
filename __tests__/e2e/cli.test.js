/* eslint-disable security/detect-child-process */
'use strict'

const path = require('path')
const childProcess = require('child_process')

const cliExecPath = path.join(__dirname, '..', '..', 'bin', 'cwe-tool.js')

describe('CLI tests', () => {
  test('When not providing a CWE ID, an error is returned', done => {
    const process = childProcess.spawn('node', [cliExecPath])

    let stdout = ''
    process.stderr.on('data', chunk => {
      stdout += chunk
    })

    process.on('close', exitCode => {
      expect(stdout).toContain('Missing required argument: i')
      expect(exitCode).toBe(1)
      done()
    })
  })

  test('When providing several CWE IDs with a parent it should return JSON array of matches', done => {
    const process = childProcess.spawn('node', [
      cliExecPath,
      '--id',
      '222',
      '223',
      '--parent-id',
      '221'
    ])

    let stdout = ''
    process.stdout.on('data', chunk => {
      stdout += chunk
    })

    process.on('close', exitCode => {
      const cweIds = JSON.parse(stdout)

      expect(cweIds.length).toBe(2)

      // first element:
      expect(cweIds[0]['attr']).toEqual(
        expect.objectContaining({
          '@_ID': '222',
          '@_Name': 'Truncation of Security-relevant Information'
        })
      )
      expect(cweIds[0]).toEqual(
        expect.objectContaining({
          Description:
            'The application truncates the display, recording, or processing of security-relevant information in a way that can obscure the source or nature of an attack.'
        })
      )

      // second element:
      expect(cweIds[1]['attr']).toEqual(
        expect.objectContaining({
          '@_ID': '223',
          '@_Name': 'Omission of Security-relevant Information'
        })
      )
      expect(cweIds[1]).toEqual(
        expect.objectContaining({
          Description:
            'The application does not record or display information that would be important for identifying the source or nature of an attack, or determining if an action is safe.'
        })
      )
      expect(exitCode).toBe(0)
      done()
    })
  })

  test('When providing a CWE ID with an indirect parent and allowing indirect it should return JSON array of the match', done => {
    const process = childProcess.spawn('node', [
      cliExecPath,
      '--id',
      '23',
      '--parent-id',
      '664',
      '--indirect'
    ])

    let stdout = ''
    process.stdout.on('data', chunk => {
      stdout += chunk
    })

    process.on('close', exitCode => {
      const cweIds = JSON.parse(stdout)

      expect(cweIds.length).toBe(1)
      expect(cweIds[0]['attr']).toEqual(
        expect.objectContaining({
          '@_ID': '23',
          '@_Name': 'Relative Path Traversal'
        })
      )
      expect(cweIds[0]).toEqual(
        expect.objectContaining({
          Description:
            'The software uses external input to construct a pathname that should be within a restricted directory, but it does not properly neutralize sequences such as ".." that can resolve to a location that is outside of that directory.'
        })
      )
      expect(exitCode).toBe(0)
      done()
    })
  })

  test('When providing a CWE ID with an indirect parent and disallowing indirectness it should return an empty JSON array', done => {
    const process = childProcess.spawn('node', [cliExecPath, '--id', '23', '--parent-id', '664'])

    let stdout = ''
    process.stdout.on('data', chunk => {
      stdout += chunk
    })

    process.on('close', exitCode => {
      const cweIds = JSON.parse(stdout)
      expect(cweIds.length).toBe(0)
      expect(exitCode).toBe(0)
      done()
    })
  })

  test('When provided just a CWE ID return its data', done => {
    const process = childProcess.spawn('node', [cliExecPath, '--id', '23'])

    let stdout = ''
    process.stdout.on('data', chunk => {
      stdout += chunk
    })

    process.on('close', exitCode => {
      const cweId = JSON.parse(stdout)

      expect(cweId['attr']).toEqual(
        expect.objectContaining({
          '@_ID': '23',
          '@_Name': 'Relative Path Traversal'
        })
      )
      expect(cweId).toEqual(
        expect.objectContaining({
          Description:
            'The software uses external input to construct a pathname that should be within a restricted directory, but it does not properly neutralize sequences such as ".." that can resolve to a location that is outside of that directory.'
        })
      )
      expect(exitCode).toBe(0)
      done()
    })
  })
})
