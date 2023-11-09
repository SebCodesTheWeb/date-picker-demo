import React from 'react'
import { Center, VStack, Heading, Text } from '@northlight/ui'

const SuccessPage: React.FC = () => {
  return (
    <Center w='full' h='full'>
      <VStack spacing='4' p='10' pt="20" align='center' justify='center'>
        <Heading size='lg'>All Done!</Heading>
        <Text>
          Thank you for participating. Please stop the screen recording and
          return to the meeting.
        </Text>
      </VStack>
    </Center>
  )
}

export default SuccessPage
