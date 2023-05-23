import { CSSProperties } from 'react'

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const paths = [
  'M50 337.5L0 0H50V337.5Z',
  'M50 337.5L0 675H50V337.5Z',
  'M0 337.5L50 0V675L0 337.5Z',
  'M45 675H55L55 8.74228e-07L45 0C15.021 168.507 0.0209643 252.819 2.18987e-05 337.135C-0.0209205 421.569 14.9791 506.007 45 675Z',
]

async function handler(req: NextRequest) {
  const params = new URLSearchParams(req.nextUrl.search)
  const title = params.get('title')
  const text = params.get('text')
  const image = params.get('image') || null
  const shape = params.get('shape') || 0
  const bg = params.get('bg') || 'white'
  const color = params.get('color') || '#FF4F00'
  const scale = Number(params.get('scale')) || 1
  const flip = params.get('flip') ? params.get('flip') === 'true' : false
  const hasLine =
    title && params.get('hasLine') ? params.get('hasLine') === 'true' : false

  const absoluteStyle: CSSProperties = {
    position: 'absolute',
    top: '0',
    height: '100%',
  }

  const transform = flip ? 'scale(1)' : 'scaleX(-1)'

  const path = paths[shape]

  const dimensions = {
    width: 1200 * scale,
    height: 675 * scale,
    image: 400 * scale,
    shape: 50 * scale,
    logo: 120 * scale,
    padding: 40 * scale,
    font: 36 * scale,
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: bg,
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              ...absoluteStyle,
              width: `${dimensions.image}px`,
              objectFit: 'cover',
              left: flip ? '0px' : `${dimensions.width - dimensions.image}px`,
            }}
            src={image}
            alt={''}
          />
          <svg
            width={dimensions.shape}
            height={dimensions.height}
            style={{
              ...absoluteStyle,
              left: flip
                ? `${dimensions.image - dimensions.shape}px`
                : `${dimensions.width - dimensions.image}px`,
              transform,
            }}
            viewBox="0 0 50 675"
            fill="0px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path key={path} d={path} fill={bg} />
          </svg>

          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={dimensions.logo}
            height={dimensions.logo}
            style={{
              position: 'absolute',
              left: flip
                ? `${dimensions.image / 2 - dimensions.shape}px`
                : `${
                    dimensions.width - dimensions.image / 2 - dimensions.shape
                  }px`,
              bottom: `${dimensions.padding}px`,
            }}
          >
            <path
              fill={'#FF4F00'}
              d="M60 120A60 60 0 1 0 60 0a60 60 0 0 0 0 120Z"
            />
            <path
              fill="#fff"
              d="M85.9 48.3s4.9 2.5 9.5 5.9a36.4 36.4 0 0 1-2.6 21c-1.8-2.7-1.7-4.6-1.6-6.8V68a16 16 0 0 1 1-6.3c.7-1 2-3.8 0-5.4L87 51l-1.7-2.3.7-.4ZM46 79.6l.4.9.7 1c1.1 1.6 3 4.2 4 6.6 1.1 2.9.3 6.5 0 7.3a36 36 0 0 1-17.7-10.6l5.5-9 .8-.5c.4-.2 1-.5 1.5-1.3.3-.4.5-1 .5-1.7l1.1 1.1c.4.4 2.3 4.4 3.2 6.2Zm-2.9-42.1-3 .5c-1.3-.1-6.7 1.5-6.7 1.5l-3 .6a36 36 0 0 1 59.2 0l-2.9-.6S81.3 37.9 80 38l-3-.5c-2.2-.4-5-.9-6.2-.5a41 41 0 0 0-9.5 7 24.6 24.6 0 0 0-1.2 6.8v.4a7.3 7.3 0 0 0-.1-.4v-.2c0-1-.6-5.5-1.2-6.5a38 38 0 0 0-9.5-7.1c-1.2-.4-4 .1-6.2.5ZM24.6 54.3c4.7-3.4 9.6-6 9.6-6l.7.4-1.7 2.3s-3.5 3.7-5.4 5.2c-1.9 1.6-.6 4.4 0 5.4s1 2.8 1.1 6.3v.5c.1 2.2.2 4.1-1.7 7a35.9 35.9 0 0 1-2.6-21.1Zm53.7 18c.1.6.3 1.3.6 1.7.5.8 1 1 1.5 1.3.3.1.6.3.8.6l5.4 8.9A36 36 0 0 1 69 95.4c-.3-.9-1.1-4.5 0-7.3 1-2.4 2.9-5 4-6.5l.7-1.1.4-.9c1-1.8 2.8-5.8 3.2-6.2l1-1.1Z"
            />
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M75.4 69.4c-1 1-3 3.1-3.3 3.2L70.7 74l-2 1.8c-.3 0-7 4.4-8.2 9.2-.4 1.2-.5 2.7-.5 4 0-1.3-.1-2.8-.4-4-1.2-4.8-8-9.1-8.3-9.2l-2-1.8-1.4-1.3-3-3-.6-.6-1-1-2.3-2.8c-.8-.8-1 0-1 0a54 54 0 0 0-1.5-3.2c-1.1-2-.4-4.7-.4-4.7 1-.9 1.3-3.3 1.3-3.3a22 22 0 0 0 2.2-2.3C47 48.3 46 47 46 47c1 .3 1.6 0 1.6 0 0 .3 1.4.8 4 1.3 2.6.4 2.8-.4 2.8-.5 0 .4.6.6.6.6-.3 1.2.8 3 1.1 3.4.2.1.1.5 0 1 0 .7-.1 1.6.2 2.5.6 1.6 2.4 1.2 2.9 1 .3-.2.7-2 .8-3.1.1 1.2.5 3 .9 3 .4.3 2.2.7 2.8-.9.3-.9.2-1.8.1-2.5v-1c.4-.5 1.5-2.2 1.2-3.4 0 0 .6-.2.6-.6 0 .1.2.9 2.7.5 2.7-.5 4.1-1 4-1.2 0 0 .7.2 1.7 0 0 0-1 1.3 4.4 4.7 0 0 1.6 1.8 2.3 2.3 0 0 .2 2.4 1.2 3.3 0 0 .8 2.6-.4 4.7L80 65.2s-.2-.8-1 0L76.6 68l-.8 1-.4.4Zm-7-.4s.2-.3-.2-.7c-.3-.4-.2-1-.2-1.2v.1l-.8 1.2a1.5 1.5 0 0 1 1 .9c.4.8-.6 1.3-.6 1.3s.1-.8-.3-1.2a.7.7 0 0 1-.2-.7 7 7 0 0 0-.5 1.3s.6.5.4 1c0 .2-.4.5-.8.8-.3.3-.6.5-.6.7 0 0-.4-1.6.3-2.1l.6-.4.4-1.2a.7.7 0 0 1-.6.3c-.5 0-1 .8-1 .8s-.4-1 .4-1.4a1.5 1.5 0 0 1 1.4 0l.7-1.3c-.1.1-.7.6-1.1.5-.6-.2-.8.1-.8.1s.1-1 .9-1.2a1.2 1.2 0 0 1 1 .5l1-1.2h-.4l-.2.2c-.2.2-.6.5-1.6.3 0 0-1.5 1.3-2.3 3.3-.7 2-2.3 3.8-4.7 1.7 0 0-1.4.4-.9 2.4.5 2-.3 2.9-.6 2 0 0-.8 1.7-1.4-.2 0 0-1 1.3-1.2-.6 0 0-1.4.6-1-.8 0 0-1.5.1-.4-1.3 0 0-1.5-.7-.3-1.4.5-.3.9-.4 1.3-.4.6-.1 1.3-.2 2.5-1.2 2-1.8 1.7-1.8 1.7-1.8s-.8.1-.4-.5c0 0-2.9 1.3-2-1.5 0 0-3.2-.8-1.6-2.3 0 0-3.1-1.6-1.2-2.3 0 0-1.9-1.7-.6-1.7 0 0-1.2-1.7-.1-1.8 0 0-.7-2.2-.2-1.9.2.1.3.4.5.7.5.8 1.3 2.3 3.5 3.2 2.9 1.1 3.3 1.8 3.8 3.2v.3l.6 1.4c.4-.4.3-.6.3-.6-1.2-2.8.2-2.1.2-2.1-.2-.2-.3-.8-.3-.8-.5-2 1-.8 1-.8-.5-2.8.8-1.9.8-1.9-.2-2.5 1.2-1 1.2-1 .2-2.6 2.5-3 2.5-3-1.6 1-1.8 3.7-1.8 6.4s-1.3 3.8-1.3 3.8v.1l.8-.4c3.3-1.9 3.7-.6 3.8.4l.1.8a13.7 13.7 0 0 0 0 .1l.1.1-.8 1a1.2 1.2 0 0 1 1 .7c.2.6-.6 1.2-.7 1.3Z"
              clip-rule="evenodd"
            />
            <path
              fill="#fff"
              d="M65.6 47.7Zm-11.2 0Zm-6.9 53.8c.9.2 1.6.5 2 1 .6.4 1 .8 1 1.3.3.5.3 1 .2 1.4l-.1.2h-.3l-1.6-.5-.3-.1-.1-.2-.2-.5c0-.2-.2-.3-.4-.4l-.7-.4h-1.2c-.4 0-.5.2-.6.5v.5l.6.5 1.2.7 1.5 1c.4.4.7.8.8 1.2v1.5a3 3 0 0 1-.9 1.3 4 4 0 0 1-1.5.6 5 5 0 0 1-2-.2 5 5 0 0 1-1.6-.7l-1-1a3 3 0 0 1-.4-1v-1l.1-.1h.2l1.8.5h.2l.1.3.3.6c.2.2.4.4.8.5h1c.2 0 .4-.2.4-.5v-.5l-.5-.5a11 11 0 0 0-1-.6l-1.8-1.1c-.4-.4-.7-.8-.8-1.2v-1.4c.2-.6.5-1 1-1.4.5-.4 1-.6 1.7-.6a6 6 0 0 1 2.1.3Zm-4.2-1.2.1.1v.3l-7 6.3-.3.1h-.4l-1.7-1c-.2 0-.3-.1-.3-.2v-.4l1.3-9.2v-.1l.2-.1h.2l1.5.8.2.2v.2l-.2 1.5 3.2 1.7 1.2-1h.5l1.5.8Zm-4.6 1.7-2.2-1.2-.6 3.8 2.8-2.6Zm-4.1-6.6.1.2v.3l-5.8 6.7-.3.1h-.2l-1.1-1-.2-.3v-.2l1-4.9-4.6 1.7h-.6l-1.1-1-.1-.2v-.3l5.8-6.7.2-.1h.3l1.2 1.1.2.3-.1.2-3.3 3.9 3-1.2h.5l.6.5.1.3v.3l-.7 3.2 3.4-4h.4l1.3 1.1ZM27 88.2v.3l-.1.2-7 5.4h-.3l-.3-.1-3.8-5v-.6l1-.7.3-.1.3.1 2.6 3.5 1.5-1.1-2.5-3.2v-.5l1-.7.3-.1.2.1 2.5 3.3 1.5-1.2-2.7-3.5-.1-.3.1-.2 1-.8h.5l4 5.2Zm-4.8-6.7v.3c0 .1 0 .2-.2.2l-8 3.8h-.2l-.2-.1-.6-1.3c-.1-.2-.1-.3 0-.4v-.2l3.3-5.2-4.7 2.2h-.2l-.2-.1-.7-1.5v-.3l.1-.2 8-3.8h.3l.2.2.6 1.3v.5L16.5 82l4.5-2.2h.3l.2.2.7 1.4Zm-5-14.1v.4l-.3.2-8.2 4.2h-.3l-.1-.2-.3-1.7v-.4l.3-.2 5.9-2.8-6.5-1h-.3l-.2-.4-.2-1.7v-.2l.2-.1h.1l9 1.4.4.1.2.4.3 2Zm-.4-9.9c0 .8-.2 1.5-.5 2.1-.3.6-.8 1-1.3 1.4-.6.3-1.3.5-2.1.5a50.8 50.8 0 0 1-2.4-.1 4 4 0 0 1-2-.7c-.5-.4-1-.9-1.2-1.5-.2-.7-.4-1.4-.3-2.2 0-.8.2-1.5.5-2.1a3 3 0 0 1 1.3-1.4A4 4 0 0 1 11 53a26.1 26.1 0 0 1 2.4 0c.8.2 1.5.4 2 .8.6.3 1 .8 1.2 1.5.2.6.3 1.3.3 2.2Zm-2-.1c0-.5 0-1-.4-1.2-.2-.3-.7-.5-1.3-.6a25 25 0 0 0-2.2 0l-1.1.1c-.3.1-.5.3-.6.6-.2.2-.2.5-.3.8 0 .3 0 .6.2.8.1.3.3.5.6.6a46.2 46.2 0 0 0 3.3.4c.6 0 1-.1 1.3-.4.3-.3.5-.7.5-1.1Zm3.4-8.8c-.2.8-.5 1.4-.9 2-.4.5-1 .9-1.6 1a3 3 0 0 1-2.1 0 50.3 50.3 0 0 1-2.3-.5 5 5 0 0 1-1.8-1c-.5-.6-.8-1.2-.9-1.8-.1-.7 0-1.4.2-2.2.2-.8.5-1.5 1-2 .3-.5.9-1 1.5-1.1a4 4 0 0 1 2.1 0 26.2 26.2 0 0 1 2.3.6c.8.2 1.4.6 1.9 1 .4.5.7 1 .8 1.8.1.6 0 1.4-.2 2.2Zm-1.9-.5c.2-.5.1-1 0-1.3-.3-.4-.7-.6-1.3-.8a25 25 0 0 0-2.2-.6h-1c-.3 0-.6.2-.7.4-.2.2-.4.5-.4.8-.1.3-.1.6 0 .8 0 .3.1.5.4.7a46.5 46.5 0 0 0 3.1 1c.6.2 1 .2 1.4 0 .4-.2.6-.6.7-1Zm3.6-4.8-.2.2h-.3l-7.9-4-.2-.2V39l1.7-3.3c.6-1 1.2-1.7 2-2 .8-.5 1.6-.4 2.5 0 .6.3 1 .7 1.2 1.2.3.5.4 1 .4 1.5l3.8-.1h.2l.1.2v.2l-.8 1.6-.3.3h-3.7l-.6 1.3 2.7 1.4.2.2v.2l-.8 1.6ZM16 39.1l.7-1.5c.2-.3.2-.7.2-1a1 1 0 0 0-.7-.6 1 1 0 0 0-.9-.1c-.3 0-.5.3-.7.7L14 38l2 1ZM27.8 31l-.4.1h-.3l-8.3-3.9h-.1l-.1-.3v-.2l1.2-1.2.3-.2h.3l6 3-3.4-5.8v-.2l.1-.4 1.2-1.2s0-.1.2 0c0-.1.1 0 .2 0l4.5 8 .1.4-.1.3-1.4 1.6Zm4.6-4.6-.3.1-.2-.1-5.1-7.2v-.5l3-2.1c1-.7 2-1 2.8-1 .8 0 1.6.5 2.1 1.3.4.5.6 1 .6 1.6 0 .5-.1 1-.4 1.5l3.5 1.6v.1l.1.3-.1.1-1.5 1c-.1.2-.2.2-.3.2h-.3l-3-1.6-1.2.8 1.8 2.4v.5l-1.5 1ZM31 21l1.3-.9c.4-.2.5-.5.6-.8 0-.3 0-.6-.2-.9-.2-.3-.5-.4-.8-.5-.3 0-.6 0-1 .3l-1.2 1L31 21Zm9 .5h-.3c-.1 0-.2 0-.2-.2l-4-7.9v-.2c0-.1 0-.2.2-.2l1.6-.9h.3l.2.2 4 8v.2l-.2.2-1.6.8Zm6.9-2.8-1.5.3c-.5 0-1 0-1.3-.2a3 3 0 0 1-1.2-.6 3 3 0 0 1-.7-1.2v-.2c0-.1 0-.2.2-.2L44 16h.3l.3.2c0 .3.2.4.4.6l.6.2c.2 0 .4 0 .6-.2.5 0 .8-.3.9-.7v-1.3L45.8 11l-4.2 1.4h-.2l-.2-.2-.4-1.3v-.3l.2-.1 6.3-2c0-.1.2-.1.2 0l.2.1 1.8 5.4c.2.8.3 1.5.1 2-.2.7-.5 1.2-1 1.7a5 5 0 0 1-1.8 1Zm5.4-1.5H52l-.1-.3-.9-8.8V8l.3-.1 1.8-.2h.2l.1.3.4 3.2 3.3-.3-.3-3.2v-.3l.3-.1 1.7-.2h.3v.3l1 8.8-.1.2-.2.1-1.8.2h-.2l-.2-.3-.3-3.3-3.3.3.3 3.4v.2l-.3.1-1.7.2Zm9.4-.7h-.2v-.3l.8-8.9.1-.2h.3l6.3.6.3.1v1.5l-.2.3h-.3l-4.3-.4-.2 1.8 4 .4c.2 0 .2 0 .3.2V13l-.2.2-.2.1-4-.4-.3 1.9 4.5.4.2.1V17s0 .2-.2.2h-.2l-6.5-.6Zm8.3 1.3-.1-.2v-.3L72 8.8l.2-.3h.2l1.8.5.2.1v.3l-2 8.6-.2.2h-.3l-1.7-.4Zm4.5 1.1-.2-.2v-.3l3.5-8.1.2-.2h.3l3.2 1.4c.8.4 1.5.8 2 1.3.4.6.7 1.1.8 1.8a4 4 0 0 1-.3 2 47 47 0 0 1-.9 2c-.3.7-.8 1.3-1.3 1.7a3 3 0 0 1-1.8.6c-.7 0-1.4-.2-2.2-.6L74.5 19Zm2.7-1 1.3.6c.4.2.7.2 1 .2.3 0 .5 0 .7-.3.3-.2.5-.5.6-.8a10.5 10.5 0 0 0 .9-2c.2-.5.2-1 0-1.4-.1-.3-.5-.7-1-.9l-1.3-.5-2.2 5.1Zm8.4 6.9-.1-.2v-.2l5.7-6.9h.3c0-.1.1 0 .2 0l4.9 4 .1.3v.2l-.9 1-.2.2-.3-.1-3.3-2.8-1.2 1.4 3.1 2.6.2.2-.1.3-.8.9-.2.1h-.3l-3-2.6-1.3 1.4 3.4 2.9.2.2-.1.2-.8 1-.3.2-.2-.1-5-4.2Zm6.2 5.4s-.1-.1 0-.2v-.2l7-5.6s.1-.1.2 0h.2l1 1.2v.5l-2 5.9 4-3.3h.5l1 1.4.2.2-.2.2-6.9 5.6-.2.1-.3-.1-.9-1.2-.1-.3v-.2l1.9-5.7-3.9 3-.2.2-.3-.2-1-1.3Zm8.1 12.6v-.3c0-.2 0-.2.2-.3l7-6h.3l.1.2.7 1.5v.4l-.2.2-5 4.2 6.5-.6h.3l.2.3.7 1.5v.3l-.2.1h-.1l-9.1.8h-.4l-.2-.3-.8-2ZM102 49l.1-.3.3-.1 8.6-1.8h.3l.1.3 1.3 6.3v.2l-.3.2-1.2.2h-.3l-.1-.3-.9-4.2-1.8.3.8 4v.3l-.3.1-1.2.2h-.2l-.2-.2-.7-4-1.9.4.9 4.3v.3l-.3.1-1.3.3h-.2l-.2-.3-1.2-6.3Zm1.5 8v-.2l.3-.1 8.9.1.2.1.1.3v3.7a4 4 0 0 1-1 2.7c-.5.7-1.2 1-2.2 1-.7 0-1.2-.2-1.6-.5-.5-.3-.8-.7-1-1.2l-3.4 1.8h-.4v-2.1l.1-.4.3-.1 3-1.5v-1.4h-3l-.3-.2v-2Zm5.2 2.2v1.6c0 .4 0 .7.3 1 .2.2.5.3.8.3.4 0 .7-.1 1-.3l.3-1v-1.6h-2.4Zm-5.6 6.7.2-.2h.2l8.7 1.7.2.2v.3l-.8 4c-.1.8-.4 1.4-.7 1.8-.3.5-.7.8-1.1 1h-1.5a2 2 0 0 1-1.3-1 2 2 0 0 1-.3-.5c-.2.3-.5.6-1 .7-.4.2-.8.3-1.3.2l-1.5-.7a3 3 0 0 1-.7-1.4v-2l1-4.1Zm1.3 2.4-.4 1.9c0 .4 0 .7.2 1l.7.4c.3 0 .6 0 .8-.2.3-.1.5-.4.5-.8l.4-1.8-2.2-.5Zm4 .8L108 71v.9l.7.4c.3 0 .6 0 .8-.2.2 0 .4-.3.4-.7l.4-1.8-2-.4Zm-7.6 5.7.2-.2h.3l8.2 3.2a.3.3 0 0 1 .2.4l-.6 1.7-.2.2h-.2l-8.3-3.2a.3.3 0 0 1-.2-.4l.6-1.7ZM99.2 79l.2-.2h.3l7.7 4.5a.3.3 0 0 1 .1.5l-.7 1.2c0 .2-.2.2-.3.3h-.2l-6.2.3 4.5 2.6.2.2v.2l-.9 1.5-.2.1h-.3l-7.7-4.4-.1-.3v-.2l.7-1.3.3-.2h.2l6-.4-4.3-2.5-.1-.2v-.3l.8-1.4Zm-4.9 7.7h.5l6.6 6v.2c.1 0 0 .2 0 .2L99 95.8c-.6.6-1.2 1.1-1.8 1.4-.7.2-1.3.3-2 .2a4 4 0 0 1-1.8-1A47.5 47.5 0 0 1 92 95a4 4 0 0 1-1.2-1.8 3 3 0 0 1 0-1.8c.2-.7.6-1.3 1.2-2l2.4-2.7Zm0 3-.9 1-.5.8v.9a10.3 10.3 0 0 0 1.6 1.8c.2 0 .4.2.6.4.4.4.9.6 1.3.5.4 0 .8-.3 1.2-.7l1-1-4.2-3.8Zm-6.5 3.7h.4l5.6 7 .1.2-.1.2-1.4 1.2h-.5l-5.6-7s-.1-.1 0-.2v-.2l1.5-1.2Zm-3.6 2.8h.3l.2.1L89 104v.2c0 .1 0 .2-.2.3l-1.2.7H87l-5.4-3 2.5 4.6v.2l-.1.2-1.4.8h-.3l-.2-.1-4.4-7.7v-.2l.1-.3 1.3-.7h.5l5.4 2.8-2.4-4.4s-.1-.1 0-.2V97l1.5-.8Zm-11.6 5.2c.9-.3 1.6-.4 2.3-.3.7.1 1.3.4 1.8.8s.8 1 1.1 1.7a53.5 53.5 0 0 1 .8 2.4c.2.8.2 1.5 0 2-.2.7-.5 1.2-1 1.7-.5.4-1.2.8-2 1a4 4 0 0 1-3.2.1 3 3 0 0 1-1.1-.6l-.6-.9v-.2l.2-.1 1.9-.6h.4a1.8 1.8 0 0 0 1 .6l.8-.1c.5-.2.9-.4 1-.8.3-.3.3-.8.1-1.4l-.7-2.2c-.2-.6-.5-1-.9-1.2-.4-.2-.8-.2-1.3 0-.3 0-.6.2-.8.4l-.4.7v1l.1.3 1.2-.4h.3l.2.2.3 1v.2l-.3.2-3.2 1h-.3l-.2-.2-.4-1.4a3.4 3.4 0 0 1 1-3.7c.5-.6 1.1-1 2-1.2Zm-16.9 3.1h1a3.2 3.2 0 0 1 1.9 1.4h.1a.2.2 0 0 0 .2 0v-.1a8 8 0 0 1 1.2-1.8h.3l.4.4a6.4 6.4 0 0 1 1.2 1.4.2.2 0 0 0 .1 0l1-.9 1-.5h.9l.1.2-.1.1-.7.8c-.2.4-.3.9-.3 1.4v1.6a11 11 0 0 1-.3 2c-.1.5-.3 1-.6 1.3a3 3 0 0 1-1.5 1l-1 .2h-.5c-.4 0-.7 0-1-.2-.4 0-.8-.2-1.1-.5-.4-.2-.6-.5-.8-.8-.2-.4-.4-.8-.4-1.2-.2-.7-.3-1.5-.3-2.3v-1.5a2.7 2.7 0 0 0-1-1.8.1.1 0 0 1 0-.2h.2Z"
            />
          </svg>

          {/* Content */}
          <div
            style={{
              position: 'absolute',
              top: dimensions.padding,
              bottom: dimensions.padding,
              left: flip
                ? dimensions.image + dimensions.shape
                : dimensions.padding,
              right: flip
                ? dimensions.padding
                : dimensions.image + dimensions.shape,
              display: 'flex',
              flexDirection: 'column',
              gap: `${dimensions.font / 2}px`,
            }}
          >
            {title && (
              <div
                style={{
                  fontSize: `${dimensions.font * 1.5}px`,
                  fontWeight: 'bold',
                  color,
                  // Truncate text
                  width: `${
                    dimensions.width - dimensions.image - dimensions.padding * 2
                  }px`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexShrink: 0,
                }}
              >
                {title}
              </div>
            )}

            {hasLine && (
              <div
                style={{
                  backgroundColor: color,
                  height: hasLine ? `${dimensions.font / 6}px` : '0',
                  width: '100%',
                  borderRadius: `${dimensions.font / 6}px`,
                }}
              />
            )}

            <div
              style={{
                fontSize: `${dimensions.font}px`,
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: dimensions.width,
      height: dimensions.height,
    },
  )
}

export default handler
