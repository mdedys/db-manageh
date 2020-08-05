import React from "react"

import { styled } from "@material-ui/core/styles"
import MuiBox from "@material-ui/core/Box"
import MuiContainer from "@material-ui/core/Container"
import MuiDivider from "@material-ui/core/Divider"
import MuiList from "@material-ui/core/List"
import MuiListItem from "@material-ui/core/ListItem"
import MuiTypography from "@material-ui/core/Typography"

import LocalStorage from "../../services/localstorage"
import DatabaseConfig from "../../../types/DatabaseConfig"

const Container = styled(MuiContainer)({
  display: "block",
  margin: 0,
  padding: 0,
  maxWidth: "487px",
  height: "494px",
  width: "100%",
})

const Divider = styled(MuiDivider)({
  width: "100%",
})

const Connection = styled(MuiBox)({
  width: "100%",
})

const ListItem = styled(MuiListItem)({
  cursor: "pointer",
})

function useConnections() {
  const [connections, setConnections] = React.useState<DatabaseConfig[]>([])
  React.useEffect(() => {
    const cached = LocalStorage.get("connections")
    if (cached) {
      setConnections(JSON.parse(cached))
    }
  }, [])
  return connections
}

interface ConnectionListProps {
  onClickConnection(config: DatabaseConfig): void
}

export default function ConnectionList(props: ConnectionListProps) {
  const connections = useConnections()

  return (
    <Container>
      <MuiTypography variant="h5">Connections</MuiTypography>
      <Divider />
      <MuiList>
        {connections.map((c, idx) => (
          <ListItem key={idx} button onClick={() => props.onClickConnection(c)}>
            <Connection>
              <MuiTypography variant="subtitle1">
                {c.host}:{c.port}
              </MuiTypography>
              <MuiTypography variant="body2" style={{ opacity: 0.6 }}>
                {c.database}@{c.user}
              </MuiTypography>
              <Divider style={{ marginTop: "0.75rem" }} />
            </Connection>
          </ListItem>
        ))}
      </MuiList>
    </Container>
  )
}
