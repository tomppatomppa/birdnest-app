import { gql } from '@apollo/client'

export const PILOT_UPDATED = gql`
  subscription ($nestUrl: String!) {
    pilotUpdated(nestUrl: $nestUrl) {
      url
      pilot {
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
`
