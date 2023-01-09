import { useQuery } from '@apollo/client'

import { GET_BIRD } from '../graphql/queries'

const useBird = (variables) => {
  const { data, loading, error, ...result } = useQuery(GET_BIRD, {
    variables: { ...variables },
    fetchPolicy: 'no-cache', //Disable cache
  })

  return {
    bird: data?.getBird,
    nests: data?.getBird?.protectedNests,
    loading,
    error,
    ...result,
  }
}

export default useBird
