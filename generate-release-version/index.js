const core = require('@actions/core')
const version = require('./version')

try {
  const majorVersion = core.getInput('major-version')

  const d = new Date()

  core.setOutput('major-version', majorVersion)
  core.setOutput('patch-version', version.minorFromDate(d))
  core.setOutput('minor-version', version.patchFromDate(d))
} catch (error) {
  core.setFailed(error.message)
}
