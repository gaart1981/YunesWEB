import businessFacts from "@/content/business-facts.json";

export type BrandLocale = "en" | "fr" | "ar" | "ru";

type Replacement = readonly [RegExp, string];

const replacements: Record<BrandLocale, Replacement[]> = {
  en: [
    [/Independent engineer/g, "Founder-led engineering bureau"],
    [/Yunes Salimi Engineering Experience/g, "Selected Engineering Experience"],
    [/About Yunes Salimi/g, "About Salimi Engineering"],
    [/About Yunes/g, "About Salimi Engineering"],
    [/Contact Yunes Salimi/g, "Contact Salimi Engineering"],
    [/Contact Yunes directly/g, "Contact Salimi Engineering"],
    [/Speak with Yunes Salimi/g, "Speak with Salimi Engineering"],
    [/Speak with Yunes/g, "Speak with Salimi Engineering"],
    [/Call Yunes/g, "Speak with our engineering team"],
    [/WhatsApp Yunes/g, "WhatsApp Salimi Engineering"],
    [/How Yunes works/g, "How we work"],
    [/Tell Yunes/g, "Tell us"],
    [/Bring Yunes/g, "Bring us"],
    [/What Yunes can take off your desk/g, "What we can take off your desk"],
    [/Six ways Yunes can strengthen your project/g, "Six ways Salimi Engineering can strengthen your project"],
    [/What Yunes controls for the owner/g, "What we control for the owner"],
    [/Where Yunes’s combined design and site experience creates value/g, "Where our combined design and site experience creates value"],
    [/Typical problems Yunes is called to resolve/g, "Typical problems Salimi Engineering is called to resolve"],
    [/Why clients work directly with Yunes/g, "Why clients work directly with Salimi Engineering"],
    [/The client speaks with Yunes, not a sales intermediary\./g, "The client speaks directly with the lead engineer, not a sales intermediary."],
    [/Yunes works on the owner’s side: he checks/g, "Salimi Engineering works on the owner’s side: we check"],
    [/A short call can define what Yunes should verify locally, how often he should attend and what your team needs reported\./g, "A short call can define what Salimi Engineering should verify locally, the required visit frequency and the reporting your team needs."],
    [/what Yunes should verify locally, how often he should attend/g, "what Salimi Engineering should verify locally and the required visit frequency"],
    [/He can read, calculate and develop/g, "Our lead engineer can read, calculate and develop"],
    [/He checks buildability/g, "Our engineering team checks buildability"],
    [/He translates technical issues/g, "We translate technical issues"],
    [/while Yunes remains the technical interface/g, "while Salimi Engineering remains the technical interface"],
    [/whether Yunes is the right person/g, "whether Salimi Engineering is the right technical partner"],
    [/Publication director and professional contact: Yunes Salimi, Morocco\./g, "Professional contact: Salimi Engineering, Morocco."],
    [/His prior international work/g, "The founder’s prior international work"],
    [/His prior international assignments/g, "The founder’s prior international assignments"],
    [/Yunes Salimi’s/g, "Salimi Engineering’s"],
    [/Yunes Salimi's/g, "Salimi Engineering’s"],
    [/Yunes’s/g, "Salimi Engineering’s"],
    [/Yunes's/g, "Salimi Engineering’s"],
    [/Younes Salimi/g, "Salimi Engineering"],
    [/Yunes Salimi/g, "Salimi Engineering"],
    [/Younes/g, "Salimi Engineering"],
    [/Yunes/g, "Salimi Engineering"]
  ],
  fr: [
    [/Ingénieur indépendant/g, "Bureau d’ingénierie à taille humaine"],
    [/À propos de Yunes Salimi/g, "À propos de Salimi Engineering"],
    [/À propos de Yunes/g, "À propos de Salimi Engineering"],
    [/Contacter Yunes Salimi/g, "Contacter Salimi Engineering"],
    [/Contacter Yunes/g, "Contacter Salimi Engineering"],
    [/Parler à Yunes Salimi/g, "Parler à Salimi Engineering"],
    [/Parler à Yunes/g, "Parler à Salimi Engineering"],
    [/Appeler Yunes/g, "Nous appeler"],
    [/WhatsApp Yunes/g, "WhatsApp Salimi Engineering"],
    [/Comment Yunes travaille/g, "Notre méthode"],
    [/Confiez à Yunes le problème technique/g, "Confiez-nous le problème technique"],
    [/Ce que Yunes peut prendre en charge/g, "Ce que nous pouvons prendre en charge"],
    [/Ce que Yunes contrôle pour le maître d’ouvrage/g, "Ce que nous contrôlons pour le maître d’ouvrage"],
    [/Expliquez à Yunes/g, "Expliquez-nous"],
    [/Voir comment il peut intervenir/g, "Voir comment nous pouvons intervenir"],
    [/Pourquoi les clients travaillent directement avec Yunes/g, "Pourquoi les clients travaillent directement avec Salimi Engineering"],
    [/Le client échange avec Yunes, et non avec un intermédiaire commercial\./g, "Le client échange directement avec l’ingénieur référent, et non avec un intermédiaire commercial."],
    [/Le client échange avec Yunes, pas avec un intermédiaire commercial\./g, "Le client échange directement avec l’ingénieur référent, pas avec un intermédiaire commercial."],
    [/Un échange court permet de définir ce que Yunes doit vérifier, la fréquence des visites et le reporting attendu\./g, "Un échange court permet de définir ce que Salimi Engineering doit vérifier, la fréquence des visites et le reporting attendu."],
    [/ce que Yunes doit vérifier localement et à quelle fréquence il doit être présent/g, "ce que Salimi Engineering doit vérifier localement et la fréquence de présence nécessaire"],
    [/Il peut lire, calculer et développer/g, "Notre ingénieur référent peut lire, calculer et développer"],
    [/Il vérifie constructibilité/g, "Notre équipe vérifie la constructibilité"],
    [/Il traduit les sujets techniques/g, "Nous traduisons les sujets techniques"],
    [/sous l’interface technique de Yunes/g, "sous l’interface technique de Salimi Engineering"],
    [/si Yunes correspond au besoin/g, "si Salimi Engineering correspond au besoin"],
    [/Directeur de publication et contact professionnel : Yunes Salimi, Maroc\./g, "Contact professionnel : Salimi Engineering, Maroc."],
    [/Son expérience internationale antérieure/g, "L’expérience internationale antérieure du fondateur"],
    [/Yunes Salimi/g, "Salimi Engineering"],
    [/Younes Salimi/g, "Salimi Engineering"],
    [/Younes/g, "Salimi Engineering"],
    [/Yunes/g, "Salimi Engineering"]
  ],
  ru: [
    [/Независимый инженер/g, "Инженерное бюро"],
    [/независимый инженер/g, "инженерное бюро"]
  ],
  ar: [
    [/مهندس مستقل/g, "مكتب هندسي متخصص"],
    [/اعرض المشكلة التقنية على يونس/g, "اعرض المشكلة التقنية على Salimi Engineering"],
    [/يمكن ليونس الانضمام/g, "يمكن لـ Salimi Engineering التدخل"],
    [/اتصل بيونس السالمي/g, "اتصل بـ Salimi Engineering"],
    [/اتصل بيونس/g, "اتصل بـ Salimi Engineering"],
    [/راسل يونس عبر واتساب/g, "راسل Salimi Engineering عبر واتساب"],
    [/عن يونس السالمي/g, "عن Salimi Engineering"],
    [/عن يونس/g, "عن Salimi Engineering"],
    [/تواصل مع يونس السالمي/g, "تواصل مع Salimi Engineering"],
    [/تواصل مع يونس/g, "تواصل مع Salimi Engineering"],
    [/تحدث مع يونس السالمي/g, "تحدث مع Salimi Engineering"],
    [/تحدث مع يونس/g, "تحدث مع Salimi Engineering"],
    [/ما الذي يمكن ليونس أن يتولاه/g, "ما الذي يمكن لـ Salimi Engineering توليه"],
    [/ما الذي يراقبه يونس لصالح المالك/g, "ما الذي نراقبه لصالح المالك"],
    [/يمكن إشراك يونس/g, "يمكن إشراك Salimi Engineering"],
    [/يمكن ليونس البدء/g, "يمكن لـ Salimi Engineering البدء"],
    [/يمكن ليونس مناقشة/g, "يمكن لـ Salimi Engineering مناقشة"],
    [/اشرح ليونس/g, "اشرح لنا"],
    [/كيف يعمل يونس/g, "طريقة عملنا"],
    [/يعمل يونس من جانب المالك/g, "تعمل Salimi Engineering من جانب المالك"],
    [/يطور يونس/g, "تطور Salimi Engineering"],
    [/يوفر يونس/g, "توفر Salimi Engineering"],
    [/يطبق يونس/g, "تطبق Salimi Engineering"],
    [/سيحدد يونس/g, "ستحدد Salimi Engineering"],
    [/سيطلب يونس/g, "ستطلب Salimi Engineering"],
    [/يجمع يونس بين/g, "تجمع Salimi Engineering بين"],
    [/لماذا يعمل العملاء مباشرة مع يونس/g, "لماذا يعمل العملاء مباشرة مع Salimi Engineering"],
    [/لماذا يتعامل العملاء مباشرة مع يونس/g, "لماذا يتعامل العملاء مباشرة مع Salimi Engineering"],
    [/يتواصل العميل مع يونس وليس مع وسيط مبيعات\./g, "يتواصل العميل مباشرة مع المهندس المسؤول وليس مع وسيط مبيعات."],
    [/يتحدث العميل مع يونس، لا مع وسيط مبيعات\./g, "يتحدث العميل مباشرة مع المهندس المسؤول، لا مع وسيط مبيعات."],
    [/يمكنه قراءة الحل وحسابه وتطويره/g, "يستطيع مهندسنا المسؤول قراءة الحل وحسابه وتطويره"],
    [/يتحقق من قابلية البناء/g, "يتحقق فريقنا من قابلية البناء"],
    [/يحول المسائل التقنية/g, "نحوّل المسائل التقنية"],
    [/مع بقاء يونس الواجهة التقنية/g, "مع بقاء Salimi Engineering الواجهة التقنية"],
    [/إن كان يونس مناسباً/g, "إن كانت Salimi Engineering الشريك التقني المناسب"],
    [/مشكلات نموذجية يُستدعى يونس لحلها/g, "مشكلات نموذجية تتولى Salimi Engineering حلها"],
    [/خبرة يونس السالمي الهندسية/g, "الخبرة الهندسية المختارة"],
    [/العمل الذي نفذه يونس/g, "العمل الذي نفذه مؤسس Salimi Engineering"],
    [/مدير النشر والاتصال المهني: يونس السالمي، المغرب\./g, "جهة الاتصال المهنية: Salimi Engineering، المغرب."],
    [/ما الذي يجب على يونس التحقق منه محلياً وعدد مرات حضوره/g, "ما الذي يجب على Salimi Engineering التحقق منه محلياً وتواتر الحضور المطلوب"],
    [/خبرته الدولية السابقة/g, "الخبرة الدولية السابقة للمؤسس"],
    [/يونس السالمي/g, "Salimi Engineering"],
    [/بيونس/g, "بـ Salimi Engineering"],
    [/ليونس/g, "لـ Salimi Engineering"],
    [/يونس/g, "Salimi Engineering"],
    [/Younes Salimi/g, "Salimi Engineering"],
    [/Yunes Salimi/g, "Salimi Engineering"],
    [/Younes/g, "Salimi Engineering"],
    [/Yunes/g, "Salimi Engineering"]
  ]
};

function applyConfirmedBusinessFacts(value: string): string {
  return value
    .replace(/info@edsmaroc\.com/g, businessFacts.contact.email)
    .replace(/hello@salimiengineering\.ma/g, businessFacts.contact.email);
}

function replaceString(value: string, locale: BrandLocale): string {
  const confirmed = applyConfirmedBusinessFacts(value);
  return replacements[locale].reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    confirmed
  );
}

export function applyCompanyVoice<T>(value: T, locale: BrandLocale): T {
  if (typeof value === "string") {
    return replaceString(value, locale) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => applyCompanyVoice(item, locale)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        applyCompanyVoice(item, locale)
      ])
    ) as T;
  }

  return value;
}

