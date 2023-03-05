import { useState } from 'react'

export const useGetFetching = (callback: () => void) => {
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const getAPIData = async () => {
    setLoading(true)
    try {
      callback()
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  return [getAPIData, error, loading]
}
