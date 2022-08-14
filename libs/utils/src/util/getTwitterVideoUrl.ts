type Variant = {
  bitrate: number
  content_type: string
  url: string
}

export const getTwitterVideoUrl = (variants: Variant[]): string => {
  return variants
    .filter(video => video.bitrate)
    .sort((a, b) => a.bitrate - b.bitrate)[0].url
}
