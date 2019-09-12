# Release Version action

This action setup an SSH key.

## Inputs

### `ssh-key`

**Required** The SSH private key (base64 encoded).

## Example usage

```yaml
- uses: themakersteam/tmt-gh-actions/setup-ssh-key@master
  with:
    ssh-key: ${{ secrets.GITHUB_DEPLOY_KEY }}
```
