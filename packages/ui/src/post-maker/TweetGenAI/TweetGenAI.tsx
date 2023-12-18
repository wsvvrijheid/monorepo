import { useState } from 'react'

import {
    Box,
    Button,
    Flex,
    Heading,
    Progress,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel,
    FormControl
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useTranslation } from 'next-i18next'

import { toastMessage } from '@wsvvrijheid/utils'

export const TweetGenAI = () => {
    const { t } = useTranslation()
    const LANGUAGE_OPTIONS = ['Turkish', 'English', 'Dutch']
    const [generatedPosts, setGeneratedPosts] = useState<string[]>()
    const [numberOfPosts, setNumberOfPosts] = useState<number>()
    const [charLimit, setCharLimit] = useState<number>()
    const [language, setLanguage] = useState<string>(LANGUAGE_OPTIONS[0])

    const {
        // completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = useCompletion({
        api: 'api/route-tweet-gen',
        body: {
            numberOfPosts,
            charLimit,
            language,
        },
        onFinish(prompt, completion) {
            setGeneratedPosts(JSON.parse(completion))
        },
        onError(error) {
            toastMessage("Error", t('contact.form.failed'), "error")
        },
    })


    return (
        <>
            <Heading p={4} color='black'>Post Generator</Heading>
            <Box p={4}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            name='prompt'
                            placeholder='Enter a content...'
                            value={input}
                            onChange={handleInputChange}
                            mb={4}
                            size='xs'
                            required
                        />
                    </FormControl>
                    <Flex gap={[4, 4, 10]} mb={4} flexDirection={['column', 'column', 'row']} >
                        <FormControl>
                            <FormLabel>Number of Posts</FormLabel>
                            <NumberInput
                                step={1}
                                min={0}
                                max={40}
                                defaultValue={5}
                                onChange={(a, b) => setNumberOfPosts(b)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Character Limit</FormLabel>
                            <NumberInput
                                step={10}
                                min={10}
                                max={200}
                                defaultValue={150}
                                onChange={(a, b) => setCharLimit(b)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Language</FormLabel>
                            <Select
                                value={language ?? ''}
                                onChange={e => setLanguage(e.target.value)}
                            >
                                {LANGUAGE_OPTIONS.map((opt, idx) => {
                                    return (
                                        <option key={idx}>{opt}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Flex>

                    <Button
                        disabled={isLoading}
                        type='submit'
                    >
                        {t('generate')}
                    </Button>
                    <Button
                        type='button'
                        onClick={stop}
                        ml={2}
                        colorScheme='gray'
                    >
                        Stop
                    </Button>
                </form>
            </Box>
            {isLoading ?
                <Box p={4}>
                    <Progress size='xs' isIndeterminate />
                    {/* <div>{completion}</div> */}
                </Box>
                :
                <Box>
                    <Heading p={4} color='purple.500' size='lg'>AI-Generated Sentences</Heading>
                    <Box display='flex' flexDirection='column' gap={3} p={4}>
                        {generatedPosts
                            ?.map((genPost: string, idx: number) => {
                                return (
                                    <Textarea
                                        name={`aiPost-${idx}`}
                                        id={`aiPost-${idx}`}
                                        key={idx}
                                        value={genPost}
                                        onChange={e => console.log(e.target.value)}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
            }
        </>
    )
}