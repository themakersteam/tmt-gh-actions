# Setup Deploy Key action

This action setup an SSH key.

## Inputs

### `ssh-key`

**Required** The SSH private key (base64 encoded).

## Example usage

```yaml
- uses: themakersteam/tmt-gh-actions/setup-ssh-key@master
  with:
    ssh-key: ${{ secrets.GITHUB_DEPLOY_KEY }}
- uses: themakersteam/tmt-gh-actions/setup-deploy-key@master
  id: ssh-key
  with:
    ssh-key: ${{ secrets.GITHUB_DEPLOY_KEY }}

- run: |
    eval $(ssh-agent)
    ssh-add $SSH_KEY_FILE
  env:
    SSH_KEY_FILE: ${{ steps.ssh-key.outputs.key-file }}
```
