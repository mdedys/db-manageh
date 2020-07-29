import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { withStyles } from "@material-ui/core/styles"
import MuiButton from "@material-ui/core/Button"
import MuiContainer from "@material-ui/core/Container"
import MuiTextField from "@material-ui/core/TextField"

import useInput from "../client/hooks/useInput"
import ConnectAPI from "../client/services/connect"

const Container = withStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: "1rem",
  },
})(MuiContainer)

const TextField = withStyles({
  root: {
    marginBottom: "1.5rem",
  },
})(MuiTextField)

export default function Home() {
  const router = useRouter()

  const [user, onChangeUser] = useInput("")
  const [password, onChangePassword] = useInput("")
  const [host, onChangeHost] = useInput("")
  const [database, onChangeDatabase] = useInput("")
  const [port, onChangePort] = useInput("5432")

  const onConnect = () => {
    ConnectAPI.connect({
      user,
      password,
      host,
      database,
      port: parseInt(port),
    }).then(() => {
      router.push(`/database/${database}?engine=pg`)
    })
  }

  return (
    <>
      <Head>
        <title>db manageh</title>
      </Head>
      <Container maxWidth="sm">
        <TextField
          fullWidth
          variant="outlined"
          label="Database Server"
          placeholder="Database Server"
          value={host}
          onChange={onChangeHost}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Database"
          placeholder="Database"
          value={database}
          onChange={onChangeDatabase}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Port"
          placeholder="Port"
          value={port}
          onChange={onChangePort}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          placeholder="Username"
          value={user}
          onChange={onChangeUser}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <MuiButton onClick={onConnect}>Connect</MuiButton>
      </Container>
    </>
  )
}
