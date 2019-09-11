const core = require('@actions/core')
const { spawnSync } = require('child_process')

try {
  const image = core.getInput('image')

  const majorVersion = core.getInput('major-version')
  const minorVersion = core.getInput('minor-version')
  const patchVersion = core.getInput('patch-version')
  const latestTag = core.getInput('latest-tag')

  const tags = [
    `${majorVersion}`,
    `${majorVersion}.${minorVersion}`,
    `${majorVersion}.${minorVersion}.${patchVersion}`
  ]
  if (latestTag) {
    tags.push('latest')
  }

  const workingDir = core.getInput('working-dir')
  const options = { cwd: workingDir }

  tags.forEach((tag) => {
    const imageTag = `${image}:${tag}`

    core.startGroup(`publishing: ${imageTag}`)

    const tagChild = spawnSync('docker', ['tag', image, imageTag], options)
    console.log(`stdout: ${tagChild.stdout}`)
    console.log(`stderr: ${tagChild.stderr}`)

    if (tagChild.status !== 0) {
      core.setFailed('Failed')
      return
    }

    const pushChild = spawnSync('docker', ['push', imageTag], options)
    console.log(`stdout: ${pushChild.stdout}`)
    console.log(`stderr: ${pushChild.stderr}`)

    core.endGroup()
  })
} catch (error) {
  core.setFailed(error.message)
}
