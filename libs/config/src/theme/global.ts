export const styles = (font: string) => ({
  global: {
    'html, body, #__next': {
      h: 'full',
      fontFamily: font,
    },
    body: {
      color: 'gray.700',
      bg: 'gray.50',
      fontWeight: 'regular',
      lineHeight: 1.5,
    },
    iframe: {
      border: 'none',
      width: '100%',
      height: '450px',
    },
  },
})
