## github-app-installation-auth-action

This is a simple action for fetching an access token for a GitHub App installation. GitHub Apps can themselves make API requests for the org they belong to, but they can also be "installed" into other orgs and given specific permissions to access resources inside that org. Once an access token has been obtained for an installation, it may be used to make API requests for the resources the installation has been granted access to.

## Inputs

|Name|Type|Description|
|-|-|-|
|`app-id`|String|The ID of the GitHub App.|
|`installation-id`|String|The ID of the installation to fetch a token for.|
|`client-id`|String|The App's client ID.|
|`client-secret`|String|A client secret associated with the App.|
|`private-key`|String|An RSA private key associated with the App.|

All of these can be managed via the GitHub UI, in the App's settings. The `app-id`, `installation-id`, and `client-id` are not sensitive and can be stored in environment variables or hard-coded. The `client-secret` and `private-key` are very sensitive and should be stored securely, probably using [GitHub encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Outputs

|Name|Type|Description|
|-|-|-|
|`access-token`|String|An access token for the given installation.|

## Example

The following example fetches an access token for an App installation and uses it to check out a repository. It assumes sensitive credentials like the `client-secret` and `private-key` are stored via GitHub encrypted secrets while the non-sensitive credentials are stored as [variables](https://docs.github.com/en/actions/learn-github-actions/variables).

```yaml
jobs:
  checkout:
    runs-on: ubuntu-latest
    steps:
      - id: get-access-token
        uses: camertron/github-app-installation-auth-action@v1
        with:
          app-id: ${{ vars.APP_ID }}
          installation-id: ${{ vars.APP_INSTALLATION_ID }}
          client-id: ${{ vars.APP_CLIENT_ID }}
          client-secret: ${{ secrets.APP_CLIENT_SECRET }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
      - uses: actions/checkout@v3
        with:
          token: ${{ steps.get-access-token.outputs.access-token }}
```

## License

Licensed under the MIT license. See LICENSE for details.

## Authors

* Cameron C. Dutro: http://github.com/camertron
