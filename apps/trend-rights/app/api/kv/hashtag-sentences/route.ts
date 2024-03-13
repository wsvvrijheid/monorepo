import { NextRequest } from 'next/server'

import { hashtagSentencesRouter } from '@fc/services/src/api/hashtag-sentences'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return hashtagSentencesRouter.GET(req)
}

export async function POST(req: NextRequest) {
  return hashtagSentencesRouter.POST(req)
}

export async function PUT(req: NextRequest) {
  return hashtagSentencesRouter.PUT(req)
}

export async function DELETE(req: NextRequest) {
  return hashtagSentencesRouter.DELETE(req)
}
