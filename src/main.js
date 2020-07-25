/* eslint-disable security/detect-object-injection */
'use strict'

const debug = require('debug')('cwe-tool')
const { CweManager } = require('cwe-sdk')
const CWEDictionary = require('cwe-sdk/raw/cwe-dictionary.json')

module.exports = class CweTool {
  constructor() {
    this.cweManager = new CweManager()
  }

  getCweIds({ cweIds, parentId, indirect = false }) {
    let cweIdList = cweIds
    if (!Array.isArray(cweIds)) {
      cweIdList = [cweIds]
    }

    if (parentId) {
      return this.getCweIdsByParent({ cweIds: cweIdList, parentId, indirect })
    }

    const cweId = cweIdList[0]
    debug(`found [${!!cweId}] status for child/parent: [${cweId}/${parentId}]`)
    return this.getOneCweId({ cweId })
  }

  getCweIdsByParent({ cweIds, indirect = false, parentId }) {
    const cweList = []
    cweIds.forEach(cweId => {
      const result = this.cweManager.isChildOf({
        weaknessId: String(cweId),
        parentId: String(parentId),
        indirect
      })
      debug(`found [${result}] status for child/parent: [${cweId}/${parentId}]`)
      if (result) {
        cweList.push(CWEDictionary[cweId])
      }
    })

    return cweList
  }

  getOneCweId({ cweId }) {
    return CWEDictionary[cweId]
  }
}
