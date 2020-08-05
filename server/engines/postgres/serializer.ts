import { QueryResult } from "pg"

import { RoutineSchemaRow } from "./queries/getRoutines"
import { TableSchemaRow } from "./queries/getTables"
import { UserSchemaRow } from "./queries/getUsers"
import { Table, User, Routine } from "../engine"

function serializeTables(result: QueryResult<TableSchemaRow>): Table[] {
  return result.rows.map(r => ({
    type: "table",
    name: r.table_name,
    schema: r.table_schema,
    catalog: r.table_catalog,
  }))
}

function serializeUsers(result: QueryResult<UserSchemaRow>): User[] {
  return result.rows.map(r => ({
    type: "user",
    username: r.username,
    roles: (r.role_attributes && r.role_attributes.split(",")) || [],
  }))
}

function serializeRoutines(result: QueryResult<RoutineSchemaRow>): Routine[] {
  return result.rows.map(r => ({
    type: "routine",
    name: r.routine_name,
    routineType: r.routine_type,
    dataType: r.data_type,
  }))
}

export default {
  serializeRoutines,
  serializeTables,
  serializeUsers,
}
