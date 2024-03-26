import { GeneratedArchiveContentPost } from './GenPostProvider'

let lastBest: GeneratedArchiveContentPost[] = []

export const parseIncompletePosts = (
  src: string,
): GeneratedArchiveContentPost[] => {
  if (src.length < 50) {
    lastBest = []
  }
  const patternDesc = '"description":"'

  try {
    const objs = src.substring(2).split('},{')

    const ret: GeneratedArchiveContentPost[] = []
    for (const obj of objs) {
      const parts = obj.split('","sentences":["')
      const temp: GeneratedArchiveContentPost = {
        description:
          parts[0].length < patternDesc.length
            ? 'waiting...'
            : parts[0].replace(patternDesc, ''),
        sentences:
          parts.length > 1 ? parts[1].replace('"]', '').split('","') : [],
      }
      console.log(temp.description)
      ret.push(temp)
    }
    lastBest = ret

    return ret
  } catch (e) {
    return lastBest
  }
}
