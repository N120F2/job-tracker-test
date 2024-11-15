import { useCallback, useMemo, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackType = (...args: any[]) => Promise<void>
export const useFetch = <T extends CallbackType>(
  callback: T,
  allowOneReq = false,
): [(...args: Parameters<T>) => Promise<void>, boolean, string | null] => {
  const [isSending, setIsSending] = useState<boolean>(false)
  const isSendingRef = useRef(false)
  const [error, setError] = useState<string | null>(null)

  const sendRequest = useCallback(
    async (...args: unknown[]) => {
      if (isSendingRef.current && allowOneReq) return console.warn('Allowed only one request!')
      try {
        setIsSending(true)
        isSendingRef.current = true
        await callback(...args)
      } catch (error) {
        setError('Fetch Error!')
      } finally {
        isSendingRef.current = false
        setIsSending(false)
      }
    },
    [allowOneReq, callback],
  )
  return useMemo(() => [sendRequest, isSending, error], [error, isSending, sendRequest])
}
