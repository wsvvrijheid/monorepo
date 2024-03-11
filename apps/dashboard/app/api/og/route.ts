import { NextRequest } from 'next/server'

import { ogRouter } from '@fc/services/src/api/og'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return ogRouter(req)
}
