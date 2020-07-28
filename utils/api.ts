import { NextApiRequest, NextApiResponse } from "next"

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type API = (req: NextApiRequest, res: NextApiResponse) => void

export type Routes = Partial<Record<Methods, API>>

export function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  routes: Routes
) {
  return new Promise(async resolve => {
    const { method } = req

    try {
      const route: API | null = routes[method]

      if (!route) {
        res.status(501).json({ message: "Not Implemented" })
        return
      }

      await route(req, res)
      resolve()
    } catch (ex) {
      console.log("ex: ", ex)
      const message =
        process.env.NODE_ENV !== "production" ? ex : "Internal Server Error"
      res.status(500).json({ message })
      resolve()
    }
  })
}
