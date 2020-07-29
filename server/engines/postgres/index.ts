import { Client } from "pg"

import readSchema, { TableSchemaRow } from "./queries/readSchema"
import serializer from "./serializer"
import Engine, { Schema } from "../engine"
import DatabaseConfig from "../../../types/DatabaseConfig"

class PostgresEngine implements Engine<Client> {
  client: Client | null = null
  config: DatabaseConfig | null = null

  constructor(config: DatabaseConfig) {
    this.config = config
  }

  connect = async () => {
    const client = new Client({ ...this.config, query_timeout: 5000 })
    this.client = client
    await this.client.connect()
  }

  getSchema = async () => {
    const tables = await this.client.query<TableSchemaRow>(readSchema)

    const schema: Schema = {
      tables: serializer.serializeTables(tables),
    }

    return schema
  }
}

export default PostgresEngine
