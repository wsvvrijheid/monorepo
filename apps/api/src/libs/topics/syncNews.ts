import type { Strapi } from '@strapi/strapi'
import isEmpty from 'lodash/isEmpty'

import {
  getAktifHaber,
  getAmnesty,
  getAmnestyEnNews,
  getBoldMedyaNews,
  getKanttekeningNews,
  getNosNews,
  // getNuNews,
  getRtlNews,
  getSamanyoluNews,
  getSolidaritywithothersNews,
  getTr724News,
  getTrouwNews,
  // getTurkishMinuteNews,
} from './sources'
import { AnyEntity } from '@strapi/strapi/lib/services/entity-service'

// import getTurkishMinuteNews from './sources/turkishminute'

export const syncNews = async ({ strapi }: { strapi: Strapi }) => {
  try {
    const sources = [
      getAktifHaber,
      getAmnesty,
      getBoldMedyaNews,
      getKanttekeningNews,
      getNosNews,
      // getNuNews,
      getRtlNews,
      getSamanyoluNews,
      getTr724News,
      getTrouwNews,
      getSolidaritywithothersNews,
      getAmnestyEnNews,
      // getTurkishMinuteNews,
    ]

    console.log('-----------------------------------')
    console.log('All news fetching... ' + new Date())

    const recommendedTopics = (
      await Promise.all(
        ['tr', 'en', 'nl'].map(locale =>
          strapi.entityService.findMany(
            'api::recommended-topic.recommended-topic',
            {
              locale,
              fields: ['url', 'locale'],
            },
          ),
        ),
      )
    )
      ?.flat()
      ?.filter(t => !isEmpty(t))

    const topics = await Promise.all(sources.map(source => source()))
    const result = topics.flat().filter(topic => !isEmpty(topic))

    const updatedTopics = result.map(topic => {
      const isRecommended = recommendedTopics?.some(
        recommendedTopic => recommendedTopic.url === topic.url,
      )

      return {
        ...topic,
        isRecommended,
      }
    })

    console.log(` ${updatedTopics.length} total news fetched.`)
    console.log('All news fetched. ' + new Date())
    console.log('-----------------------------------')

    await strapi.db.query('api::topic.topic').update({
      where: { id: 1 },
      data: {
        data: updatedTopics,
        isSyncing: false,
      },
    })

    return updatedTopics.length
  } catch (error) {
    console.error('error', error)

    return error
  }
}

/* 
+ 1- Bold Medya
+ https://boldmedya.com/
+ 2- Samanyoluhaber
+ http://www.samanyoluhaber.com/
+ 3- Aktifhaber
+ http://aktifhaber.com/
+ 4- tr724
+ https://www.tr724.com/
+ 1-NOS
+ https://nl.m.wikipedia.org/wiki/Lijst_van_kranten_in_Nederland
+ 2- De Kanttekening
+ https://dekanttekening.nl/
+ 3- Nu
+ https://www.nu.nl/
+ 4- Amnesty.nl
+ https://www.amnesty.nl/
? 5- De Telegraaf
? https://www.telegraaf.nl/
? 6- Ad
? https://www.ad.nl/
+ 7- De Volkskrant
+ https://www.volkskrant.nl/
+ 8- NRC
+ https://www.nrc.nl/
+ 9- Trouw
+ https://www.trouw.nl/
+ 10- Fd
+ https://fd.nl/ 

*/
