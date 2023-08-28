import * as core from "@actions/core";
import { request } from "@octokit/request";

const token = core.getState('access-token')

request("DELETE /installation/token", {
  headers: {
    authorization: `token ${token}`,
  },
}).then(() => {
    core.info("Token revoked")
}).catch((error) => {
    console.error(error)
    core.setFailed(error.message)
})
