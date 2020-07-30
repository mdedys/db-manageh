import React from "react"
import { NextPageContext } from "next"

import SchemaTable from "../../client/components/database/SchemaTable"
import buildEngine from "../../server/engines/factory"
import { CONFIG_COOKIE, getCookie } from "../../server/utils/cookies"
import { Schema } from "../../server/engines/engine"

interface DatabaseProps {
  connected: boolean
  schema: Schema
}

export default function Database(props: DatabaseProps) {
  return (
    <div>
      <SchemaTable
        tables={props.schema.tables.sort((a, b) =>
          a.name.localeCompare(b.name)
        )}
      />
    </div>
  )
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
