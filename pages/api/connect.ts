import { NextApiRequest, NextApiResponse } from "next"

import buildEngine from "../../server/engines/factory"
import { handler, Routes } from "../../server/utils/api"
import { serializeCookie } from "../../server/utils/cookies"

interface ConnectPayload {
  host: string
  port: number
  database: string
  user: string
  password: string
}

async function createConnection(req: NextApiRequest, res: NextApiResponse) {
  const { host, database, port, user, password } = req.body as ConnectPayload
  console.log("req.body: ", req.body)

  if (!host || !database || !user || !password) {
    res.status(400).json({ message: "Bad Request" })
    return
  }

  const db = buildEngine("postgres", {
    host,
    database,
    user,
    password: password,
    port: port,
  })

  await db.connect()

  res.setHeader(
    "Set-Cookie",
    serializeCookie({ host, database, user, password, port })
  )

  res.status(204).end()
}

const routes: Routes = {
  POST: createConnection,
}

export default function connect(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res, routes)
}
