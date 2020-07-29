import { QueryResult } from "pg"

import { TableSchemaRow } from "./queries/readSchema"
import { Table } from "../engine"

function serializeTables(result: QueryResult<TableSchemaRow>): Table[] {
  return result.rows.map(r => ({
    type: "table",
    name: r.table_name,
    schema: r.table_schema,
    catalog: r.table_catalog,
  }))
}

export default {
  serializeTables,
}
