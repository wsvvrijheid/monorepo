import { Course, StrapiCollectionResponse } from '@wsvvrijheid/types'

export const COURSE_MOCKS: StrapiCollectionResponse<Course[]> = {
  data: [
    {
      id: 1,
      title_en: 'Script Writing Course',
      title_tr: 'Senaryo Yazarlığı Kursu',
      title_nl: 'Cursus Scriptschrijven',
      slug: 'script-writing-course',
      description_en:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . ',
      description_tr:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . ',
      description_nl:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . ',
      content_en:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . ',
      content_tr:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . \n \n10 hafta sürecek olan  senaryo eğitimi …. Tarihinde başlayacaktır . \nEğitimimiz boyunca  edinilecek kazanımlar :  \n- Öykü nedir\n- Anlatı, öykü, senaryo\n- Bir öykünün ana unsurları nelerdir\n- Öyküde yapı ve karakter nasıl oluşturulur\n- Senaryo türleri\n- Senaryo yazma süreci ve tekniği\n- Sinemada türler ve senaryo\n- Senaryo ve seyirci',
      content_nl:
        'Lotus medya bünyesinde Gökhan Yorgancıgil’in online senaryo eğitimine katılabilir , Lotus medya ekibininin senarist kadrosunda yer alabilirsiniz . \n \n10 hafta sürecek olan  senaryo eğitimi …. Tarihinde başlayacaktır . \nEğitimimiz boyunca  edinilecek kazanımlar :  \n- Öykü nedir\n- Anlatı, öykü, senaryo\n- Bir öykünün ana unsurları nelerdir\n- Öyküde yapı ve karakter nasıl oluşturulur\n- Senaryo türleri\n- Senaryo yazma süreci ve tekniği\n- Sinemada türler ve senaryo\n- Senaryo ve seyirci',
      location: 'online',
      language: 'tr',
      instructor: 'Gökhan Yorgancıgil',
      price: 100,
      quota: 30,
      isOnline: true,
      approvalStatus: 'approved',
      startDate: '2023-05-05',
      endDate: '2023-07-14',
      createdAt: '2023-04-08T09:31:16.213Z',
      updatedAt: '2023-04-08T09:36:23.030Z',
      publishedAt: '2023-04-08T09:32:53.854Z',
      image: {
        id: 355,
        name: 'Movie Creative Black and Grey YouTube Cover.png',
        alternativeText: null,
        caption: null,
        width: 2560,
        height: 1440,
        formats: {
          large: {
            ext: '.png',
            url: '/uploads/large_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814.png',
            hash: 'large_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814',
            mime: 'image/png',
            name: 'large_Movie Creative Black and Grey YouTube Cover.png',
            path: null,
            size: 162.67,
            width: 1080,
            height: 608,
          },
          small: {
            ext: '.png',
            url: '/uploads/small_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814.png',
            hash: 'small_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814',
            mime: 'image/png',
            name: 'small_Movie Creative Black and Grey YouTube Cover.png',
            path: null,
            size: 60.16,
            width: 512,
            height: 288,
          },
          medium: {
            ext: '.png',
            url: '/uploads/medium_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814.png',
            hash: 'medium_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814',
            mime: 'image/png',
            name: 'medium_Movie Creative Black and Grey YouTube Cover.png',
            path: null,
            size: 92.61,
            width: 720,
            height: 405,
          },
          thumbnail: {
            ext: '.png',
            url: '/uploads/thumbnail_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814.png',
            hash: 'thumbnail_Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814',
            mime: 'image/png',
            name: 'thumbnail_Movie Creative Black and Grey YouTube Cover.png',
            path: null,
            size: 23.57,
            width: 245,
            height: 138,
          },
        },
        hash: 'Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814',
        ext: '.png',
        mime: 'image/png',
        size: 74.95,
        url: '/uploads/Movie_Creative_Black_and_Grey_You_Tube_Cover_9ea954b814.png',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        createdAt: '2023-04-08T09:30:53.710Z',
        updatedAt: '2023-04-08T09:30:53.710Z',
      },
      tags: [
        {
          id: 1,
          slug: 'tag',
          name_en: 'Script Writing Course',
          name_nl: 'Cursus Scriptschrijven',
          name_tr: 'Senaryo Yazarlığı Kursu',
          createdAt: '2023-04-08T09:32:16.645Z',
          updatedAt: '2023-04-08T09:32:23.362Z',
          publishedAt: '2023-04-08T09:32:23.354Z',
        },
      ],
      applications: [
        {
          id: 1,
          name: 'Mustafa',
          email: 'cana66331@gmail.com',
          city: 'Herveld',
          country: 'Netherlands',
          phone: '0684487099',
          message: 'Test amaçlı kurs başvurusu',
          hasPaid: true,
          approvalStatus: 'approved',
          createdAt: '2023-04-08T09:37:40.417Z',
          updatedAt: '2023-04-08T09:37:46.240Z',
          publishedAt: '2023-04-08T09:37:46.233Z',
          course: {} as Course,
        },
      ],
      platform: {
        id: 4,
        slug: 'academy',
        name_en: 'Wees Academy',
        name_nl: 'Wees Academie',
        name_tr: 'Wees Akademi',
        description_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting and calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. Supporting them is our too top priority. ',
        description_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, social media-expertise, acteren, regisseren, illustreren, digitaal tekenen, muziek, schilderen en kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hen steunen is ook onze topprioriteit.',
        description_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bunlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır.  Bizim de onları desteklememiz birincil önceliğimizdir. ',
        content_en:
          'We have volunteers who support the activities of our foundation in many areas. These are areas such as management, social media expertise, acting, directing, illustration, digital drawing, music, painting, calligraphy. Announcing human rights violations to the public is possible with the support we receive from our volunteers. The better they are in the areas they support, the more successful we will be in raising awareness and publicizing the violations. Violations will decrease or come to an end with the public announcement of violations. On this occasion, it is our top priority to support our volunteers in their self-development. On the Courses, Seminars and Software page, you can see which areas we are working on.',
        content_nl:
          'We hebben vrijwilligers die de activiteiten van onze stichting op veel gebieden ondersteunen. Dit zijn gebieden als management, sociale media-expertise, acteren, regisseren, illustratie, digitaal tekenen, muziek, schilderen, kalligrafie. Het bekendmaken van mensenrechtenschendingen aan het publiek is mogelijk met de steun die we krijgen van onze vrijwilligers. Hoe beter ze zijn op de gebieden die ze ondersteunen, hoe succesvoller we zullen zijn in het vergroten van het bewustzijn en het bekendmaken van de schendingen. Overtredingen zullen verminderen of eindigen met de openbare bekendmaking van overtredingen. Bij deze gelegenheid is het onze topprioriteit om onze vrijwilligers te ondersteunen in hun zelfontplooiing. Op de pagina Cursussen, seminars en software kunt u zien aan welke gebieden we werken.',
        content_tr:
          'Vakfımızın faaliyetlerine bir çok alanda destek veren gönüllülerimiz bulunmaktadır. Bunlar yöneticilik, sosyal medya uzmanlığı, oyunculuk, yönetmenlik, illustrasyon, dijital çizim, müzik, resim, kaligrafi gibi alanlardır. İnsan hakları ihlallerinin kamuoyunda duyurulması gönüllülerimizden aldığımız bu destekle mümkün olmaktadır. Onlar destek verdikleri bu alanlarda ne kadar iyi olurlarsa ihlallere ilişkin duyarlılığı artırmada, kamuoyuna duyurmada o kadar başarılı oluruz. İhlallerin kamuoyunda duyurulmasıyla ihlaller azalacak veya son bulacaktır. Bu vesileyle gönüllülerimizin kendilerini geliştirmesine destek vermek en büyük önceliğimizdir. Kurslar, Söyleşiler ve Yazılım sayfasında hangi alanlarda çalışmalar yaptığımızı görebilirsiniz. \n',
        link: '',
        createdAt: '2022-12-04T05:30:49.648Z',
        updatedAt: '2023-04-07T08:46:37.597Z',
        publishedAt: '2022-12-04T05:30:51.145Z',
      },
      faqs: [
        {
          id: 1,
          question_en: 'Wat gebeurt er aan het einde van de cursus?',
          question_tr: 'Kursun sonunda ne olacak?',
          question_nl: 'What will happen at the end of the course?',
          answer_en:
            'Our trainees who are successful at the end of the course can continue the scenario workshop course. At the end of the workshop, they will be able to join the scenario team of Lotus et al. In this way, you will be able to exhibit your ideas on the stage of skits, theater, short films by taking part in real projects.',
          answer_tr:
            'Kursun sonunda başarılı olan kursiyerlerimiz senaryo atölye çalışması kursuna devam edebilir. Atölye çalışmasının sonunda Lotus vd Media bünyesinde bulunan senaryo ekibine katılabilecekler. Bu şekilde gerçek projelerde yer alarak fikirlerinizi skeç, tiyatro, kısa film sahnesinde sergileyebilecekiniz. ',
          answer_nl:
            'Onze cursisten die aan het einde van de cursus succesvol zijn, kunnen doorgaan met de cursus scenarioworkshop. Aan het einde van de workshop kunnen ze toetreden tot het scenarioteam van Lotus et al. Op deze manier kunt u uw ideeën tentoonstellen op het podium van sketches, theater, korte films door deel te nemen aan echte projecten.',
        },
      ],
      curriculum: [
        {
          id: 1,
          title_en: 'Introduction to the course',
          title_tr: 'Kursa giriş',
          title_nl: 'Introductie tot de cursus',
          description_en: "Let's get to know each other",
          description_nl: 'Laten we elkaar beter leren kennen',
          description_tr: 'Birbirimizi tanıyalım',
          instructor: 'Ali Can',
          date: '2022-12-04T05:30:49.648Z',
        },
      ],
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 1,
    },
  },
}
