import React from "react"
import MuiTable from "@material-ui/core/Table"
import MuiTableBody from "@material-ui/core/TableBody"
import MuiTableCell from "@material-ui/core/TableCell"
import MuiTableContainer from "@material-ui/core/TableContainer"
import MuiTableHead from "@material-ui/core/TableHead"
import MuiTableRow from "@material-ui/core/TableRow"

import { Table } from "../../../server/engines/engine"

interface SchemaTableProps {
  tables: Table[]
}

export default function SchemaTable(props: SchemaTableProps) {
  return (
    <MuiTableContainer>
      <MuiTable>
        <MuiTableHead>
          <MuiTableRow>
            <MuiTableCell>Name</MuiTableCell>
            <MuiTableCell>Schema</MuiTableCell>
            <MuiTableCell>Catalog</MuiTableCell>
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {props.tables.map(table => (
            <MuiTableRow key={table.name}>
              <MuiTableCell>{table.name}</MuiTableCell>
              <MuiTableCell>{table.schema}</MuiTableCell>
              <MuiTableCell>{table.catalog}</MuiTableCell>
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  )
}
