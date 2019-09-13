const core = require('@actions/core')
const version = require('./version')

try {
  const d = new Date()

  const majorVersion = core.getInput('major-version')
  const minorVersion = version.minorFromDate(d)
  const patchVersion = version.patchFromDate(d)

  core.setOutput('version', `${majorVersion}.${minorVersion}.${patchVersion}`)

  core.setOutput('major-version', majorVersion)
  core.setOutput('minor-version', minorVersion)
  core.setOutput('patch-version', patchVersion)
} catch (error) {
  core.setFailed(error.message)
}
