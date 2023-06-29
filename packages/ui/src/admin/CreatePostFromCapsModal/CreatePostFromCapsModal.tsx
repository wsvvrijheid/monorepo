import React, { FC, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Divider,
} from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useCreateModelMutation } from '@wsvvrijheid/services'
import {
  Post,
  PostCreateInput,
  StrapiLocale,
  StrapiTranslatableCreateInput,
  StrapiUrl,
  UploadFile,
} from '@wsvvrijheid/types'
import { generateOgImageParams } from '@wsvvrijheid/utils'

import { ImageRecognizer } from '../ImageRecognizer/ImageRecognizer'
import { RecognizedImage } from '../ImageRecognizer/types'
import { ModelSelect } from '../ModelForm/ModelSelect'

type CreatePostFromCapsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreatePostFromCapsModal: FC<CreatePostFromCapsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<Record<number, RecognizedImage>>({})
  const createPostMutation = useCreateModelMutation<
    Post,
    StrapiTranslatableCreateInput
  >('api/posts')
  const { locale } = useRouter()
  const [recognized, setRecognized] = useState<boolean>(false)

  const {
    formState: { errors },
    watch,
    control,
    handleSubmit,
    setValue,
  } = useForm()

  const onCreate = () => {
    const hashtags = watch('hashtags')

    Object?.values(state).map(async item => {
      const { text, file, id } = item

      const body = {
        description: text,
        locale: locale as StrapiLocale,
        publishedAt: null,
        content: text,
        caps: file as unknown as UploadFile,
        hashtag: Number(hashtags?.value) as number,
      } as unknown as StrapiTranslatableCreateInput

      const slug =
        body.description?.slice(0, 10) && slugify(body.description.slice(0, 10))

      const bodyData = {
        ...body,
        slug,
      } as StrapiTranslatableCreateInput

      const imageProps = generateOgImageParams()
      const postBody = bodyData as PostCreateInput
      postBody.imageParams = imageProps

      try {
        const value = await createPostMutation.mutateAsync(body)
        if (text === value.description) {
          setState(prev => {
            const prevState = { ...prev }
            delete prevState[id]

            return { ...prevState }
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    })
    setRecognized(false)
  }

  const onReset = () => {
    setState({})
    setRecognized(false)
    setValue('hashtags', undefined)
  }

  const handleClose = () => {
    onReset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Multiple Hashtag Post</ModalHeader>
        <Stack m={10} as={'form'} onSubmit={handleSubmit(onCreate)}>
          <ModelSelect
            url={'api/hashtags' as StrapiUrl}
            isRequired={true}
            name={'hashtags' as string}
            label={'Hashtags'}
            errors={errors}
            control={control}
            zIndex={1}
          />
        </Stack>
        <ModalBody>
          <ImageRecognizer
            state={state}
            setState={setState}
            recognized={recognized}
            setRecognized={setRecognized}
          />

          <Divider />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button colorScheme="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onReset}>
            Reset
          </Button>
          {/* isDisabled={!files} */}
          <Button isDisabled={!state} colorScheme="blue" onClick={onCreate}>
            Create
          </Button>
        </ModalFooter>
        {Object?.values(state).map(item => {
          const { id, isError } = item
          if (isError) {
            return (
              <Alert status="error" key={id}>
                <AlertIcon />
                <AlertDescription>An error occured </AlertDescription>
              </Alert>
            )
          }
        })}
      </ModalContent>
    </Modal>
  )
}
