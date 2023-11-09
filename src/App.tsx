import {
  MediatoolThemeProvider,
  DateRangePickerField,
  Form,
} from '@northlight/ui'
import './App.css'
import { ScreenRecorder } from './screen-recorder'

function App() {
  return (
    <MediatoolThemeProvider>
      <Form initialValues={{ date: null }} onSubmit={() => {}}>
        <DateRangePickerField name='date' label="Select date"/>
        <ScreenRecorder />
      </Form>
    </MediatoolThemeProvider>
  )
}

export default App
