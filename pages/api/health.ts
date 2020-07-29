import { NextApiRequest, NextApiResponse } from "next"

import { handler, Routes } from "../../server/utils/api"

function isHealthy(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Healthy" })
}

const routes: Routes = {
  GET: isHealthy,
}

export default function health(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res, routes)
}
