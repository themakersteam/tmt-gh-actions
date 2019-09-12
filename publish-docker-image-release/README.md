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

```yaml
- uses: themakersteam/tmt-gh-actions/generate-release-version@master
  id: release
  with:
    major-version: '1'

- uses: themakersteam/tmt-gh-actions/publish-docker-image-release@master
  with:
    image: docker-image:latest
    major-version: ${{ steps.release.outputs.major-version }}
    minor-version: ${{ steps.release.outputs.minor-version }}
    patch-version: ${{ steps.release.outputs.patch-version }}
```
