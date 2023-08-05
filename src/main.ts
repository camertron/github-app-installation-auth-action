import fetch from 'node-fetch'
import * as core from '@actions/core'
import { createAppAuth } from '@octokit/auth-app'
import { request } from '@octokit/request'
import * as fs from 'node:fs'

main()

async function main(): Promise<void> {
    const appId = core.getInput('app-id')
    const privateKey = core.getInput('private-key')
    const clientId = core.getInput('client-id')
    const clientSecret = core.getInput('client-secret')
    const installationId = core.getInput('installation-id')

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

    const token = installationAuth.token
    fs.writeFileSync(process.env["GITHUB_OUTPUT"]!, `access-token=${token}`)
}
