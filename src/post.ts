import * as core from "@actions/core";
import { request } from "@octokit/request";
import fetch from 'node-fetch'

const token = core.getState('access-token')

request("DELETE /installation/token", {
  headers: {
    authorization: `token ${token}`,
  },
  options: {
    request: {
      fetch: fetch,
    },
  }
}).then(() => {
    core.info("Token revoked")
}).catch((error) => {
    console.error(error)
    core.setFailed(error.message)
})
