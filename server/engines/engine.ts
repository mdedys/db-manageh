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

export interface User extends Resource {
  type: "user"
  username: string
  roles: string[]
}

export interface Routine extends Resource {
  type: "routine"
  name: string
  routineType: string
  dataType: string
}

export interface Schema {
  routines: Routine[]
  tables: Table[]
  users: User[]
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
