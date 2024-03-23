import { NextRequest } from 'next/server'

import { quotesRouter } from '@fc/services/src/api/quotes'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return quotesRouter(req)
}