export const founderMessages: Record<BrandLocale, string> = {
  en: "I am SALIMI Yunes, founder and lead engineer of Salimi Engineering. I lead the technical work and client relationship directly. For each assignment, we scale the delivery team with the engineers and project specialists required by the disciplines, workload and site needs, so the bureau can take on focused tasks as well as medium-sized project scopes.",
  fr: "Je suis SALIMI Yunes, fondateur et ingénieur référent de Salimi Engineering. Je dirige directement le travail technique et la relation client. Pour chaque mission, nous dimensionnons l’équipe avec les ingénieurs et spécialistes nécessaires selon les disciplines, la charge et les besoins du site, afin de prendre en charge aussi bien des tâches ciblées que des projets de taille moyenne.",
  ru: "Меня зовут SALIMI Yunes, я основатель и ведущий инженер Salimi Engineering. Я лично отвечаю за техническую часть и отношения с заказчиком. Под каждую задачу мы усиливаем команду инженерами и специалистами нужного профиля, а при необходимости привлекаем или нанимаем их под проект. Поэтому бюро может брать как точечные задачи, так и проекты среднего объёма.",
  ar: "أنا يونس السالمي، مؤسس Salimi Engineering والمهندس المسؤول فيها. أقود العمل التقني والعلاقة مع العميل مباشرة. ولكل مهمة نُوسّع فريق التنفيذ بالمهندسين والمتخصصين المطلوبين بحسب التخصصات وحجم العمل واحتياجات الموقع، ما يسمح للمكتب بتنفيذ أعمال محددة وكذلك نطاقات مشاريع متوسطة الحجم."
};

export const founderMessageTitles: Record<BrandLocale, string> = {
  en: "A message from the founder",
  fr: "Un message du fondateur",
  ru: "Слово основателя",
  ar: "رسالة من المؤسس"
};
