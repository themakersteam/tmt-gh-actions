# Release Version action

This action tags an image with semver tags.

## Inputs

### `working-dir`

**Required** The working directory. Default `.`.

### `image`

**Required** The image to release.

### `major-version`

**Required** The major version.

### `minor-version`

**Required** The minor version.

### `patch-version`

**Required** The patch version.

### `latest-tag`

**Required** Should a latest tag be also created and pushed. Default: "true".

## Example usage

uses: themakersteam/tmt-gh-actions/publish-docker-image-release@master
with:
  major-version: '1'
