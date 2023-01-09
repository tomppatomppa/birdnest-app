import { gql } from '@apollo/client'
import { NEST_FIELDS } from './fragments'

export const GET_BIRDS = gql`
  query {
    getBirds {
      name
    }
  }
`

export const GET_BIRD = gql`
  query getBird($name: String!, $nests: Boolean = false) {
    getBird(name: $name, nests: $nests) {
      name
      protectedNests @include(if: $nests) {
        ...NestFields
      }
    }
  }
  ${NEST_FIELDS}
`
export const GET_NEST = gql`
  query ($getNestId: String) {
    getNest(id: $getNestId) {
      ...NestFields
      violations {
        pilotId
        createdDt
        email
        firstName
        lastName
        lastSeen
        phoneNumber
        drone {
          confirmedDistance
        }
      }
    }
  }
  ${NEST_FIELDS}
`
