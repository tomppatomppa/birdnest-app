import { gql } from '@apollo/client'

export const NEST_FIELDS = gql`
  fragment NestFields on Nest {
    positionY
    positionX
    url
    noFlyZoneMeters
  }
`

export const PILOT_FIELDS = gql`
  fragment PilotFields on Pilot {
    pilotId
    createdDt
    email
    firstName
    lastName
    lastSeen
    phoneNumber
  }
`
