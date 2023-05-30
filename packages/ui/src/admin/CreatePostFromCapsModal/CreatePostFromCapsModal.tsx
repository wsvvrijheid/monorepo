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
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TbBrandTwitter } from 'react-icons/tb'
import { createWorker, PSM } from 'tesseract.js'
import * as yup from 'yup'

import { Post, UploadFile } from '@wsvvrijheid/types'

import { FilePicker, WImage } from '../../components'
import { yupMultiSelect } from '../../data/schemas/common'
import { FormFields, ModelCreateModal, useDefaultValues } from '../ModelForm'

const languages = {
  en: 'eng',
  nl: 'nld',
  tr: 'tur',
}
export const CreatePostFromCapsModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const { locale } = useRouter()
  const [lang, setLang] = useState(locale)
  const [progress, setProgress] = useState()
  const [recognizedText, setRecognizedText] = useState([])
  const [recognized, setRecognized] = useState(false)
  console.log('files', files)
  console.log('\npreviews', previews)

  const onCreate = value => {
    console.log('value', value.target.value)
  }

  const onReset = () => {
    setFiles([])
    setPreviews([])
    setRecognizedText([])
    setRecognized(false)
  }
  console.log('\nrecognizedText', recognizedText)
  // const postFromCapsFields: FormFields<Post> = [
  //   { name: 'description', isRequired: true, type: 'textarea' },
  //   {
  //     name: 'hashtag',
  //     type: 'select',
  //     url: 'api/hashtags',
  //   },

  //   {
  //     name: 'caps',
  //     type: 'file',
  //     group: { label: 'Caps', value: 'caps', name: 'media' },
  //   },
  //   { name: 'content', type: 'markdown' },

  //   {
  //     name: 'tags',
  //     type: 'select',
  //     url: 'api/tags',
  //     isMulti: true,
  //   },
  // ]

  // const postFromCapsSchema = yup.object({

  //   tags: yupMultiSelect,
  //   description: yup.string().required('Description is required'),
  //   content: yup.string(),
  //   hashtag: yup.object().shape({
  //     label: yup.string(),
  //     value: yup.string(),
  //   }),
  //   image: yup.mixed(),
  //   caps: yup.mixed(),
  //   video: yup.mixed(),
  //   videoUrl: yup.string(),
  // })

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
        <ModalBody>
          <Stack>
            {files && files?.length <= 0 && (
              <FilePicker
                maxNumberOfFiles={50}
                onLoaded={(files, previews) => {
                  setFiles(files)
                  setPreviews(previews)
                }}
              />
            )}
          </Stack>
          <Stack>
            {!recognized &&
              previews?.map((image, index) => {
                return (
                  <Stack key={index}>
                    <WImage
                      src={image as UploadFile}
                      // alt={title}
                      hasZoom
                      objectFit="contain"
                      sizes="(max-width: 480) 80vw, 33vw"
                    />{' '}
                  </Stack>
                )
              })}
            <Divider />
            {recognizedText &&
              recognizedText?.map((medias, index) => {
                // {
                //   console.log('map in map', medias[1])
                // }
                return (
                  <HStack key={index}>
                    <WImage
                      src={previews[index] as UploadFile}
                      // alt={title}
                      hasZoom
                      objectFit="contain"
                      sizes="(max-width: 480) 80vw, 33vw"
                    />
                    <Text key={index}>{medias[1]}</Text>
                  </HStack>
                )
              })}
          </Stack>{' '}
          <Divider />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onReset}>
            Reset
          </Button>
          <Button
            colorScheme="green"
            onClick={() =>
              OnRecognize({
                setRecognized,
                setRecognizedText,
                setProgress,
                files,
                lang,
              })
            }
          >
            Recognize
          </Button>
          <Button colorScheme="blue" isDisabled={!files} onClick={onCreate}>
            Create
          </Button>
        </ModalFooter>

        {/* <Alert status='error'>
            <AlertIcon />
            <AlertDescription>An error occured</AlertDescription>
          </Alert> */}
      </ModalContent>
    </Modal>
  )
}

export const OnRecognize = async ({
  setRecognizedText,
  setProgress,
  files,
  lang,
  setRecognized,
}) => {
  // const [text,setText]=useState([])
  const newArray = []
  if (files) {
    files.forEach(async element => {
      const image = new Image()
      image.src = URL.createObjectURL(files[0])
      image.crossOrigin = 'anonymous'
      const worker = await createWorker({
        logger: m => {
          if (m.status === 'recognizing text' && m.jobId)
            setProgress(m.progress * 100)
        },
      })

      try {
        // setIsRecognizing(true)
        await worker.load()
        await worker.loadLanguage(languages[lang])
        await worker.initialize(languages[lang])
        await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO_OSD })
        const result = await worker.recognize(element)

        const text = result.data.text.replace(/\n/g, ' ').trim()
        newArray.push([image, text])
        console.log('text in loop >>>\n', '>>>>>>>>>>>>', text)
        // onRecognizeText?.(text)
      } catch (error) {
        console.log('error', error)
      } finally {
        // setIsRecognizing(false)
        await worker.terminate()
      }
      console.log('array icin image', newArray)
      setRecognized(true)
      setRecognizedText(newArray)
    })
  }

  return newArray
}
