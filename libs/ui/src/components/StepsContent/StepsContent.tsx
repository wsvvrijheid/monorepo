import {
  Box,
  ButtonGroup,
  CloseButton,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { PopoverContentProps } from '@reactour/tour/dist/types'
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const StepsContent = (props: PopoverContentProps) => {
  const { setIsOpen, steps, setCurrentStep, currentStep } = props

  const [title, ...content] = (steps[currentStep].content as string).split('|')

  return (
    <Box px={6} py={4} rounded="sm" bg="white">
      {content[0] && (
        <Heading as="h4" size="md" mb={2}>
          {title}
        </Heading>
      )}
      <Box>{content[0] || title}</Box>
      <ButtonGroup
        mt={4}
        justifyContent="space-between"
        alignItems="center"
        variant="ghost"
        colorScheme="primary"
        w="full"
      >
        <IconButton
          visibility={currentStep === 0 ? 'hidden' : 'visible'}
          aria-label="previous step"
          icon={<FaChevronLeft />}
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
        />

        <HStack spacing={1}>
          {steps.map((_, i) => (
            <Box
              key={i}
              borderWidth={1}
              borderColor="primary.400"
              bg={i === currentStep ? 'primary.400' : 'white'}
              boxSize={i === currentStep ? 3 : 2}
              rounded="full"
            />
          ))}
        </HStack>
        <IconButton
          aria-label="next step"
          icon={
            currentStep === steps.length - 1 ? <FaCheck /> : <FaChevronRight />
          }
          onClick={() => setCurrentStep(prev => prev + 1)}
        />
      </ButtonGroup>
      <CloseButton
        pos="absolute"
        top={1}
        right={1}
        onClick={() => setIsOpen(false)}
      />
    </Box>
  )
}
