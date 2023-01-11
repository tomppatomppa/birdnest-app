import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { filterPilots, getTimeDifferenceMinutes } from '../hooks/useNest'
import { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { PILOT_UPDATED } from '../graphql/subscriptions'
import useStore from '../store'

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

export default function PilotTable({ pilots, setPilots }) {
  const [recentlyAddedPilots, setRecentlyAddedPilots] = useState([])
  const nest = useStore((state) => state.nest)

  function handlePilotAdd(newPilot) {
    setRecentlyAddedPilots([...recentlyAddedPilots, newPilot])
  }

  useEffect(() => {
    setTimeout(() => {
      setRecentlyAddedPilots([])
    }, 3000)
  }, [recentlyAddedPilots])

  useSubscription(PILOT_UPDATED, {
    variables: {
      nestUrl: nest,
    },
    skip: !nest,
    onData: ({ data }) => {
      const updatedPilot = data.data.pilotUpdated.pilot
      setPilots(filterPilots(pilots, updatedPilot))
      handlePilotAdd(updatedPilot.pilotId)
    },
  })

  if (!pilots) {
    return <div>No pilots available..</div>
  }

  const allPilots = pilots.map((pilot) => createPilotData(pilot))

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
                  backgroundColor: recentlyAddedPilots.includes(row.pilotId)
                    ? 'lightgreen'
                    : '',
                  transition: 'background-color 1s ease-in-out',
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
