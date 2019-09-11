const core = require('@actions/core')
const { spawnSync } = require('child_process')

try {
  const baseImage = core.getInput('image')

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
    const imageTag = `${baseImage}:${tag}`
    core.startGroup(`publishing: ${imageTag}`)

    const tagArgs = ['tag', baseImage, `${imageTag}`]
    console.log(`executing: docker ${tagArgs.join(' ')}`)

    const tagChild = spawnSync('docker', tagArgs, options)
    console.log(`stdout: ${tagChild.stdout}`)
    console.log(`stderr: ${tagChild.stderr}`)

    if (tagChild.status !== 0) {
      core.setFailed('Failed')
      return
    }

    const pushArgs = ['push', `${imageTag}`]
    console.log(`executing: docker ${pushArgs.join(' ')}`)

    const pushChild = spawnSync('docker', pushArgs, options)
    console.log(`stdout: ${pushChild.stdout.toString()}`)
    console.log(`stderr: ${pushChild.stderr.toString()}`)

    core.endGroup()
  })
} catch (error) {
  core.setFailed(error.message)
}
