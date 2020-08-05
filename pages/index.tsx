import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { styled } from "@material-ui/core/styles"
import MuiContainer from "@material-ui/core/Container"
import MuiDivider from "@material-ui/core/Divider"
import NoSSR from "@material-ui/core/NoSsr"

import ConnectionForm from "../client/components/connect/ConnectionForm"
import ConnectionList from "../client/components/connect/ConnectionList"
import ConnectAPI from "../client/services/connect"
import DatabaseConfig from "../types/DatabaseConfig"

const Container = styled(MuiContainer)({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
})

const Divider = styled(MuiDivider)({
  margin: "0 2rem",
  height: "512px",
})

export default function Home() {
  const router = useRouter()

  const onConnect = (config: DatabaseConfig, save = false) => {
    ConnectAPI.connect(config).then(() => {
      router.push(`/database/${config.database}?engine=pg`)
    })
  }

  return (
    <NoSSR>
      <Head>
        <title>db manageh</title>
      </Head>
      <Container>
        <ConnectionForm onConnect={onConnect} />
        <Divider orientation="vertical" />
        <ConnectionList onClickConnection={onConnect} />
      </Container>
    </NoSSR>
  )
}
