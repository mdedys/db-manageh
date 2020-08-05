import React from "react"

import { styled } from "@material-ui/core/styles"
import MuiButton from "@material-ui/core/Button"
import MuiPaper from "@material-ui/core/Paper"
import MuiTextField from "@material-ui/core/TextField"
import MuiFormControlLabel from "@material-ui/core/FormControlLabel"
import MuiCheckbox from "@material-ui/core/Checkbox"

import useInput from "../../hooks/useInput"
import DatabaseConfig from "../../../types/DatabaseConfig"

const Container = styled(MuiPaper)({
  maxWidth: "487px",
  width: "100%",
  padding: "1.5rem",
})

const TextField = styled(MuiTextField)({
  marginBottom: "1rem",
})

const Button = styled(MuiButton)({
  marginTop: "0.5rem",
  width: "100%",
})

interface ConnectionFormProps {
  onConnect(config: DatabaseConfig, save: boolean): void
}

export default function ConnectionForm(props: ConnectionFormProps) {
  const [save, setSave] = React.useState<boolean>(true)

  const [user, onChangeUser] = useInput("")
  const [password, onChangePassword] = useInput("")
  const [host, onChangeHost] = useInput("")
  const [database, onChangeDatabase] = useInput("")
  const [port, onChangePort] = useInput("5432")

  const onToggleSave = () => setSave(!save)

  const onClickConnect = () =>
    props.onConnect(
      { user, password, host, database, port: parseInt(port) },
      save
    )

  return (
    <Container elevation={4}>
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
      <div>
        <MuiFormControlLabel
          control={
            <MuiCheckbox
              checked={save}
              onChange={onToggleSave}
              name="checkedB"
              color="primary"
            />
          }
          label="Save Connection"
        />
      </div>
      <Button variant="contained" color="primary" onClick={onClickConnect}>
        Connect
      </Button>
    </Container>
  )
}
