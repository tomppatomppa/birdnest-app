import { gql } from '@apollo/client'
import { NEST_FIELDS, PILOT_FIELDS } from './fragments'

export const GET_BIRDS = gql`
  query {
    getBirds {
      name
      protectedNests {
        url
      }
    }
  }
`

export const GET_NEST = gql`
  query getNest($getNestId: String) {
    getNest(id: $getNestId) {
      ...NestFields
      violations {
        ...PilotFields
        drone {
          confirmedDistance
        }
      }
    }
  }
  ${NEST_FIELDS}, ${PILOT_FIELDS}
`
