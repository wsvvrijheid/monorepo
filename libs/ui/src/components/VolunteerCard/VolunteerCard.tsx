import { FC } from 'react'

import {
  Avatar,
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { StrapiLocale, Volunteer } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa'

import { Navigate } from '../Navigate'

export interface VolunteerCardProps {
  volunteer: Volunteer
  separator?: string
}

export const VolunteerCard: FC<VolunteerCardProps> = ({
  volunteer,
  separator = '✽',
}) => {
  const { locale } = useRouter()

  const socialItems = [
    {
      icon: <FaEnvelope />,
      link: `mailto:${volunteer.email}`,
      label: 'Email',
    },
    {
      icon: <FaFacebook />,
      link: volunteer.facebook,
      label: 'Facebook',
    },
    {
      icon: <FaInstagram />,
      link: volunteer.instagram,
      label: 'Instagram',
    },
    {
      icon: <FaLinkedin />,
      link: volunteer.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: <FaTwitter />,
      link: volunteer.twitter,
      label: 'Twitter',
    },
  ]

  return (
    <Stack
      p={6}
      spacing={4}
      rounded="md"
      bg="white"
      w="full"
      shadow="md"
      align="center"
    >
      {/* TODO Create shared image component */}
      <Avatar
        name={volunteer.username}
        size="lg"
        src={`${process.env['NX_API_URL']}${volunteer.user?.avatar?.url}`}
      />
      <Text textAlign="center" fontSize="lg" fontWeight={600} color="blue.500">
        {volunteer.username}
      </Text>
      <ButtonGroup size="sm">
        {socialItems
          .filter(item => item.link)
          .map((item, i) => (
            <Navigate key={i} href={item.link as string}>
              <IconButton
                aria-label={item.label}
                variant="outline"
                isRound
                icon={item.icon}
              />
            </Navigate>
          ))}
      </ButtonGroup>

      <Box textAlign="center" fontSize="sm">
        {volunteer.jobs
          ?.map(job => job[`name_${locale as StrapiLocale}`])
          .join(` ${separator} `)}
      </Box>
    </Stack>
  )
}
