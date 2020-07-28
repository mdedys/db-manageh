import { NextApiRequest, NextApiResponse } from "next"

import db from "../../engines/postgres"
import { handler, Routes } from "../../utils/api"

interface ConnectPayload {
  server: string
  port: number
  database: string
  username: string
  password: string
}

async function createConnection(req: NextApiRequest, res: NextApiResponse) {
  const {
    server,
    database,
    port,
    username,
    password,
  } = req.body as ConnectPayload

  if (!server || !database || !username || !password) {
    res.status(400).json({ message: "Bad Request" })
    return
  }

  const client = await db.connect({
    host: server,
    database,
    user: username,
    password: password,
    port: port,
  })

  const schema = await client.query(db.queries.readSchema)
  res.status(200).json({ tables: schema.rows || [] })
}

const routes: Routes = {
  POST: createConnection,
}

export default function connect(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res, routes)
}
