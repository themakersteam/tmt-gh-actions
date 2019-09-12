const core = require('@actions/core')
const fs = require('fs')
const { spawnSync } = require('child_process')

try {
  if (fs.existsSync(`${process.env.HOME}/.ssh`)) {
    fs.chmodSync(`${process.env.HOME}/.ssh`, 0o700)
  } else {
    fs.mkdirSync(`${process.env.HOME}/.ssh`, 0o700)
  }

  const sshKey = core.getInput('ssh-key')
  const buffer = Buffer.from(sshKey, 'base64')

  fs.writeFileSync(`${process.env.HOME}/.ssh/deploy_key`, buffer)
  fs.chmodSync(`${process.env.HOME}/.ssh/deploy_key`, 0o400)

  // Trust github.com
  const sshKeyScan = spawnSync('ssh-keyscan', ['-t', 'rsa', 'github.com'])
  console.log(`stdout: ${sshKeyScan.stdout.toString()}`)
  console.log(`stderr: ${sshKeyScan.stderr.toString()}`)
  fs.writeFileSync(`${process.env.HOME}/.ssh/known_hosts`, sshKeyScan.stdout.toString())
  fs.chmodSync(`${process.env.HOME}/.ssh/known_hosts`, 0o600)

  // Add the key to the SSH agent
  const sshAdd = spawnSync('ssh-add', [`${process.env.HOME}/.ssh/deploy_key`])
  console.log(`stdout: ${sshAdd.stdout.toString()}`)
  console.log(`stderr: ${sshAdd.stderr.toString()}`)
} catch (error) {
  core.setFailed(error.message)
}
