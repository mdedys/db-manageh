import { Client } from "pg"

import getRoutines, { RoutineSchemaRow } from "./queries/getRoutines"
import getTables, { TableSchemaRow } from "./queries/getTables"
import getUsers, { UserSchemaRow } from "./queries/getUsers"
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
    const tablesQuery = this.client.query<TableSchemaRow>(getTables)
    const usersQuery = this.client.query<UserSchemaRow>(getUsers)
    const routinesQuery = this.client.query<RoutineSchemaRow>(getRoutines)

    const [tables, users, routines] = await Promise.all([
      tablesQuery,
      usersQuery,
      routinesQuery,
    ])

    const schema: Schema = {
      routines: serializer.serializeRoutines(routines),
      tables: serializer.serializeTables(tables),
      users: serializer.serializeUsers(users),
    }

    return schema
  }
}

export default PostgresEngine
