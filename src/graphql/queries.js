import { gql } from '@apollo/client'

export const GET_BIRDS = gql`
  query {
    getBirds {
      name
    }
  }
`
