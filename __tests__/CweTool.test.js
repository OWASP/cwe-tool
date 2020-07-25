'use strict'

const CweTool = require('../src/main')

describe('CweTool', () => {
  test('CweTool accepts a single CWE as a string or number and supports it', () => {
    const cweTool = new CweTool()
    const result = cweTool.getCweIds({ cweIds: '22' })
    expect(result).toBeTruthy()
    expect(result.attr['@_ID']).toBe('22')
  })

  test('CweTool accepts a single CWE as an array or number and supports it', () => {
    const cweTool = new CweTool()
    const result = cweTool.getCweIds({ cweIds: ['22'] })
    expect(result).toBeTruthy()
    expect(result.attr['@_ID']).toBe('22')
  })
})
