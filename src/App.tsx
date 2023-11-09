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
  // Q4
  { startDate: '2023-10-01', endDate: '2023-12-31' },
  // Q2
  { startDate: '2023-04-01', endDate: '2023-06-30' },
  // Specific random dates
  { startDate: '2023-08-15', endDate: '2023-09-10' },
  { startDate: '2024-05-22', endDate: '2024-06-15' },
  { startDate: '2025-12-05', endDate: '2025-01-25' },
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
  // A weekend
  { startDate: '2023-11-11', endDate: '2023-11-12' },
  // Far in the future
  { startDate: '2029-01-01', endDate: '2029-12-31' },
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
