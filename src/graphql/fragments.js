import { gql } from '@apollo/client'

export const NEST_FIELDS = gql`
  fragment NestFields on Nest {
    positionY
    positionX
    url
    noFlyZoneMeters
  }
`
