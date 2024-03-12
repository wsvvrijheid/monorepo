const mailchimp = require('@mailchimp/mailchimp_marketing')

const apiKey = process.env.MAILCHIMP_API_KEY as string
const apiServer = process.env.MAILCHIMP_API_SERVER as string

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
  mailchimp.setConfig({
    apiKey,
    server: apiServer,
  })

  console.info('apiKey', apiKey, 'apiServer', apiServer)

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
    const response = await mailchimp.lists.createList({
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
  mailchimp.setConfig({
    apiKey,
    server: apiServer,
  })

  await mailchimp.lists.deleteList(id)
}

export const addToMailList = async (id: string, email: string) => {
  mailchimp.setConfig({
    apiKey,
    server: apiServer,
  })
  await mailchimp.lists.addListMember(id, {
    email_address: email,
    status: 'subscribed',
    skip_merge_validation: true,
  })
  mailchimp.lists.addListMembers
}

export const addToMailListBatch = async (listId: string, emails: string[]) => {
  const url = `https://${apiServer}.api.mailchimp.com/3.0/lists/${listId}/members`
  const data = {
    members: emails.map(email => {
      return {
        email_address: email,
        status: 'subscribed',
      }
    }),
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
      console.error('Error:', error)
      throw error
    })
}
