import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react'
import PilotTable from './PilotTable'
import { MockedProvider } from '@apollo/react-testing'
import { getTimeDifferenceMinutes } from '../hooks/useNest'

const pilots = [
  {
    firstName: 'John',
    lastName: 'Doe',
    drone: {
      confirmedDistance: 12.00003,
    },
    email: 'johnDoe@hotmail.com',
    phoneNumber: '041000000',
    lastSeen: '2023-01-12T07:50:42.219Z',
    pilotId: '000000',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    drone: {
      confirmedDistance: 58.00003,
    },
    email: 'JaneDoe@hotmail.com',
    phoneNumber: '111111111',
    lastSeen: '2023-01-12T07:40:42.219Z',
    pilotId: '111111',
  },
]

const expectPilotRowItemToHaveCorrectInformation = (
  item,
  { fullName, confirmedDistance, email, phoneNumber, lastSeen }
) => {
  const wrappedItem = within(item)

  expect(wrappedItem.getByText(fullName)).toBeDefined()

  expect(wrappedItem.getByText(confirmedDistance)).toBeDefined()
  expect(wrappedItem.getByText(email)).toBeDefined()
  expect(wrappedItem.getByText(phoneNumber)).toBeDefined()
  expect(wrappedItem.getByText(lastSeen)).toBeDefined()
}

test('renders content', () => {
  render(
    <MockedProvider>
      <PilotTable pilots={pilots} />
    </MockedProvider>
  )

  const pilotItems = screen.getAllByTestId('pilotItemRow')
  const [firstPilotItem, secondPilotItem] = pilotItems

  expect(pilotItems).toBeDefined()

  expectPilotRowItemToHaveCorrectInformation(firstPilotItem, {
    fullName: 'Jane Doe',
    confirmedDistance: '58.00',
    email: 'JaneDoe@hotmail.com',
    phoneNumber: '111111111',
    lastSeen: getTimeDifferenceMinutes('2023-01-12T07:40:42.219Z'),
  })
  expectPilotRowItemToHaveCorrectInformation(secondPilotItem, {
    fullName: 'John Doe',
    confirmedDistance: '12.00',
    email: 'johnDoe@hotmail.com',
    phoneNumber: '041000000',
    lastSeen: getTimeDifferenceMinutes('2023-01-12T07:50:42.219Z'),
  })
})
