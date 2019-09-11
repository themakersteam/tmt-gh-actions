# Release Version action

This action generates a version for a release based on the current time.

## Inputs

### `major-version`

**Required** The major version.

## Outputs

### `major-version`

The major version.

### `minor-version`

The major version.

### `patch-version`

The patch version.

## Example usage

uses: themakersteam/tmt-gh-actions/release-version@master
with:
  major-version: '1'
