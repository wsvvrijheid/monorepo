import React, { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Divider,
  HStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TbBrandTwitter } from 'react-icons/tb'
import { createWorker, PSM } from 'tesseract.js'
import * as yup from 'yup'

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

import { FilePicker, WImage } from '../../components'
import { yupMultiSelect } from '../../data/schemas/common'
import { ImageRecognizer } from '../ImageRecognizer/ImageRecognizer'
import { RecognizedImage } from '../ImageRecognizer/types'
import { FormFields, ModelCreateModal, useDefaultValues } from '../ModelForm'
import { ModelSelect } from '../ModelForm/ModelSelect'

const languages = {
  en: 'eng',
  nl: 'nld',
  tr: 'tur',
}
export const CreatePostFromCapsModal = ({ isOpen, onClose }) => {
  const [state, setState] = useState<Record<number, RecognizedImage>>({})
  const createPostMutation = useCreateModelMutation<
    Post,
    StrapiTranslatableCreateInput
  >('api/posts')
  const { locale } = useRouter()
  const [recognized, setRecognized] = useState<boolean>(false)
 
  const { register, formState: { errors }, watch, setValue, control, handleSubmit } = useForm()

  const onCreate = () => {
    const hashtags = watch('hashtags')

    console.log('hashtags',hashtags?.value)

    Object?.values(state).map(item => {
      const {text, file } = item

      const body = {
        description: text,
        locale: locale as StrapiLocale,
        publishedAt: null,
        content: text,
        caps: file as unknown as UploadFile,
       
        hashtag: Number(hashtags.value) as number,
      } as unknown as StrapiTranslatableCreateInput

      const slug = body.description.slice(0,10) && slugify(body.description.slice(0,10))

      const bodyData = {
        ...body,
        slug,
      } as StrapiTranslatableCreateInput

      const imageProps = generateOgImageParams()
      const postBody = bodyData as PostCreateInput
      postBody.imageParams = imageProps

      console.log('post body', bodyData, '\n\n')

      createPostMutation.mutate(body, {
        onSuccess: (value) => {
          console.log('onsuccess',value)
        },
        onError: error => {
          console.log('error', error)
        },
      })
     
    })
  }
  
  const onReset = () => {
    setState({})
    setRecognized(false)
  }



  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Hashtag Post</ModalHeader>
        <Stack m={10} as={'form'} onSubmit={handleSubmit(onCreate)}>
         
          <ModelSelect
            // key={index}
            url={'api/hashtags' as StrapiUrl}
            isRequired={true}
            name={'hashtags' as string}
            label={'hashtags'}
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
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onReset}>
            Reset
          </Button>
          {/* isDisabled={!files} */}
          <Button colorScheme="blue" onClick={onCreate}>
            Create
          </Button>
        </ModalFooter>
        {Object?.values(state).map(item => {
          const { id, preview, text, isLoading, isError, isProcessed, file } =
            item

          // console.log('value state text', text,'\n\n','file',file)
          if (isError) {
            return (
              <Alert status="error" key={id}>
                <AlertIcon />
                <AlertDescription>An error occured</AlertDescription>
              </Alert>
            )
          }
        })}
      </ModalContent>
    </Modal>
  )
}
