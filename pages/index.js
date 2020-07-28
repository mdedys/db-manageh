import Head from "next/head"

import { withStyles } from "@material-ui/core/styles"
import MuiContainer from "@material-ui/core/Container"
import MuiTextField from "@material-ui/core/TextField"

import useInput from "../hooks/useInput"

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
  const [username, onChangeUsername] = useInput("")
  const [password, onChangePassword] = useInput("")
  const [server, onChangeServer] = useInput("")
  const [database, onChangeDatabase] = useInput("")
  const [port, onChangePort] = useInput("5432")

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
          value={server}
          onChange={onChangeServer}
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
          value={username}
          onChange={onChangeUsername}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          placeholder="Password"
          password={password}
          onChange={onChangePassword}
        />
      </Container>
    </>
  )
}
