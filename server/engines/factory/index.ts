import Postgres from "../postgres"
import Engine from "../engine"
import DatabaseConfig from "../../../types/DatabaseConfig"

export default function buildEngine(
  type: string,
  config: DatabaseConfig
): Engine<any> {
  switch (type) {
    case "postgres":
      return new Postgres(config)
    default:
      throw new Error(`Type: ${type} is not supported`)
  }
}
