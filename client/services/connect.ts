import Request from "axios"

import LocalStorage from "./localstorage"
import DatabaseConfig from "../../types/DatabaseConfig"

function connect(config: DatabaseConfig) {
  const cached = LocalStorage.get("connections")
  const connections = cached ? JSON.parse(cached) : []
  connections.push(config)
  LocalStorage.set("connections", JSON.stringify(connections))

  return Request.post("/api/connect", config, {
    headers: { "Content-Type": "application/json" },
  })
}

export default {
  connect,
}
