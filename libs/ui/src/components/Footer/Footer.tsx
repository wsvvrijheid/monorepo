import { Box, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '../Container/Container';
import { SocialButtons } from '../SocialButtons';
import { FooterNav } from './FooterNav';
import { FooterProps } from './types';

export const Footer: FC<FooterProps> = ({ menu, about, logo, socialItems }) => {
  const { t } = useTranslation();
  return (
    <Box bg={'blue.900'} color="blue.100" pos="relative">
      <Container as={Stack}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={8}
          py={10}
          justify="space-between"
          align={{ base: 'center', lg: 'start' }}
        >
          <Stack align="center" maxW={250}>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                ease: 'linear',
                repeat: Infinity,
                duration: 60,
              }}
            >
              <Link href="/">
                <NextImage
                  width="92px"
                  height="92px"
                  objectFit="cover"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </motion.div>
            <Text textAlign="center" paddingLeft={1} mx={2} my={2}>
              {about}
            </Text>
          </Stack>
          <FooterNav menu={menu} />
        </Stack>
        <Wrap
          justify={{ base: 'center', sm: 'space-between' }}
          borderTopWidth="0.5px"
          borderTopColor="blue.200"
          py={6}
          spacing={2}
        >
          <Text fontSize={'sm'} mr={1}>
            &copy; {new Date().getFullYear()} {t('copyright')}
          </Text>
          <SocialButtons items={socialItems} />
        </Wrap>
      </Container>
    </Box>
  );
};
