# Generate Release Version action

This action generates a version for a release based on the current time.

## Inputs

### `major-version`

**Required** The major version.

## Outputs

### `version`

The version.

### `major-version`

The major version.

### `minor-version`

The major version.

### `patch-version`

The patch version.

## Example usage

```yaml
- uses: themakersteam/tmt-gh-actions/generate-release-version@master
  with:
    major-version: '1'
```
