// Facts and contacts of ELIT eCat — only from veon/client.json.
export const PHONE = { href: "tel:+380443894433", text: "+380 44 389-44-33" } as const;
export const EMAIL = { href: "mailto:elit@elit.ua", text: "elit@elit.ua" } as const;
export const FACEBOOK = "https://www.facebook.com/ELITUkraine";
export const SOON = "Розділ у розробці";

export const NAV = [
  { href: "#catalog", label: "Каталог" },
  { href: "#workshop", label: "Для майстерні" },
  { href: "#tools", label: "Сервіси" },
  { href: "#branches", label: "Філії" },
  { href: "#start", label: "Як стати клієнтом" },
] as const;

// B-F009
export const CATEGORIES = [
  "Легкові авто, мікроавтобуси",
  "Вантажні авто (Truck)",
  "Мото товари",
  "Все для майстерні та СТО",
  "Фарбування авто",
  "Товари для туризму",
  "Товари для дозвілля",
  "Вело товари",
  "Канцтовари (офіс)",
  "Одяг",
  "Розпродаж",
] as const;

// company.geography[1]; «Кіровоград» on the source site is the city of Кропивницький.
const CITY_LIST = [
  "Івано-Франківськ", "Біла Церква", "Бровари", "Вінниця", "Кам’янець-Подільський", "Кам’янське", "Київ", "Луцьк",
  "Рівне", "Умань", "Хмельницький", "Хуст", "Чернівці", "Дніпро", "Житомир", "Запоріжжя", "Кременчук", "Кривий Ріг",
  "Львів", "Одеса", "Полтава", "Суми", "Тернопіль", "Ужгород", "Харків", "Черкаси", "Чернігів", "Ізмаїл", "Миколаїв",
  "Кропивницький", "Коломия",
];
export const CITIES = [...CITY_LIST].sort((a, b) => a.localeCompare(b, "uk"));
