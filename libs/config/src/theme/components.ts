import { StyleFunctionProps, theme } from '@chakra-ui/react'

export const components = {
  Heading: {
    baseStyle: (props: StyleFunctionProps) => {
      const colorScheme = props.colorScheme || 'primary'

      return {
        fontFamily: 'heading',
        bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.600)`,
        bgClip: 'text',
        fontWeight: 700,
      }
    },
  },
  Button: {
    baseStyle: (props: StyleFunctionProps) => {
      return {
        fontWeight: 500,
      }
    },
    variants: {
      solid: (props: StyleFunctionProps) => {
        const colorScheme = props.colorScheme || 'primary'

        return {
          ...theme.components.Button.variants?.solid(props),
          color: 'white',
          bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.600)`,
          _hover: {
            bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.500)`,
          },
          _active: {
            bgGradient: `linear(to-b, ${colorScheme}.500, ${colorScheme}.400)`,
          },
        }
      },
      outline: (props: StyleFunctionProps) => {
        return {
          ...theme.components.Button.variants?.outline(props),
          _hover: {
            bg: 'blackAlpha.50',
          },
        }
      },
      link: (props: StyleFunctionProps) => {
        const colorScheme = props.colorScheme || 'primary'

        return {
          ...theme.components.Button.variants?.link(props),
          bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.600)`,
          bgClip: 'text',
        }
      },
    },
    defaultProps: {
      colorScheme: 'primary',
    },
  },
  Badge: {
    solid: (props: StyleFunctionProps) => {
      const colorScheme = props.colorScheme || 'primary'

      return {
        ...theme.components.Button.variants?.solid(props),
        color: 'white',
        bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.600)`,
      }
    },
    baseStyle: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    defaultProps: {
      colorScheme: 'primary',
    },
  },
  Link: {
    baseStyle: {
      _hover: {
        textDecor: 'none',
      },
      textDecor: 'none',
    },
  },
}
