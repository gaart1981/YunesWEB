export type BrandLocale = "en" | "fr" | "ar";

type Replacement = readonly [RegExp, string];

const replacements: Record<BrandLocale, Replacement[]> = {
  en: [
    [/Yunes Salimi Engineering Experience/g, "Selected Engineering Experience"],
    [/About Yunes Salimi/g, "About Salimi Engineering"],
    [/About Yunes/g, "About Salimi Engineering"],
    [/Contact Yunes Salimi/g, "Contact Salimi Engineering"],
    [/Contact Yunes directly/g, "Contact Salimi Engineering"],
    [/Speak with Yunes Salimi/g, "Speak with Salimi Engineering"],
    [/Speak with Yunes/g, "Speak with Salimi Engineering"],
    [/Call Yunes/g, "Call Salimi Engineering"],
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
    [/what Yunes should verify locally, how often he should attend/g, "what Salimi Engineering should verify locally and the required visit frequency"],
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
    [/À propos de Yunes Salimi/g, "À propos de Salimi Engineering"],
    [/À propos de Yunes/g, "À propos de Salimi Engineering"],
    [/Contacter Yunes Salimi/g, "Contacter Salimi Engineering"],
    [/Contacter Yunes/g, "Contacter Salimi Engineering"],
    [/Parler à Yunes Salimi/g, "Parler à Salimi Engineering"],
    [/Parler à Yunes/g, "Parler à Salimi Engineering"],
    [/Appeler Yunes/g, "Nous appeler"],
    [/WhatsApp Yunes/g, "WhatsApp Salimi Engineering"],
    [/Comment Yunes travaille/g, "Notre méthode"],
    [/Ce que Yunes peut prendre en charge/g, "Ce que nous pouvons prendre en charge"],
    [/Expliquez à Yunes/g, "Expliquez-nous"],
    [/Voir comment il peut intervenir/g, "Voir comment nous pouvons intervenir"],
    [/Pourquoi les clients travaillent directement avec Yunes/g, "Pourquoi les clients travaillent directement avec Salimi Engineering"],
    [/Le client échange avec Yunes, et non avec un intermédiaire commercial\./g, "Le client échange directement avec l’ingénieur référent, et non avec un intermédiaire commercial."],
    [/ce que Yunes doit vérifier localement et à quelle fréquence il doit être présent/g, "ce que Salimi Engineering doit vérifier localement et la fréquence de présence nécessaire"],
    [/Son expérience internationale antérieure/g, "L’expérience internationale antérieure du fondateur"],
    [/Yunes Salimi/g, "Salimi Engineering"],
    [/Younes Salimi/g, "Salimi Engineering"],
    [/Younes/g, "Salimi Engineering"],
    [/Yunes/g, "Salimi Engineering"]
  ],
  ar: [
    [/اتصل بيونس/g, "اتصل بـ Salimi Engineering"],
    [/راسل يونس عبر واتساب/g, "راسل Salimi Engineering عبر واتساب"],
    [/عن يونس السالمي/g, "عن Salimi Engineering"],
    [/عن يونس/g, "عن Salimi Engineering"],
    [/تواصل مع يونس السالمي/g, "تواصل مع Salimi Engineering"],
    [/تواصل مع يونس/g, "تواصل مع Salimi Engineering"],
    [/ما الذي يمكن ليونس أن يتولاه/g, "ما الذي يمكن لـ Salimi Engineering توليه"],
    [/يمكن إشراك يونس/g, "يمكن إشراك Salimi Engineering"],
    [/اشرح ليونس/g, "اشرح لنا"],
    [/كيف يعمل يونس/g, "طريقة عملنا"],
    [/لماذا يعمل العملاء مباشرة مع يونس/g, "لماذا يعمل العملاء مباشرة مع Salimi Engineering"],
    [/يتواصل العميل مع يونس وليس مع وسيط مبيعات\./g, "يتواصل العميل مباشرة مع المهندس المسؤول وليس مع وسيط مبيعات."],
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

function replaceString(value: string, locale: BrandLocale): string {
  return replacements[locale].reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value
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
  en: "I am Salimi Yunes, founder and lead engineer of Salimi Engineering. I created the practice to give clients direct access to senior engineering judgement—from design and coordination to site supervision, commissioning and handover.",
  fr: "Je suis Salimi Yunes, fondateur et ingénieur référent de Salimi Engineering. J’ai créé cette structure pour donner aux clients un accès direct à une expertise senior, des études et de la coordination jusqu’au suivi des travaux, à la mise en service et à la réception.",
  ar: "أنا Salimi Yunes، مؤسس Salimi Engineering والمهندس المسؤول فيها. أنشأت هذه الممارسة لمنح العملاء وصولاً مباشراً إلى خبرة هندسية رفيعة، من التصميم والتنسيق إلى الإشراف على التنفيذ والتشغيل والتسليم."
};

export const founderMessageTitles: Record<BrandLocale, string> = {
  en: "A message from the founder",
  fr: "Un message du fondateur",
  ar: "رسالة من المؤسس"
};
