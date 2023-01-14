import { FC, PropsWithChildren } from 'react'

import { ButtonGroup, IconButton, ButtonGroupProps } from '@chakra-ui/react'
import { makeSocialContent } from '@wsvvrijheid/utils'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'next-share'
import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'

interface ShareButtonsProps extends ButtonGroupProps {
  title?: string
  url: string
  quote: string
}

export const ShareButtons: FC<PropsWithChildren<ShareButtonsProps>> = ({
  title,
  url,
  quote,
  size = 'sm',
  children,
  ...rest
}) => {
  const { twitterContent, content } = makeSocialContent(quote, title)

  return (
    <ButtonGroup variant="outline" size={size} alignItems="center" {...rest}>
      {children}
      <FacebookShareButton quote={content} url={url}>
        <IconButton
          as="span"
          isRound
          aria-label="share on faceobok"
          _hover={{ bg: 'facebook.500', color: 'white' }}
          icon={<FaFacebook />}
        />
      </FacebookShareButton>
      <TwitterShareButton title={twitterContent} url={url}>
        <IconButton
          as="span"
          isRound
          _hover={{ bg: 'twitter.500', color: 'white' }}
          aria-label="share on twitter"
          icon={<FaTwitter />}
        />
      </TwitterShareButton>
      <WhatsappShareButton title={content} url={url}>
        <IconButton
          as="span"
          isRound
          _hover={{ bg: 'whatsapp.500', color: 'white' }}
          aria-label="share on whatsapp"
          icon={<FaWhatsapp />}
        />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={content}>
        <IconButton
          as="span"
          isRound
          _hover={{ bg: 'blue.500', color: 'white' }}
          aria-label="share on telegram"
          icon={<FaTelegram />}
        />
      </TelegramShareButton>
      <LinkedinShareButton url={url} title={content} about={content}>
        <IconButton
          as="span"
          isRound
          _hover={{ bg: 'blue.500', color: 'white' }}
          aria-label="share on linkedin"
          icon={<FaLinkedin />}
        />
      </LinkedinShareButton>
    </ButtonGroup>
  )
}
