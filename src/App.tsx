import {
  Badge,
  H2,
  useToast,
  DateRangePickerField,
  Box,
  Button,
  Stack,
  Form,
  Center,
} from '@northlight/ui'
import { ScreenRecorder } from './screen-recorder'
import { useState } from 'react'
import { formatQuestion } from './format-date'
import SuccessPage from './success-page'

const questions = [
  // Current month
  { startDate: '2023-11-01', endDate: '2023-11-30' },
  // Current year
  { startDate: '2023-01-01', endDate: '2023-12-31' },
  // // Next month
  { startDate: '2023-12-01', endDate: '2023-12-31' },
  // Current quarter (Q4 for November)
  { startDate: '2023-10-01', endDate: '2023-12-31' },
  // Next quarter (Q1 of next year)
  { startDate: '2024-01-01', endDate: '2024-03-31' },
  // Fiscal quarter if different from calendar quarters (assuming Q1 starts in February for example)
  { startDate: '2023-02-01', endDate: '2023-04-30' },
  // Specific random dates
  { startDate: '2023-08-15', endDate: '2023-09-10' },
  { startDate: '2023-05-22', endDate: '2023-06-15' },
  { startDate: '2023-12-05', endDate: '2024-01-25' },
  // This year + 1 week
  { startDate: '2023-01-01', endDate: '2024-01-07' },
  // Last 30 days from the demo date
  { startDate: '2023-10-10', endDate: '2023-11-08' },
  // A week in the past
  { startDate: '2023-11-02', endDate: '2023-11-08' },
  // Specific holiday period
  { startDate: '2023-12-24', endDate: '2024-01-02' },
  // Summer holidays
  { startDate: '2023-07-01', endDate: '2023-08-31' },
  // Last fiscal year (assuming fiscal year starts in February)
  { startDate: '2022-02-01', endDate: '2023-01-31' },
  // Last quarter
  { startDate: '2023-07-01', endDate: '2023-09-30' },
  // Custom range within this month
  { startDate: '2023-11-05', endDate: '2023-11-15' },
  // Custom future range
  { startDate: '2023-11-20', endDate: '2023-12-05' },
  // A weekend
  { startDate: '2023-11-11', endDate: '2023-11-12' },
  // Year end planning
  { startDate: '2023-11-09', endDate: '2023-12-31' },
  // Custom past range
  { startDate: '2023-10-01', endDate: '2023-10-31' },
  // Far in the past
  { startDate: '2010-01-01', endDate: '2010-12-31' },
  { startDate: '2000-04-01', endDate: '2000-07-31' },
  { startDate: '1995-09-15', endDate: '1996-02-20' },
  // Far in the future
  { startDate: '2030-01-01', endDate: '2030-12-31' },
  { startDate: '2040-06-01', endDate: '2040-08-30' },
  { startDate: '2050-11-01', endDate: '2051-01-31' },
  // Specific future events envisaged
  { startDate: '2025-05-01', endDate: '2025-05-15' }, // A future event like an international conference
  { startDate: '2076-07-04', endDate: '2076-07-04' }, // A significant future date like the 300th anniversary of the USA
  { startDate: '2028-08-08', endDate: '2028-08-24' }, // Dates for a future Olympics, assuming
]

function App() {
  const [index, setIndex] = useState(0)
  const toast = useToast()

  const handleSubmit = (values: any) => {
    const { date } = values
    if (date === null) {
      toast({
        title: '',
        variant: 'error',
        description: 'Incorrect Date Range',
      })
    }
    if (date) {
      const selectedRange = {
        startDate: date.startDate.toString(),
        endDate: date.endDate.toString(),
      }

      if (
        selectedRange.startDate === questions[index].startDate &&
        selectedRange.endDate === questions[index].endDate
      ) {
        setIndex((currentIndex) => currentIndex + 1)
        toast({
          title: 'Success',
          variant: 'success',
          description: '',
        })
      } else {
        toast({
          title: '',
          variant: 'error',
          description: 'Incorrect Date Range',
        })
      }
    }
  }

  return (
    <Center w='full' h='full'>
      <Stack w='2xl' spacing='4' pt='32'>
        {index < questions.length ? (
          <>
            <H2>
              <Badge>{formatQuestion(questions[index])}</Badge>
            </H2>
            <Form initialValues={{ date: null }} onSubmit={handleSubmit}>
              <Stack spacing='2'>
                <DateRangePickerField name='date' label='' />
                <Button type='submit' variant='success'>
                  Submit
                </Button>
              </Stack>
            </Form>
          </>
        ) : (
          <>
            <SuccessPage />
          </>
        )}
        <Box mt='8' position='absolute' top='0' right='0'>
          <ScreenRecorder />
        </Box>
      </Stack>
    </Center>
  )
}

export default App
