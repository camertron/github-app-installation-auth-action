import fetch from 'node-fetch'
import * as core from '@actions/core'
import { createAppAuth } from '@octokit/auth-app'
import { request } from '@octokit/request'
import * as crypto from 'node:crypto'

main()

async function main(): Promise<void> {
    const appId = core.getInput('app-id')
    const privateKey = core.getInput('private-key')
    const clientId = core.getInput('client-id')
    const clientSecret = core.getInput('client-secret')
    const installationId = core.getInput('installation-id')
    const shouldEncrypt = core.getBooleanInput('encrypt')

    const req = request.defaults({request: {fetch}})
    const auth = createAppAuth({
        appId,
        privateKey,
        clientId,
        clientSecret,
        request: req
    })

    const installationAuth = await auth({
        type: 'installation',
        installationId: installationId
    })

    let token = installationAuth.token

    if (shouldEncrypt) {
        const pubKey = crypto.createPublicKey({
            key: privateKey,
            format: 'pem'
        })

        const encrypted = crypto.publicEncrypt(pubKey, Buffer.from(token))
        token = encrypted.toString('base64')
    }

    // Register the token with the runner as a secret to ensure it is masked in logs
    core.setSecret(token);

    core.setOutput('access-token', token);

    // Make token accessible to post function (so we can invalidate it)
    core.saveState('access-token', token);
}
