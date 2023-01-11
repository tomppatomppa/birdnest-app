import { gql } from '@apollo/client'
import { PILOT_FIELDS } from './fragments'

export const PILOT_UPDATED = gql`
  subscription ($nestUrl: String!) {
    pilotUpdated(nestUrl: $nestUrl) {
      url
      pilot {
        ...PilotFields
        drone {
          confirmedDistance
        }
      }
    }
  }
  ${PILOT_FIELDS}
`
