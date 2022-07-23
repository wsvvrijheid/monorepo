import { Job, StrapiResponse } from '@wsvvrijheid/types'

export const JOB_MOCKS: StrapiResponse<Job[]> = {
  data: [
    {
      id: 1,
      code: 'developer',
      name_en: 'Developer',
      name_nl: 'Ontwikkelaar',
      name_tr: 'Geliştirici',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-10T15:07:15.577Z',
      updatedAt: '2022-03-10T15:07:16.167Z',
      publishedAt: '2022-03-10T15:07:16.165Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 2,
      code: 'translator',
      name_en: 'Translator',
      name_nl: 'Tolk',
      name_tr: 'Çevirmen',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-10T22:29:41.861Z',
      updatedAt: '2022-03-10T22:29:42.733Z',
      publishedAt: '2022-03-10T22:29:42.684Z',
      project: {
        id: 1,
        code: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-03-10T15:08:15.330Z',
        updatedAt: '2022-06-05T11:02:41.076Z',
        publishedAt: '2022-03-10T15:08:16.072Z',
      },
    },
    {
      id: 3,
      code: 'director',
      name_en: 'Director',
      name_nl: 'Directeur',
      name_tr: 'Yönetmen',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-10T22:30:14.622Z',
      updatedAt: '2022-03-10T22:30:16.210Z',
      publishedAt: '2022-03-10T22:30:16.118Z',
      project: {
        id: 2,
        code: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.',
        description_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.',
        description_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.',
        content_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.\n\nYou can follow [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de media is a platform of the wsvvrijheid foundation.',
        content_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.\n\nJe kunt [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de media is een platform van de stichting wsvvrijheid.',
        content_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.\n\nEtkinlikler için [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de media wsvvrijheid vakfının bir platformudur. ',
        link: '',
        createdAt: '2022-03-10T22:24:08.836Z',
        updatedAt: '2022-06-05T11:04:52.955Z',
        publishedAt: '2022-03-10T22:24:09.706Z',
      },
    },
    {
      id: 9,
      code: 'artist',
      name_en: 'Artist',
      name_nl: 'Artiest',
      name_tr: 'Ressam',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:22:22.884Z',
      updatedAt: '2022-03-11T06:22:28.317Z',
      publishedAt: '2022-03-11T06:22:28.313Z',
      project: {
        id: 3,
        code: 'art-stop',
        name_en: 'Art Stop',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          '### Who is Art Stop?\nArt stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.\n\n### What is the purpose of the Art Stop?\nConsidering the founding purposes of the foundation, the universal language of art has a great importance that cannot be ignored. For this reason, art should be valued, people interested in art should be brought together and different opportunities should be offered to those who want to improve their skills in this field. As a result, it is aimed that art will contribute to the reduction or end of human rights violations.\n\n### What can you do?\nBy taking part in one of the projects on our site, you can contribute to the reduction or end of human rights violations, and to publicize human rights violations. In addition, by taking part in these projects, you can share or gain experience in related fields. In addition, as our sponsor, you can support us financially.\n You can visit our **[club](https://wsvvrijheid.nl/club)** page for our posts, and you can share your works with us by applying to the art stop project on the **[volunteers](https://wsvvrijheid.nl/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art stop is a platform of the wsvvrijheid foundation.',
        content_nl:
          '### Wie is Kunsthalte?\nKunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.\n\n### Wat is het doel van de Kunsthalte?\nGezien de oprichtingsdoelen van de stichting, heeft de universele taal van de kunst een groot belang dat niet kan worden genegeerd. Om deze reden moet kunst worden gewaardeerd, mensen die geïnteresseerd zijn in kunst moeten worden samengebracht en verschillende kansen moeten worden geboden aan degenen die hun vaardigheden op dit gebied willen verbeteren. Hierdoor is het de bedoeling dat kunst bijdraagt ​​aan het verminderen of beëindigen van mensenrechtenschendingen.\n\n### Wat kan je doen?\nDoor deel te nemen aan een van de projecten op onze site, kunt u bijdragen aan het verminderen of beëindigen van mensenrechtenschendingen en het bekendmaken van mensenrechtenschendingen. Door deel te nemen aan deze projecten kunt u bovendien ervaring opdoen of delen op aanverwante gebieden. Daarnaast kunt u ons als sponsor financieel steunen.\n Je kunt onze **[club](https://wsvvrijheid.nl/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopproject op de **[vrijwilligers](https://wsvvrijheid.nl/nl/volunteers)**-pagina.\n \n Je kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van stichting wsvvrijheid.',
        content_tr:
          '### Sanat Durağı Kimdir?\nSanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.\n\n### Sanat Durağının amacı nedir?\nVakfın kuruluş amaçları düşünüldüğünde, sanatın evrensel dili göz ardı edilemeyecek kadar büyük bir öneme sahiptir. Bu nedenle sanata değer verilmeli, sanata ilgi duyan kişiler bir araya getirilmeli ve bu alandaki yeteneklerini geliştirmek isteyenlere değişik fırsatlar sunulmalıdır. Sonuç olarak sanatın insan hakları ihlallerinin azalmasına veya son bulmasına katkı sağlaması amaçlanmaktadır. \n\n### Neler yapabilirsiniz?\nSitemizde yer alan projelerden birinde yer alarak insan hakları ihlallerinin azalmasına veya son bulmasına,  insan hakları ihlallerini duyurmamıza katkıda bulunabilirsiniz. Ayrıca yine bu projelerde yer alarak ilgili alanlarda tecrübe paylaşımi yapabilir veya tecrübe kazanabilirsiniz. Bunun yanında sponsorumuz olarak bize maddi destek olabilirsiniz.\n Paylaşımlarımız için **[club](https://wsvvrijheid.nl/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://wsvvrijheid.nl/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı wsvvrijheid vakfının bir platformudur. \n',
        link: 'https://kunsthalte.com/tr',
        createdAt: '2022-03-10T22:24:38.419Z',
        updatedAt: '2022-06-25T07:35:08.605Z',
        publishedAt: '2022-03-10T22:24:38.935Z',
      },
    },
    {
      id: 10,
      code: 'scriptwriter',
      name_en: 'Scriptwriter',
      name_nl: 'Scenarioschrijver',
      name_tr: 'Senarist',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:23:12.944Z',
      updatedAt: '2022-03-11T06:23:14.187Z',
      publishedAt: '2022-03-11T06:23:14.184Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 5,
      code: 'account-manager',
      name_en: 'Account Manager',
      name_nl: 'Accountmanager',
      name_tr: 'Hesap Yöneticisi',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:03:16.537Z',
      updatedAt: '2022-03-11T06:23:20.839Z',
      publishedAt: '2022-03-11T06:03:18.052Z',
      project: {
        id: 1,
        code: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-03-10T15:08:15.330Z',
        updatedAt: '2022-06-05T11:02:41.076Z',
        publishedAt: '2022-03-10T15:08:16.072Z',
      },
    },
    {
      id: 7,
      code: 'blogger',
      name_en: 'Blogger',
      name_nl: 'Blogger',
      name_tr: 'Blogger',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:04:31.358Z',
      updatedAt: '2022-03-11T06:23:27.417Z',
      publishedAt: '2022-03-11T06:04:32.059Z',
      project: {
        id: 1,
        code: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-03-10T15:08:15.330Z',
        updatedAt: '2022-06-05T11:02:41.076Z',
        publishedAt: '2022-03-10T15:08:16.072Z',
      },
    },
    {
      id: 4,
      code: 'content-manager',
      name_en: 'Content Manager',
      name_nl: 'Inhoudsbeheerder',
      name_tr: 'İçerik Yöneticisi',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:02:39.471Z',
      updatedAt: '2022-03-11T06:23:31.770Z',
      publishedAt: '2022-03-11T06:02:41.077Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 6,
      code: 'social-media-expert',
      name_en: 'Social Media Expert',
      name_nl: 'Sociale Media-expert',
      name_tr: 'Sosyal Medya Uzmanı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:04:09.760Z',
      updatedAt: '2022-03-11T06:23:40.017Z',
      publishedAt: '2022-03-11T06:04:10.887Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 8,
      code: 'video-editor',
      name_en: 'Video Editor',
      name_nl: 'Videobewerker',
      name_tr: 'Video Düzenleyicisi',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:06:09.608Z',
      updatedAt: '2022-03-11T06:23:46.916Z',
      publishedAt: '2022-03-11T06:06:10.781Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 11,
      code: 'cameraman',
      name_en: 'Cameraman',
      name_nl: 'Cameraman',
      name_tr: 'Kameraman',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:26:15.809Z',
      updatedAt: '2022-03-11T06:26:17.407Z',
      publishedAt: '2022-03-11T06:26:17.320Z',
      project: {
        id: 2,
        code: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.',
        description_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.',
        description_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.',
        content_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.\n\nYou can follow [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de media is a platform of the wsvvrijheid foundation.',
        content_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.\n\nJe kunt [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de media is een platform van de stichting wsvvrijheid.',
        content_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.\n\nEtkinlikler için [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de media wsvvrijheid vakfının bir platformudur. ',
        link: '',
        createdAt: '2022-03-10T22:24:08.836Z',
        updatedAt: '2022-06-05T11:04:52.955Z',
        publishedAt: '2022-03-10T22:24:09.706Z',
      },
    },
    {
      id: 12,
      code: 'ui-designer',
      name_en: 'UI Designer',
      name_nl: 'UI Ontwerper',
      name_tr: 'Arayüz Tasarımcısı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:29:20.152Z',
      updatedAt: '2022-03-11T06:29:21.437Z',
      publishedAt: '2022-03-11T06:29:21.433Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 13,
      code: 'project-manager',
      name_en: 'Project Manager',
      name_nl: 'Projectbegeleider',
      name_tr: 'Proje Yöneticisi',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:30:26.308Z',
      updatedAt: '2022-03-11T06:30:27.752Z',
      publishedAt: '2022-03-11T06:30:27.748Z',
      project: {
        id: 4,
        code: 'academy',
        name_en: 'WSVVrijheid Academy',
        name_nl: 'WSVVrijheid Academie',
        name_tr: 'WSVVrijheid Akademi',
        description_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js.',
        description_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js.',
        description_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. ',
        content_en:
          'In order to meet the personnel needs of our foundation, we provide training in certain areas and then we work together voluntarily within our foundation.\nBesides, we develop software projects. With this project, it is aimed to meet the software needs of the foundation, to provide internship opportunities for those who contribute to the software and to provide references in job applications.\nWe develop our software mostly with technologies such as javascript, react and next.js. You can find detailed information on the invitation page below.\nIf you want to take part in these trainings or projects, you can contact us on our volunteer page or contact page.\n\n--------\nOur invitation letter to our software team\n\nWEES DE STEM VOOR VRIJHEID FOUNDATION SOFTWARE TEAM\n\nHello dear friends!\n\nOur foundation, whose aim is to work for everyone to reach universal human rights equally, has several ongoing web projects where you can find the details.\n\nWe are looking for friends who can contribute to our projects voluntarily, who have experience in one or more of the following fields, or who want to improve themselves.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nInterested friends can contact us at info@wsvvrijheid.nl or via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTS\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) application that we use in Hashtag works to announce the victims, as well as our site where we publish dynamic content such as announcements, blogs, art works, etc. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Donation(Mollie)\n\nWSVVrijheid FRONTEND\nThe site of our foundation.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nA management panel project where our volunteer members will manage the content on the sites, follow the translations of the content, parse the texts and upload data with image processing at the caps upload stage for hashtag studies, create and edit caps for hashtags with Canva integration, and many other features that can be developed.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----\n\n',
        content_nl:
          'Om in de personele behoefte van onze stichting te voorzien, verzorgen wij trainingen op bepaalde gebieden en werken wij vervolgens vrijwillig samen binnen onze stichting.\nDaarnaast ontwikkelen we softwareprojecten. Met dit project wordt beoogd te voorzien in de softwarebehoefte van de stichting, stagemogelijkheden te bieden aan degenen die een bijdrage leveren aan de software en referenties te geven in sollicitaties.\nWe ontwikkelen onze software meestal met technologieën als javascript, react en next.js. Gedetailleerde informatie vindt u op de uitnodigingspagina hieronder.\nAls u aan deze trainingen of projecten wilt deelnemen, kunt u contact met ons opnemen via onze vrijwilligerspagina of contactpagina.\n\n--------\nOnze uitnodigingsbrief aan ons softwareteam\n\nWEES DE STEM VOOR VRIJHEID STICHTING SOFTWARE TEAM\n\nHallo lieve vrienden!\n\nOnze stichting, wiens doel het is om voor iedereen te werken om universele mensenrechten te bereiken, heeft verschillende lopende webprojecten waar u de details kunt vinden.\n\nWe zijn op zoek naar vrienden die vrijwillig een bijdrage kunnen leveren aan onze projecten, die ervaring hebben op een of meer van de volgende gebieden, of die zichzelf willen verbeteren.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nGeïnteresseerde vrienden kunnen contact met ons opnemen via info@wsvvrijheid.nl of via WhatsApp (+31685221308).\n\nhttps://github.com/wsvvrijheid\n\nPROJECTEN\n\nBACKEND\n- Strapi (Open Source Content Management Systeem)\n\nSAMENNVV FRONTEND\n- PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) applicatie die we gebruiken in Hashtag werkt om de slachtoffers aan te kondigen, evenals onze site waar we dynamische inhoud publiceren, zoals aankondigingen , blogs, kunstwerken, enz. _\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux-toolkit\n- i18 (nl, nl, tr)\n- Donation (Mollie)\n\nWSVVrijheid FRONTEND\nDe site van onze stichting.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (nl, nl, tr)\n- Donatie (Mollie)\n\nBEHEERDERSPANEEL FRONTEND\nEen managementpanelproject waarbij onze vrijwillige leden de inhoud op de sites beheren, de vertalingen van de inhoud volgen, de teksten ontleden en gegevens uploaden met beeldverwerking in de caps-uploadfase voor hashtag-onderzoeken, caps voor hashtags maken en bewerken met Canva-integratie , en vele andere functies die kunnen worden ontwikkeld.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux-toolkit\n- RTK-query\n- Chakra UI\n\nONTWERP\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        content_tr:
          'Vakfımızın personel ihtiyacının karşılanması amacıyla belli alanlarda eğitimler veriyoruz ve sonrasında vakfımız bünyesinde gönüllü olarak birlikte çalışıyoruz. \nBunun yanında, yazılım projeleri geliştiriyoruz. Bu projeyle vakfın yazılım ihtiyacının karşılanması, yazılıma katkı sağlayanlar açısından ise staj yapma imkanı ve iş başvurularında referans sağlanması amaçlanmaktadır. \nYazılımlarımızı çoğunlukla javascript, react ve next.js gibi teknolojilerle geliştiriyoruz. Detaylı bilgiyi aşağıda davet sayfasında bulabilirsiniz. \nEğer bu eğitimlerde veya projelerde yer almak isterseniz gönüllü sayfamızdan veya iletişim sayfamızdan bize ulaşabilirsiniz. \n\n\n--------\nYazılım ekibimize davet yazımız\n\nWEES DE STEM VOOR VRIJHEID VAKFI YAZILIM EKİBİ\n\nMerhaba değerli arkadaşlar!\n\nAmacı evrensel insan haklarına herkesin eşit şekilde ulaşabilmesi için çalışmalar yapmak olan vakfımızın, detaylarını bulabileceğiniz devam eden bir kaç web projesi bulunmaktadır.\n\nProjelerimize gönüllü olarak katkı sağlayabilecek, aşağıdaki alanlardan biri veya birkaçında tecrübesi olan veya kendini geliştirmek isteyen arkadaşlar aramaktayız.\n\n- NodeJS\n- JavaScript/TypeScript\n- React\n- SEO\n- Security\n- Devops\n- UI/UX design\n\nİlgili arkadaşlar info@wsvvrijheid.nl adresinden veya WhatsApp (+31685221308) uzerinden bize ulaşabilirler.\n\nhttps://github.com/wsvvrijheid\n\nPROJELER\n\nBACKEND\n- Strapi (Open Source Content Management System)\n\n\nSAMENVVV FRONTEND\n- Mağduriyetleri duyurma amacıyla Hashtag çalışmalarında kullandığımız başta PostMaker (https://www.samenvvv.nl/en/hashtag-events/women-s-rights) uygulaması ve bunun yanında duyurular, blog, sanat çalışmaları vb dinamik içerikleri yayınladığımız sitemiz._\n\n- Next.js\n- TypeScript\n- Chakra UI\n- React Query\n- React Hook Form\n- Redux Toolkit\n- i18 (en, nl, tr)\n- Jest\n\n\nWSVVrijheid FRONTEND\nResmiyetini tamamladığımız vakfımızın yapım aşamasındaki sitesi.\n\n- Next.js\n- Chakra UI\n- React Hook Form\n- i18n (en, nl, tr)\n- Donation (Mollie)\n\nADMIN PANEL FRONTEND\nGönüllü üyelerimizin sitelerdeki içerikleri yöneteceği, içeriklerin çevirilerini takip edeceği, hashtag çalışmaları için caps upload aşamasında image processing ile yazıları ayrıştırıp verileri yükleyebileceği, Canva entegrasyonu ile hashtag için caps oluşturup düzenleyebileceği ve bunun gibi geliştirilebilecek daha pek çok özelliği barındıran bir yönetim paneli projesi.\n\n- Vite React\n- Typescript\n- Graphql\n- Redux Toolkit\n- RTK Query\n- Chakra UI\n\nDESIGN\n- Figma\n\nhttps://samenvvv.nl\nhttps://twitter.com/samenvvv\nhttps://twitter.com/samenvvvTR\nhttps://www.facebook.com/samenverbinding\nhttps://www.instagram.com/samenvvv\n\nStichting Wees de Stem voor Vrijheid,\n\nKvK 85680621\n\n----',
        link: '',
        createdAt: '2022-03-10T22:25:15.198Z',
        updatedAt: '2022-06-05T11:06:11.059Z',
        publishedAt: '2022-03-10T22:25:16.514Z',
      },
    },
    {
      id: 14,
      code: 'author',
      name_en: 'Author',
      name_nl: 'Auteur',
      name_tr: 'Yazar',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:31:12.162Z',
      updatedAt: '2022-03-11T06:31:12.993Z',
      publishedAt: '2022-03-11T06:31:12.989Z',
      project: {
        id: 1,
        code: 'samenvvv',
        name_en: 'Together for Freedom and Connection',
        name_nl: 'Samen voor Vrijheid en Verbinding',
        name_tr: 'Birlikte Yaşama ve Özgürlük',
        description_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        description_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        description_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        content_en:
          'Today, with the developing technology, social media is one of the most important tools for explaining human rights and announcing human rights violations. For this reason, a social media platform has been established within our foundation for the effective use of social media tools.',
        content_nl:
          'Vandaag de dag, met de zich ontwikkelende technologie, is sociale media een van de belangrijkste instrumenten om mensenrechten uit te leggen en mensenrechtenschendingen aan te kondigen. Om deze reden is er binnen onze stichting een social media platform opgericht voor het effectief inzetten van social media tools.',
        content_tr:
          'Günümüzde gelişen teknolojiyle birlikte sosyal medya insan haklarının anlatılması ve insan hakları ihlallerinin duyurulması için en önemli araçlardandır. Bu nedenle sosyal medya araçlarının etkin bir biçimde kullanılması için, vakfımız bünyesinde sosyal medya platformu kurulmuştur. ',
        link: 'https://samenvvv.nl',
        createdAt: '2022-03-10T15:08:15.330Z',
        updatedAt: '2022-06-05T11:02:41.076Z',
        publishedAt: '2022-03-10T15:08:16.072Z',
      },
    },
    {
      id: 15,
      code: 'illustrator',
      name_en: 'Illustrator',
      name_nl: 'llustrator',
      name_tr: 'İllüstratör',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-11T06:31:57.308Z',
      updatedAt: '2022-03-11T06:31:58.632Z',
      publishedAt: '2022-03-11T06:31:58.628Z',
      project: {
        id: 3,
        code: 'art-stop',
        name_en: 'Art Stop',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          '### Who is Art Stop?\nArt stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.\n\n### What is the purpose of the Art Stop?\nConsidering the founding purposes of the foundation, the universal language of art has a great importance that cannot be ignored. For this reason, art should be valued, people interested in art should be brought together and different opportunities should be offered to those who want to improve their skills in this field. As a result, it is aimed that art will contribute to the reduction or end of human rights violations.\n\n### What can you do?\nBy taking part in one of the projects on our site, you can contribute to the reduction or end of human rights violations, and to publicize human rights violations. In addition, by taking part in these projects, you can share or gain experience in related fields. In addition, as our sponsor, you can support us financially.\n You can visit our **[club](https://wsvvrijheid.nl/club)** page for our posts, and you can share your works with us by applying to the art stop project on the **[volunteers](https://wsvvrijheid.nl/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art stop is a platform of the wsvvrijheid foundation.',
        content_nl:
          '### Wie is Kunsthalte?\nKunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.\n\n### Wat is het doel van de Kunsthalte?\nGezien de oprichtingsdoelen van de stichting, heeft de universele taal van de kunst een groot belang dat niet kan worden genegeerd. Om deze reden moet kunst worden gewaardeerd, mensen die geïnteresseerd zijn in kunst moeten worden samengebracht en verschillende kansen moeten worden geboden aan degenen die hun vaardigheden op dit gebied willen verbeteren. Hierdoor is het de bedoeling dat kunst bijdraagt ​​aan het verminderen of beëindigen van mensenrechtenschendingen.\n\n### Wat kan je doen?\nDoor deel te nemen aan een van de projecten op onze site, kunt u bijdragen aan het verminderen of beëindigen van mensenrechtenschendingen en het bekendmaken van mensenrechtenschendingen. Door deel te nemen aan deze projecten kunt u bovendien ervaring opdoen of delen op aanverwante gebieden. Daarnaast kunt u ons als sponsor financieel steunen.\n Je kunt onze **[club](https://wsvvrijheid.nl/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopproject op de **[vrijwilligers](https://wsvvrijheid.nl/nl/volunteers)**-pagina.\n \n Je kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van stichting wsvvrijheid.',
        content_tr:
          '### Sanat Durağı Kimdir?\nSanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.\n\n### Sanat Durağının amacı nedir?\nVakfın kuruluş amaçları düşünüldüğünde, sanatın evrensel dili göz ardı edilemeyecek kadar büyük bir öneme sahiptir. Bu nedenle sanata değer verilmeli, sanata ilgi duyan kişiler bir araya getirilmeli ve bu alandaki yeteneklerini geliştirmek isteyenlere değişik fırsatlar sunulmalıdır. Sonuç olarak sanatın insan hakları ihlallerinin azalmasına veya son bulmasına katkı sağlaması amaçlanmaktadır. \n\n### Neler yapabilirsiniz?\nSitemizde yer alan projelerden birinde yer alarak insan hakları ihlallerinin azalmasına veya son bulmasına,  insan hakları ihlallerini duyurmamıza katkıda bulunabilirsiniz. Ayrıca yine bu projelerde yer alarak ilgili alanlarda tecrübe paylaşımi yapabilir veya tecrübe kazanabilirsiniz. Bunun yanında sponsorumuz olarak bize maddi destek olabilirsiniz.\n Paylaşımlarımız için **[club](https://wsvvrijheid.nl/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://wsvvrijheid.nl/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı wsvvrijheid vakfının bir platformudur. \n',
        link: 'https://kunsthalte.com/tr',
        createdAt: '2022-03-10T22:24:38.419Z',
        updatedAt: '2022-06-25T07:35:08.605Z',
        publishedAt: '2022-03-10T22:24:38.935Z',
      },
    },
    {
      id: 16,
      code: 'photograph',
      name_en: 'Photograph',
      name_nl: 'Fotograaf',
      name_tr: 'Fotoğraf',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-25T14:51:14.435Z',
      updatedAt: '2022-03-25T15:09:01.652Z',
      publishedAt: '2022-03-25T14:55:02.742Z',
      project: {
        id: 3,
        code: 'art-stop',
        name_en: 'Art Stop',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          '### Who is Art Stop?\nArt stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.\n\n### What is the purpose of the Art Stop?\nConsidering the founding purposes of the foundation, the universal language of art has a great importance that cannot be ignored. For this reason, art should be valued, people interested in art should be brought together and different opportunities should be offered to those who want to improve their skills in this field. As a result, it is aimed that art will contribute to the reduction or end of human rights violations.\n\n### What can you do?\nBy taking part in one of the projects on our site, you can contribute to the reduction or end of human rights violations, and to publicize human rights violations. In addition, by taking part in these projects, you can share or gain experience in related fields. In addition, as our sponsor, you can support us financially.\n You can visit our **[club](https://wsvvrijheid.nl/club)** page for our posts, and you can share your works with us by applying to the art stop project on the **[volunteers](https://wsvvrijheid.nl/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art stop is a platform of the wsvvrijheid foundation.',
        content_nl:
          '### Wie is Kunsthalte?\nKunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.\n\n### Wat is het doel van de Kunsthalte?\nGezien de oprichtingsdoelen van de stichting, heeft de universele taal van de kunst een groot belang dat niet kan worden genegeerd. Om deze reden moet kunst worden gewaardeerd, mensen die geïnteresseerd zijn in kunst moeten worden samengebracht en verschillende kansen moeten worden geboden aan degenen die hun vaardigheden op dit gebied willen verbeteren. Hierdoor is het de bedoeling dat kunst bijdraagt ​​aan het verminderen of beëindigen van mensenrechtenschendingen.\n\n### Wat kan je doen?\nDoor deel te nemen aan een van de projecten op onze site, kunt u bijdragen aan het verminderen of beëindigen van mensenrechtenschendingen en het bekendmaken van mensenrechtenschendingen. Door deel te nemen aan deze projecten kunt u bovendien ervaring opdoen of delen op aanverwante gebieden. Daarnaast kunt u ons als sponsor financieel steunen.\n Je kunt onze **[club](https://wsvvrijheid.nl/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopproject op de **[vrijwilligers](https://wsvvrijheid.nl/nl/volunteers)**-pagina.\n \n Je kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van stichting wsvvrijheid.',
        content_tr:
          '### Sanat Durağı Kimdir?\nSanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.\n\n### Sanat Durağının amacı nedir?\nVakfın kuruluş amaçları düşünüldüğünde, sanatın evrensel dili göz ardı edilemeyecek kadar büyük bir öneme sahiptir. Bu nedenle sanata değer verilmeli, sanata ilgi duyan kişiler bir araya getirilmeli ve bu alandaki yeteneklerini geliştirmek isteyenlere değişik fırsatlar sunulmalıdır. Sonuç olarak sanatın insan hakları ihlallerinin azalmasına veya son bulmasına katkı sağlaması amaçlanmaktadır. \n\n### Neler yapabilirsiniz?\nSitemizde yer alan projelerden birinde yer alarak insan hakları ihlallerinin azalmasına veya son bulmasına,  insan hakları ihlallerini duyurmamıza katkıda bulunabilirsiniz. Ayrıca yine bu projelerde yer alarak ilgili alanlarda tecrübe paylaşımi yapabilir veya tecrübe kazanabilirsiniz. Bunun yanında sponsorumuz olarak bize maddi destek olabilirsiniz.\n Paylaşımlarımız için **[club](https://wsvvrijheid.nl/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://wsvvrijheid.nl/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı wsvvrijheid vakfının bir platformudur. \n',
        link: 'https://kunsthalte.com/tr',
        createdAt: '2022-03-10T22:24:38.419Z',
        updatedAt: '2022-06-25T07:35:08.605Z',
        publishedAt: '2022-03-10T22:24:38.935Z',
      },
    },
    {
      id: 17,
      code: 'calligraphy',
      name_en: 'Calligraphy',
      name_nl: 'Kalligrafie',
      name_tr: 'Kaligrafi',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-25T15:13:15.732Z',
      updatedAt: '2022-03-25T15:13:17.516Z',
      publishedAt: '2022-03-25T15:13:17.512Z',
      project: {
        id: 3,
        code: 'art-stop',
        name_en: 'Art Stop',
        name_nl: 'Kunsthalte',
        name_tr: 'Sanat Durağı',
        description_en:
          'Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.',
        description_nl:
          'Het is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.',
        description_tr:
          'Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.',
        content_en:
          '### Who is Art Stop?\nArt stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.\n\n### What is the purpose of the Art Stop?\nConsidering the founding purposes of the foundation, the universal language of art has a great importance that cannot be ignored. For this reason, art should be valued, people interested in art should be brought together and different opportunities should be offered to those who want to improve their skills in this field. As a result, it is aimed that art will contribute to the reduction or end of human rights violations.\n\n### What can you do?\nBy taking part in one of the projects on our site, you can contribute to the reduction or end of human rights violations, and to publicize human rights violations. In addition, by taking part in these projects, you can share or gain experience in related fields. In addition, as our sponsor, you can support us financially.\n You can visit our **[club](https://wsvvrijheid.nl/club)** page for our posts, and you can share your works with us by applying to the art stop project on the **[volunteers](https://wsvvrijheid.nl/volunteers)** page.\n \n You can follow [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) and [website](https://kunsthalte.com) for events.\n \n Art stop is a platform of the wsvvrijheid foundation.',
        content_nl:
          '### Wie is Kunsthalte?\nKunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.\n\n### Wat is het doel van de Kunsthalte?\nGezien de oprichtingsdoelen van de stichting, heeft de universele taal van de kunst een groot belang dat niet kan worden genegeerd. Om deze reden moet kunst worden gewaardeerd, mensen die geïnteresseerd zijn in kunst moeten worden samengebracht en verschillende kansen moeten worden geboden aan degenen die hun vaardigheden op dit gebied willen verbeteren. Hierdoor is het de bedoeling dat kunst bijdraagt ​​aan het verminderen of beëindigen van mensenrechtenschendingen.\n\n### Wat kan je doen?\nDoor deel te nemen aan een van de projecten op onze site, kunt u bijdragen aan het verminderen of beëindigen van mensenrechtenschendingen en het bekendmaken van mensenrechtenschendingen. Door deel te nemen aan deze projecten kunt u bovendien ervaring opdoen of delen op aanverwante gebieden. Daarnaast kunt u ons als sponsor financieel steunen.\n Je kunt onze **[club](https://wsvvrijheid.nl/nl/club)**-pagina bezoeken voor onze berichten, en je kunt je werken met ons delen door je aan te melden voor het kunststopproject op de **[vrijwilligers](https://wsvvrijheid.nl/nl/volunteers)**-pagina.\n \n Je kunt [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) en [website](https://kunsthalte.com) volgen voor evenementen.\n \nKunsthalte is een platform van stichting wsvvrijheid.',
        content_tr:
          '### Sanat Durağı Kimdir?\nSanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.\n\n### Sanat Durağının amacı nedir?\nVakfın kuruluş amaçları düşünüldüğünde, sanatın evrensel dili göz ardı edilemeyecek kadar büyük bir öneme sahiptir. Bu nedenle sanata değer verilmeli, sanata ilgi duyan kişiler bir araya getirilmeli ve bu alandaki yeteneklerini geliştirmek isteyenlere değişik fırsatlar sunulmalıdır. Sonuç olarak sanatın insan hakları ihlallerinin azalmasına veya son bulmasına katkı sağlaması amaçlanmaktadır. \n\n### Neler yapabilirsiniz?\nSitemizde yer alan projelerden birinde yer alarak insan hakları ihlallerinin azalmasına veya son bulmasına,  insan hakları ihlallerini duyurmamıza katkıda bulunabilirsiniz. Ayrıca yine bu projelerde yer alarak ilgili alanlarda tecrübe paylaşımi yapabilir veya tecrübe kazanabilirsiniz. Bunun yanında sponsorumuz olarak bize maddi destek olabilirsiniz.\n Paylaşımlarımız için **[club](https://wsvvrijheid.nl/tr/club)** sayfamızı ziyaret edebilir **[gönüllüler](https://wsvvrijheid.nl/tr/volunteers)** sayfasından sanat durağı platformuna başvuru yaparak siz de eserlerinizi bizimle paylaşabilirsiniz.\n \n Etkinlikler için [Instagram](https://www.instagram.com/sanatduragi.nl/?hl=en) hesabını ve [web sitesini ](https://kunsthalte.com) takip edebilirsiniz.\n \n Sanat Durağı wsvvrijheid vakfının bir platformudur. \n',
        link: 'https://kunsthalte.com/tr',
        createdAt: '2022-03-10T22:24:38.419Z',
        updatedAt: '2022-06-25T07:35:08.605Z',
        publishedAt: '2022-03-10T22:24:38.935Z',
      },
    },
    {
      id: 18,
      code: 'actor',
      name_en: 'Actor',
      name_nl: 'acteur',
      name_tr: 'Oyuncu',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-06-22T12:08:25.566Z',
      updatedAt: '2022-06-22T12:08:27.066Z',
      publishedAt: '2022-06-22T12:08:27.061Z',
      project: {
        id: 2,
        code: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.',
        description_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.',
        description_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.',
        content_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.\n\nYou can follow [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de media is a platform of the wsvvrijheid foundation.',
        content_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.\n\nJe kunt [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de media is een platform van de stichting wsvvrijheid.',
        content_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.\n\nEtkinlikler için [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de media wsvvrijheid vakfının bir platformudur. ',
        link: '',
        createdAt: '2022-03-10T22:24:08.836Z',
        updatedAt: '2022-06-05T11:04:52.955Z',
        publishedAt: '2022-03-10T22:24:09.706Z',
      },
    },
    {
      id: 19,
      code: 'scriptwriter-1',
      name_en: 'scriptwriter',
      name_nl: 'scenarioschrijver',
      name_tr: 'senarist',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-06-22T12:08:55.361Z',
      updatedAt: '2022-06-22T12:09:11.602Z',
      publishedAt: '2022-06-22T12:09:11.598Z',
      project: {
        id: 2,
        code: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.',
        description_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.',
        description_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.',
        content_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.\n\nYou can follow [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de media is a platform of the wsvvrijheid foundation.',
        content_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.\n\nJe kunt [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de media is een platform van de stichting wsvvrijheid.',
        content_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.\n\nEtkinlikler için [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de media wsvvrijheid vakfının bir platformudur. ',
        link: '',
        createdAt: '2022-03-10T22:24:08.836Z',
        updatedAt: '2022-06-05T11:04:52.955Z',
        publishedAt: '2022-03-10T22:24:09.706Z',
      },
    },
    {
      id: 20,
      code: 'lightman',
      name_en: 'lightman',
      name_nl: 'licht man',
      name_tr: 'ışıkçı',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-06-22T12:10:02.551Z',
      updatedAt: '2022-06-22T12:10:04.727Z',
      publishedAt: '2022-06-22T12:10:04.723Z',
      project: {
        id: 2,
        code: 'lotus',
        name_en: 'Lotus van de Media',
        name_nl: 'Lotus van de Media',
        name_tr: 'Lotus van de Media',
        description_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.',
        description_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.',
        description_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.',
        content_en:
          'With this platform, in order to explain universal human rights through media and communication; It is aimed to gain experience in fields such as acting, directing, screenwriting, to develop experiences and to provide references in the mentioned fields with internships. It is planned to develop projects such as short films and theatre.\n\nYou can follow [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) and [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) for events.\n\nLotus van de media is a platform of the wsvvrijheid foundation.',
        content_nl:
          'Met dit platform, om universele mensenrechten uit te leggen via media en communicatie; Het is bedoeld om ervaring op te doen op gebieden als acteren, regisseren, scenarioschrijven, ervaringen op te doen en referenties op de genoemde gebieden te voorzien van stages. Het is de bedoeling om projecten zoals korte films en theater te ontwikkelen.\n\nJe kunt [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) en [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) volgen voor evenementen.\n\nLotus van de media is een platform van de stichting wsvvrijheid.',
        content_tr:
          'Bu platformla evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk, yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme  ve sayılan alanlarda stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi düşünülmektedir.\n\nEtkinlikler için [Instagram](https://www.instagram.com/infolotusmedia/?hl=en) ve  [Youtube](https://www.youtube.com/channel/UCUcWJZ69qgrM5YQ9iBq_OHg) hesaplarını takip edebilirsiniz. \n\nLotus van de media wsvvrijheid vakfının bir platformudur. ',
        link: '',
        createdAt: '2022-03-10T22:24:08.836Z',
        updatedAt: '2022-06-05T11:04:52.955Z',
        publishedAt: '2022-03-10T22:24:09.706Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 20 } },
}
