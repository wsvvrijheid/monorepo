import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, memo, PropsWithChildren } from 'react';
import { Container } from '../Container';

interface HeroProps {
  title: string;
  description?: string;
  video?: string;
  image?: string;
  isFullHeight?: boolean;
}

export const Hero: FC<PropsWithChildren<HeroProps>> = memo(function Hero({
  title,
  description,
  video,
  image = process.env['NX_PUBLIC_URL'] + '/assets/images/hero-bg.jpeg',
  isFullHeight = false,
  children,
}) {
  return (
    <Box
      className="hero"
      pos="relative"
      height={isFullHeight ? '100vh' : '300px'}
      marginTop={{ base: '-64px', lg: '-100px' }}
    >
      {video && (
        <Box
          as="video"
          top={0}
          left={0}
          w="full"
          h="full"
          objectFit="cover"
          autoPlay
          loop
          position="absolute"
        >
          <source src={video} type="video/webm" />
        </Box>
      )}
      {image && (
        <Box
          className="hero_image"
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
        >
          <Image
            src={image}
            objectFit="cover"
            objectPosition="bottom"
            layout="fill"
            height="100%"
          />
        </Box>
      )}
      <Box
        className="hero_blender"
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bg="blackAlpha.600"
        blendMode="multiply"
      />
      <Container h="full">
        <VStack
          position="relative"
          spacing={8}
          py={8}
          h="full"
          justify="end"
          maxW={900}
          mx="auto"
          textAlign="center"
        >
          {title && (
            <Heading
              color="white"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              {...(!isFullHeight && {
                pos: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                w: 'full',
              })}
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text
              color="white"
              fontSize="lg"
              display={isFullHeight ? 'inherit' : 'none'}
            >
              {description}
            </Text>
          )}
          {children}
        </VStack>
      </Container>
    </Box>
  );
});
