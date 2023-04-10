import { FC } from 'react'

import { AspectRatio, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { API_URL } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'

import { CourseApplicationForm } from './CourseApplicationForm'
import { CourseFaqs } from './CourseFaqs'
import { CourseInfo } from './CourseInfo'
import { CourseDetailPageProps } from './types'
import { Container } from '../Container'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'

export const CourseDetailPage: FC<CourseDetailPageProps> = ({
  course,
  courses,
  source,
}) => {
  const { locale, pathname, query } = useRouter()
  const { t } = useTranslation()

  const title = course[`title_${(locale as StrapiLocale) || 'nl'}`]
  const description = course[`description_${(locale as StrapiLocale) || 'nl'}`]

  return (
    <Container maxW={'6xl'}>
      <Stack spacing={12} pb={16} pt={4}>
        <Stack spacing={4}>
          <AspectRatio ratio={16 / 9}>
            <Image fill src={API_URL + course.image.url} alt="" />
          </AspectRatio>
          <Stack
            justify={'space-between'}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <CourseInfo course={course} />

            <ShareButtons
              size={'md'}
              title={title}
              quote={description}
              url={pathname}
            />
          </Stack>
        </Stack>

        <Heading as={'h1'} size={'2xl'} textAlign={'center'} py={8}>
          {title}
        </Heading>

        <Markdown source={source} />

        <Stack
          spacing={8}
          maxW={'3xl'}
          w={'full'}
          p={8}
          borderWidth={1}
          rounded={'md'}
          alignSelf={'center'}
          bg={'white'}
        >
          <Heading as={'h3'} size={'lg'}>
            {t('course.application-title')}
          </Heading>
          <CourseApplicationForm courseId={Number(query['id'])} />
        </Stack>

        <Stack spacing={4}>
          <Heading as={'h3'} size={'lg'}>
            {t('faq')}
          </Heading>
          <CourseFaqs faqs={course.faqs} />
        </Stack>

        {courses?.length > 0 && (
          <Stack spacing={4}>
            <Heading as={'h3'} size={'lg'}>
              {t('course.other-courses')}
            </Heading>
            {/* TODO: Add courses grid */}
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
