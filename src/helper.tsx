import { useCallback, useEffect, useState } from 'react'
import { HEADER, QUERY_STRING_ERROR } from './constants'

const generateQueryString = (q: any) => {
  if (!q) {
    return QUERY_STRING_ERROR
  }

  return Object.keys(q)
    .filter((key) => q[key] && q[key].toString().length)
    .map((key) => `${key}=${q[key]}`)
    .join('&')
}

async function callAPI(url: string, data: any): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(data)
  })
  if (response.status === 200) {
    const responseData = await response.json()
    return responseData
  } else {
    throw new Error(response.statusText)
  }
}

const useHandleCallback = (
  callback: ((arg: any) => void) | undefined,
  result: any,
  error: any
) => {
  useEffect(() => {
    if (typeof callback === 'function') {
      if (error) {
        callback({ error })
      } else if (result) {
        callback(result)
      }
    }
  }, [callback, result, error])
}

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  )

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(setTimeout(() => callback(...args), delay))
    },
    [callback, delay, timeoutId]
  )

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return debouncedCallback
}

export { generateQueryString, callAPI, useHandleCallback, useDebounce }
