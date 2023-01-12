import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { GET_NEST } from '../graphql/queries'

/**
 *
 * @param {*} lastSeen date to compare
 * @returns Time difference in minutes between given date and current date
 */
export const getTimeDifferenceMinutes = (lastSeen) => {
  const diff = Math.abs(Date.parse(lastSeen) - Date.now())
  const minutes = Math.floor(diff / 1000 / 60)

  return minutes
}

const useNest = (variables) => {
  const [nestData, setNestData] = useState([])
  const [pilots, setPilots] = useState([])

  const { data, loading, error, ...result } = useQuery(GET_NEST, {
    variables: { ...variables },
    fetchPolicy: 'no-cache', //Turn off caching for pilots
    skip: !variables.getNestId,
  })

  const resetAll = () => {
    setNestData('')
    setPilots([])
  }

  useEffect(() => {
    resetAll()
    if (data && !error) {
      const { violations, ...rest } = data.getNest
      setPilots(violations)
      setNestData(rest)
    }
  }, [data, error])

  return {
    setPilots,
    error,
    pilots,
    loading,
    nestData,
    ...result,
  }
}

export default useNest
