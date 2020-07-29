import React from "react"

interface DatabaseContext {
  connected: boolean
  updateConnection: () => void
}

export const Context = React.createContext<DatabaseContext>({
  connected: false,
  updateConnection: () => {},
})

export default function database(props: React.PropsWithChildren<{}>) {
  const [connected, setConnection] = React.useState<boolean>(false)

  const onConnectionChange = React.useCallback(() => {
    setConnection(true)
  }, [setConnection])

  return (
    <Context.Provider
      value={{ connected, updateConnection: onConnectionChange }}
    >
      {props.children}
    </Context.Provider>
  )
}
