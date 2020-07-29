import DatabaseConfig from "../../types/DatabaseConfig"

interface Resource {
  type: string
}

export interface Table extends Resource {
  type: "table"
  name: string
  schema: string
  catalog: string
}

export interface Schema {
  tables: Table[]
}

export default abstract class Engine<T> {
  client: T | null = null
  config: DatabaseConfig | null = null

  /**
   * Connect to database
   */
  abstract connect(): Promise<void>

  /**
   * Retrieve database schema
   */
  abstract getSchema(): Promise<Schema>
}
