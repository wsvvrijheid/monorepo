import { StrapiResponse, Tag } from '@wsvvrijheid/types'

export const TAG_MOCKS: StrapiResponse<Tag[]> = {
  data: [
    {
      id: 1,
      code: 'humanity',
      name_en: 'humanity',
      name_nl: 'mensheid',
      name_tr: 'insanlik',
      createdAt: '2022-03-13T18:51:30.378Z',
      updatedAt: '2022-03-13T18:51:30.943Z',
      publishedAt: '2022-03-13T18:51:30.941Z',
      arts: [
        {
          id: 5,
          title: 'Eenzaamheid tijdens corona',
          slug: 'eenzaa',
          description: null,
          content:
            "Mijn vrouw die tijdens de lockdown een bliksembezoek mag brengen aan moeder, die in het zorgcentrum verblijft en ternauwernood contact kan krijgen met haar. Hartverscheurend is de lege blik van moeder die het helemaal niet begrijpt wat er gaande is en mijn vrouw die via zacht tikken op het raam toch enigszins probeert om nog even 'n praatje te kunnen maken met haar, maar tevergeefs ... het contact liep heel stroef en was voor beide partijen uitputten.",
          createdAt: '2022-03-25T19:21:11.815Z',
          updatedAt: '2022-06-12T16:15:21.405Z',
          publishedAt: '2022-03-25T19:22:15.419Z',
          locale: 'nl',
          status: 'approved',
          previousStatus: null,
          likes: null,
          views: 1,
        },
      ],
      blogs: [],
      announcements: [],
      applications: [],
      posts: [],
      activities: [
        {
          id: 10,
          title: 'Empati',
          slug: 'empati',
          content:
            'Yeni Hollandalı bir grup sanatsever\'in ilk eseri #Empati youtube kanalında yayınlandı. \nEmpati isimli kısa filmde mülteciliğin en çok karşılaştığı sorunlardan birisi olan ırkçılık ele alındı. Filmde derdini anlatamama, anlaşılamama ve hoşgörüsüzlük gibi detaylara yer verildi. \n\nRudolf ırkçı ülkesinde yapancı hiçbir milletten insanı istemeyen birisidir. Bir sabah her haliyle farklı bir şekilde uyanır. Komşusu ve arkadaşlarına yabancıdır. Ne komşusu ne de arkadaşları onun dilinden anlamaz olur. En samimi arkadaşarı dahi onu anlayamayıp tartaklamaya başlar. Onu bu zor durumda dahi ırkçılık yaptığı, ülkesinde istemediği kişiler kurtarır. O andan itibaren onun için artık herşey değişmiştir. Yorgun argın geldiği evde o şekilde uyayakalır. Ertesi sabah uyandığında eski halindedir. Ancak bu sefer düşünce olarak artık Rudolf eskisinden farklıdır. Nasıl bu kadar kötü olabildiğine şaşırdığı pişmanlık içinde eskiden kalma ne varsa çöpe atar ve onun için yep yeni bir sayfa başlar. \n\nEmpati\'yi kendi kanalından izleyebilirsiniz. \n \n [Empati](https://youtu.be/RwWBOmw7JT0)\n\n\n<iframe src="https://www.youtube.com/embed/RwWBOmw7JT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />',
          date: '2022-05-25T16:00:00.000Z',
          createdAt: '2022-05-29T17:15:08.530Z',
          updatedAt: '2022-06-03T13:33:59.766Z',
          publishedAt: '2022-05-29T17:16:51.448Z',
          locale: 'tr',
          description:
            'Empati isimli kısa filmde mülteciliğin en çok karşılaştığı sorunlardan birisi olan ırkçılık ele alındı. Filmde derdini anlatamama, anlaşılamama ve hoşgörüsüzlük gibi detaylara yer verildi. ',
        },
      ],
    },
    {
      id: 2,
      code: 'freedom',
      name_en: 'freedom',
      name_nl: 'vrijheid',
      name_tr: 'özgürlük',
      createdAt: '2022-04-01T08:17:12.323Z',
      updatedAt: '2022-04-01T08:17:13.730Z',
      publishedAt: '2022-04-01T08:17:13.727Z',
      arts: [],
      blogs: [],
      announcements: [],
      applications: [],
      posts: [],
      activities: [
        {
          id: 2,
          title: 'The Netherlands through the eyes of a refugees',
          slug: 'the-netherlands-through-the-eyes-of-refugees',
          content:
            'You are all invited to the group art exhibition "The Netherlands through the eyes of a refugee" organized by our platform Kunsthalte.\nThe opening of our exhibition will be held on 25 June 2022 at 13:00. You can visit the exhibition until 21:00 on 09 July 2022.\n\n### Visiting hours\n\nYou can visit between 09:00 and 21:00 on all days except Monday, and between 11:00 and 14:00 on Sundays. **Our exhibition place is closed on Mondays.**\n\nYou can send your comments, criticisms and likes regarding the exhibition to kunsthalte@wsvvrijheid.nl.\nYou can follow us at the addresses below to be informed about our next activities and to see the works of our exhibition online.\n\n### Our Banner\n\n![Afiş-NL-2022-06-05 at 11.01.07.jpeg](https://api.samenvvv.nl/uploads/Afis_NL_2022_06_05_at_11_01_07_81e3036038.jpeg)\n\n### Follow-up\n\n[Our website](https://kunsthalte.com)\n[Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) [Twitter](https://twitter.com/sanatduragi_nl)\n\n### Donation\n\nYou can show your support for the arts and artists by making a donation. You can use [this link](https://www.eventbrite.com/e/tickets-nederland-door-de-ogen-van-een-vluchteling-373524410567) to donate.\n\n[Our Foundation](https://wsvvrijheid.nl/about-us)',
          date: '2022-06-25T09:00:00.000Z',
          createdAt: '2022-03-22T08:26:02.127Z',
          updatedAt: '2022-06-26T18:58:11.984Z',
          publishedAt: '2022-06-26T12:23:48.772Z',
          locale: 'en',
          description:
            'We are planning an art exhibition entitled Netherlands through the eyes of a refugees in Amsterdam Boosta in May 2022.',
        },
        {
          id: 10,
          title: 'Empati',
          slug: 'empati',
          content:
            'Yeni Hollandalı bir grup sanatsever\'in ilk eseri #Empati youtube kanalında yayınlandı. \nEmpati isimli kısa filmde mülteciliğin en çok karşılaştığı sorunlardan birisi olan ırkçılık ele alındı. Filmde derdini anlatamama, anlaşılamama ve hoşgörüsüzlük gibi detaylara yer verildi. \n\nRudolf ırkçı ülkesinde yapancı hiçbir milletten insanı istemeyen birisidir. Bir sabah her haliyle farklı bir şekilde uyanır. Komşusu ve arkadaşlarına yabancıdır. Ne komşusu ne de arkadaşları onun dilinden anlamaz olur. En samimi arkadaşarı dahi onu anlayamayıp tartaklamaya başlar. Onu bu zor durumda dahi ırkçılık yaptığı, ülkesinde istemediği kişiler kurtarır. O andan itibaren onun için artık herşey değişmiştir. Yorgun argın geldiği evde o şekilde uyayakalır. Ertesi sabah uyandığında eski halindedir. Ancak bu sefer düşünce olarak artık Rudolf eskisinden farklıdır. Nasıl bu kadar kötü olabildiğine şaşırdığı pişmanlık içinde eskiden kalma ne varsa çöpe atar ve onun için yep yeni bir sayfa başlar. \n\nEmpati\'yi kendi kanalından izleyebilirsiniz. \n \n [Empati](https://youtu.be/RwWBOmw7JT0)\n\n\n<iframe src="https://www.youtube.com/embed/RwWBOmw7JT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />',
          date: '2022-05-25T16:00:00.000Z',
          createdAt: '2022-05-29T17:15:08.530Z',
          updatedAt: '2022-06-03T13:33:59.766Z',
          publishedAt: '2022-05-29T17:16:51.448Z',
          locale: 'tr',
          description:
            'Empati isimli kısa filmde mülteciliğin en çok karşılaştığı sorunlardan birisi olan ırkçılık ele alındı. Filmde derdini anlatamama, anlaşılamama ve hoşgörüsüzlük gibi detaylara yer verildi. ',
        },
      ],
    },
    {
      id: 3,
      code: 'way',
      name_en: 'way',
      name_nl: 'weg',
      name_tr: 'yol',
      createdAt: '2022-06-22T05:56:35.069Z',
      updatedAt: '2022-06-22T05:57:55.930Z',
      publishedAt: '2022-06-22T05:57:55.926Z',
      arts: [],
      blogs: [],
      announcements: [],
      applications: [],
      posts: [],
      activities: [
        {
          id: 13,
          title: 'Yol Tiyatro Oyunu',
          slug: 'yol-tiyatrosu',
          content:
            "_Ve sonra ölüm gelir.. en son gelir ölüm ama yine de erken deriz... Bu yolda vefat eden tüm kardeşlerimizin anısına..._\n\nWees de stem voor vrijheid vakfına bağlı Lotus van de Media  platformunun ilk tiyatrosu \"Yol\" 2 Temmuz 2022 günü saat 20:00'de gala yaptı. \n\n15 Temmuz 2016 tarihinde Türkiye'de gerçekleşen darbe tiyatrosu bahane edilerek ev hanımı, öğrenci, memur ve esnaf gibi binlerce masum insan ya tutuklandı ya da evinden işinden edildi. Onlarcası Meriç'in soğuk sularında vuslata erdi. \"Yol\" tiyatrosu Türkiyede yaşanan bu zulmü biraz da olsa anlatma imkanı buldu.  \n\nGalasında büyük bir ilgi ve beğeniyle izlenen \"Yol\" tiyatrosu turne yapmak için yeni yerlerden talep bekliyor. Talenizi iletişim sayfasından bize iletebilirsiniz. \n\n### İlk tiyatrodan bazı kesitler.\n\nNormal zamanda büyük bir coşkuyla sevinçle ve kalabalıklarla yapılan nikah merasimi, zulmün her adım başında olduğu Türkiye'de, cezaevinin soğuk duvarları arasında yapıldı. Sevinçlerini buruk bir şekilde yine kendileri gibi suçsuzca özgürlüklerinden mahrum bırakılmış masumlarla paylaştılar.  \n\n![Yol 3jpeg.jpeg](https://api.samenvvv.nl/uploads/Yol_3jpeg_c20df1010e.jpeg)\n\nHayatlarında adliyenin önünden geçmemiş insanlar öz vatanından ayrılmak zorunda bırakıldı. \n\n![Yol1.jpeg](https://api.samenvvv.nl/uploads/Yol1_52d638ae9c.jpeg)\n\nBir çokları Meriç'in soğuk sularında hayatını kaybetti. \n\n![Yol 2.jpeg](https://api.samenvvv.nl/uploads/Yol_2_c108aff55f.jpeg)\n\nTiyatromuz unutamadıklarımız anısınaydı. Sizleri hiç unutmadık, hep kalbimizin bir yerindesiniz.  \n\n![unutamadıklarımız.jpeg](https://api.samenvvv.nl/uploads/unutamadiklarimiz_2b21037e1d.jpeg)\n\nLotus van de Medianın kısa film tiyatro gibi çalışmalarda desteklerinize ve bağışlarınıza ihtiyacı var. [Buradan](https://www.eventbrite.com/e/tickets-yol-371156387747) bağışta bulunabilirsiniz. \n\n### Lotus van de Media kimdir?\nLotus van de Media platformu, evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanmayı, tecrübeleri geliştirmeyi ve sayılan alanlarda stajla birlikte referans sağlamayı amaçlamaktadır. Kısa film, tiyatro gibi projeler geliştirmeyi düşünmektedir.\n\n### Lotus van de Media'ya nasıl katılabilirim?\nOyunculuk, yönetmenlik, senaristlik veya destek hizmetleri alanlarında kendinizi geliştirmek ya da seçeceğiniz alanda tecrübenizi aktarmak isterseniz, kısaca kendinizden bahsederek [buradan](https://wsvvrijheid.nl/tr/join)  bize katılma talebinde bulunabilirsiniz. \n\nLotus van de Media'yı [youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg), [instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve [twitterdan](https://twitter.com/infolotusmedia) takip edebilirsiniz. \n",
          date: '2022-07-02T16:00:00.000Z',
          createdAt: '2022-07-03T11:46:54.520Z',
          updatedAt: '2022-07-03T12:32:52.030Z',
          publishedAt: '2022-07-03T12:08:00.572Z',
          locale: 'tr',
          description:
            '15 Temmuz 2016 tarihinde Türkiye\'de gerçekleşen darbe tiyatrosu bahane edilerek ev hanımı, öğrenci, memur ve esnaf gibi binlerce masum insan ya tutuklandı ya da evinden işinden edildi. Onlarcası Meriç\'in soğuk sularında vuslata erdi. "Yol" tiyatrosu Türkiyede yaşanan bu zulmü biraz da olsa anlatma imkanı buldu.  ',
        },
      ],
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 3 } },
}
