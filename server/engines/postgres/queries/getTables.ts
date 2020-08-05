const sql = `
SELECT * 
FROM   information_schema.tables 
WHERE  table_schema = 'public' 
`

export type TableSchemaRow = {
  commit_action: string | null
  is_insertable_into: string | null
  is_typed: string | null
  reference_generation: string | null
  self_referencing_column_name: string | null
  table_catalog: string | null
  table_name: string | null
  table_schema: string | null
  table_type: string | null
  user_defined_type_catalog: string | null
  user_defined_type_name: string | null
  user_defined_type_schema: string | null
}

export default sql
