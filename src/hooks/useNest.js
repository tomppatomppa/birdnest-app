import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { GET_NEST } from '../graphql/queries'

const useNest = (variables) => {
  const [nestData, setNestData] = useState([])
  const [pilots, setPilots] = useState([])
  const { data, loading, ...result } = useQuery(GET_NEST, {
    variables: { ...variables },
    fetchPolicy: 'no-cache', //Turn off caching for pilots
  })

  useEffect(() => {
    if (data) {
      const { violations, ...rest } = data.getNest

      setPilots(violations)
      setNestData(rest)
    }
  }, [data])

  return {
    setPilots,
    pilots,
    loading,
    nestData,
    ...result,
  }
}

export default useNest
