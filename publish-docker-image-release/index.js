const core = require('@actions/core')
const { spawnSync } = require('child_process')

try {
  const workingDir = core.getInput('working-dir')
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

  const commands = [
    ['tag', image],
    ['push']
  ]

  if (latestTag) {
    tags.push('latest')
  }

  tags.forEach((tag) => {
    commands.forEach((args) => {
      core.startGroup('executing: docker ', args.concat(`${image}:${tag}`).join(' '))

      const child = spawnSync('docker', args.concat(`${image}:${tag}`), { cwd: workingDir })
      console.log(`stdout: ${child.stdout}`)
      console.log(`stderr: ${child.stderr}`)

      if (child.status !== 0) {
        core.setFailed('Failed')
      }
      core.endGroup()
    })
  })
} catch (error) {
  core.setFailed(error.message)
}
