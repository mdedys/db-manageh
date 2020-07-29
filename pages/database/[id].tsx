import React from "react"
import { NextPageContext } from "next"

import buildEngine from "../../server/engines/factory"
import { CONFIG_COOKIE, getCookie } from "../../server/utils/cookies"

export default function Database(props) {
  console.log("props: ", props)
  return <div>Hello!</div>
}

export async function getServerSideProps(ctx: NextPageContext) {
  const cookie = getCookie(ctx.req.headers.cookie || "", CONFIG_COOKIE)

  if (!cookie) {
    ctx.res.writeHead(302, { Location: "/" })
    ctx.res.end()

    return {
      props: {},
    }
  }

  const db = buildEngine("postgres", JSON.parse(cookie))
  await db.connect()

  const schema = await db.getSchema()

  return {
    props: {
      connected: true,
      schema,
    },
  }
}
