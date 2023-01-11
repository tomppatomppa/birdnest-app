import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getTimeDifferenceMinutes } from '../hooks/useNest'

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

export default function PilotTable({ pilots }) {
  const allPilots = pilots ? pilots.map((pilot) => createPilotData(pilot)) : []

  if (!pilots) {
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
