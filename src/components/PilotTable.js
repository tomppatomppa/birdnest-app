import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import useStore from '../store'
import useNest from '../hooks/useNest'
/**
 *
 * @param {*} lastSeen date to compare
 * @returns Time difference in minutes between given date and current date
 */
export function getTimeDifferenceMinutes(lastSeen) {
  const diff = Math.abs(Date.parse(lastSeen) - Date.now())
  const minutes = Math.floor(diff / 1000 / 60)

  return minutes
}
/**
 *
 * @param {*} pilots existing array of pilots
 * @param {*} updatedPilot updated pilot
 * @returns Filter out updated pilot if it exists,
 *  or if a pilot has NOT been seen in the last 10 minutes
 *  add updated pilot to array
 */
const filterPilots = (pilots = [], updatedPilot) => {
  const filteredPilots = pilots.filter(
    (pilot) =>
      pilot.pilotId !== updatedPilot.pilotId &&
      getTimeDifferenceMinutes(pilot.lastSeen) < 10
  )

  return filteredPilots.concat(updatedPilot)
}

function createPilotData({
  pilotId,
  firstName,
  lastName,
  phoneNumber,
  email,
  lastSeen,
  drone,
}) {
  const { confirmedDistance } = drone
  const pilot = {
    fullName: firstName + ' ' + lastName,
    confirmedDistance: confirmedDistance,
    email: email,
    phoneNumber: phoneNumber,
    lastSeen: lastSeen,
    pilotId: pilotId,
  }
  return pilot
}

export default function PilotTable() {
  const nest = useStore((state) => state.nest)
  const { pilots, loading } = useNest({ getNestId: nest })
  const allPilots = pilots ? pilots.map((pilot) => createPilotData(pilot)) : []
  if (loading) {
    return <div>Loading pilots..</div>
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="right">Last Seen (min)</TableCell>
            <TableCell align="right">Confirmed Violation (m)</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPilots
            .slice(0)
            .reverse()
            .map((row) => (
              <TableRow
                key={row.pilotId}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">
                  {getTimeDifferenceMinutes(row.lastSeen)}
                </TableCell>
                <TableCell align="right">
                  {Number(row.confirmedDistance).toFixed(2)}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
