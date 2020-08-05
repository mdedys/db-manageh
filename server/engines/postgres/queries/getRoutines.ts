const sql = `
SELECT routine_name, 
       routine_type, 
       data_type
FROM   information_schema.routines 
WHERE  routine_schema = 'public' 
`

export type RoutineSchemaRow = {
  routine_name: string
  routine_type: string
  data_type: string
}

export default sql
