import { useQuery } from '@apollo/client'

import { GET_BIRDS } from '../graphql/queries'

const useBirds = () => {
  const { data, loading, error, ...result } = useQuery(GET_BIRDS, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    birds: data?.getBirds,
    loading,
    error,
    ...result,
  }
}

export default useBirds
