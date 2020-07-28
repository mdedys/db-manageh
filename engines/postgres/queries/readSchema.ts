const sql = `
SELECT * FROM information_schema.tables
WHERE table_schema = 'public'
`

export default sql
