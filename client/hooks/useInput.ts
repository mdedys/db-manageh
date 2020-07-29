import React from "react"

type ChangeEvent = (evt: React.ChangeEvent) => void

/**
 * Input react hook that handles settings change and updating value based on React.ChangeEvent
 * @param defaultValue default string value of input
 */
export default function useInput(defaultValue: string): [string, ChangeEvent] {
  const [value, setValue] = React.useState(defaultValue)

  const onChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValue(evt.target.value)
    },
    [setValue]
  )

  return [value, onChange]
}
