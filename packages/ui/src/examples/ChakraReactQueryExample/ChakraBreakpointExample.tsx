import { FC } from 'react'

export type ChakraBreakpointExampleProps = {
  onSend: (message: string) => void
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

export const ChakraBreakpointExample: FC<ChakraBreakpointExampleProps> = ({
  onSend,
  isError,
  isLoading,
  isSuccess,
}) => {
  return (
    <div>
      <textarea />

      {/* TODO: Get message from state */}
      <button onClick={() => onSend('')}>Send</button>

      {/* TODO: Add alert */}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && <div>Success</div>}
    </div>
  )
}
