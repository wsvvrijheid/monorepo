const apiKey = process.env.MAILCHIMP_API_KEY as string
const apiServer = process.env.MAILCHIMP_API_SERVER as string

const urls = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listUrl: (listId?: string) =>
    `https://${apiServer}.api.mailchimp.com/3.0/lists`,

  membersUrl: (listId: string) =>
    `https://${apiServer}.api.mailchimp.com/3.0/lists/${listId}/members`,
}

const request = async <T>(
  url: keyof typeof urls,
  method: 'POST' | 'DELETE',
  listId?: string,
  data?: object,
) => {
  try {
    const result = await fetch(urls[url](listId), {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    })
    if (!result.ok) {
      console.error(result)
      throw new Error('Network response was not ok, ' + result.statusText)
    }
    return result.json() as T
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const createMailList = async (
  name: string,
  courseId: string,
): Promise<{
  id?: string
  webId?: string
  server?: string
  error?: string
  courseId: string
}> => {
  const defaultParams = {
    name: 'name',
    permission_reminder: 'permission_reminder',
    email_type_option: true,
    contact: {
      company: 'Freedom Combination Foundation',
      address1: 'Taandersplein 1, 3027 CN',
      city: 'Rotterdam',
      country: 'Netherland',
    },
    campaign_defaults: {
      from_name: 'Freedom Combination Foundation',
      from_email: 'info@freedomcombination.com',
      subject: 'Course',
      language: 'nl',
    },
  }

  try {
    const response = await request<{
      id?: string
      web_id?: string
    }>('listUrl', 'POST', undefined, {
      ...defaultParams,
      name,
    })
    console.info('response', response)
    return {
      id: response.id, //mailchimp listId, it's needed to add members
      webId: response.web_id, //mailchimp webId, it's needed to navigate to mailchimp dashboard
      server: apiServer, //mailchimp server
      courseId,
    }
  } catch (error) {
    console.error(error)
    return {
      courseId, // this is for dashboard to call custom route /course-mailchimp/:id
      server: apiServer,
      error: error instanceof Error ? error.message : error,
    }
  }
}

export const deleteMailList = async (id: string) => {
  request('membersUrl', 'DELETE', id)
}

export const addToMailList = async (listId: string, emails: string[]) => {
  const data = {
    members: emails.map(email => {
      return {
        email_address: email,
        status: 'subscribed',
        skip_merge_validation: true,
      }
    }),
  }

  await request('membersUrl', 'POST', listId, data)
}
