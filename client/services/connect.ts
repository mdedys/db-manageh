import Request from "axios"

import DatabaseConfig from "../../types/DatabaseConfig"

function connect(config: DatabaseConfig) {
  return Request.post("/api/connect", config, {
    headers: { "Content-Type": "application/json" },
  })
}

export default {
  connect,
}
