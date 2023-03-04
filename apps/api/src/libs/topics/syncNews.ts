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
import { RecommendedTopic } from './utils/types'

// import getTurkishMinuteNews from './sources/turkishminute'

export const syncNews = async ({ strapi }) => {
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

    const recommendedTopics = await strapi
      .service('api::recommended-topic.recommended-topic')
      .find()

    const topics = await Promise.all(sources.map(source => source()))
    const result = topics.flat().filter(topic => !isEmpty(topic))

    // const distinctResults = [
    //   ...new Map(result.map(item => [item['url'], item])).values(),
    // ]

    const updatedTopics = result.map(topic => {
      const isRecommended = recommendedTopics?.results?.some(
        (recommendedTopic: RecommendedTopic) =>
          recommendedTopic.url === topic.url,
      )

      return {
        ...topic,
        isRecommended,
      }
    })

    console.log(` ${updatedTopics.length} total news fetched.`)
    console.log('All news fetched. ' + new Date())
    console.log('-----------------------------------')

    await strapi.service('api::topic.topic').createOrUpdate({
      data: { data: updatedTopics },
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
