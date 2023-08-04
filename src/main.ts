import * as core from '@actions/core'
import { createAppAuth } from '@octokit/auth-app'
import * as fs from 'node:fs'

main()

async function main(): Promise<void> {
    const appId = core.getInput('app-id')
    const privateKey = core.getInput('private-key')
    const clientId = core.getInput('client-id')
    const clientSecret = core.getInput('client-secret')
    const installationId = core.getInput('installation-id')

    const auth = createAppAuth({appId, privateKey, clientId, clientSecret})

    const installationAuth = await auth({
        type: 'installation',
        installationId: installationId
    })

    const token = installationAuth.token
    fs.writeFileSync(process.env["GITHUB_OUTPUT"]!, `access-token=${token}`)
}
