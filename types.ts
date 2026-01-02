
export enum Gender {
  MALE = 'Pria',
  FEMALE = 'Wanita'
}

export enum PhotoSize {
  SIZE_2X3 = '2x3 cm',
  SIZE_3X4 = '3x4 cm',
  SIZE_4X6 = '4x6 cm'
}

export enum Expression {
  NEUTRAL = 'Netral',
  SMILE = 'Senyum Tipis',
  SMIZE = 'Smize (Smiling Eyes)',
  PROFESSIONAL = 'Profesional'
}

export enum Lighting {
  NATURAL = 'Natural',
  BRIGHT = 'Cerah',
  SOFT = 'Lembut',
  STUDIO = 'Studio'
}

export enum ClothingType {
  SUIT = 'Jas Formal',
  BLAZER = 'Blazer',
  SHIRT_ONLY = 'Kemeja Saja',
  BATIK = 'Batik',
  BATIK_KORPRI = 'Batik Korpri',
  UNIFORM = 'Seragam PDH',
  SCHOOL_SD = 'Seragam SD (Merah Putih)',
  SCHOOL_SMP = 'Seragam SMP (Biru Putih)',
  SCHOOL_SMA = 'Seragam SMA (Abu Putih)',
  CUSTOM = 'Model Kustom'
}

export enum HeadAccessory {
  NONE = 'Tanpa Atribut',
  KOPIAH_HITAM = 'Kopiah Hitam (Songkok)',
  KOPIAH_HAJI = 'Kopiah Haji (Putih)',
  KOPIAH_KARANJI = 'Kopiah Karanji (Gorontalo)',
  KOPIAH_MAKASAR = 'Kopiah Makasar (Songkok Recca)',
  TOPI_FORMAL = 'Topi Formal/Baret',
  OTHER = 'Lainnya'
}

export enum HairStyleMale {
  ORIGINAL = 'Sesuai Foto Asli',
  UNDERCUT = 'Undercut',
  POMPADOUR = 'Pompadour',
  BUZZ_CUT = 'Buzz Cut',
  SIDE_PART = 'Side Part',
  SLICK_BACK = 'Slick Back',
  CREW_CUT = 'Crew Cut',
  TEXTURED_FRINGE = 'Textured Fringe'
}

export enum HairStyleFemale {
  ORIGINAL = 'Sesuai Foto Asli',
  BOB_CUT = 'Bob Cut',
  PIXIE_CUT = 'Pixie Cut',
  LONG_STRAIGHT = 'Long Straight',
  LONG_WAVY = 'Long Wavy',
  SHOULDER_LENGTH = 'Shoulder Length',
  PONYTAIL = 'Ponytail',
  CURTAIN_BANGS = 'Curtain Bangs'
}

export interface PhotoConfig {
  gender: Gender;
  size: PhotoSize;
  hasHijab: boolean;
  hijabColor: string;
  backgroundColor: string;
  clothingType: ClothingType;
  customClothingPrompt: string;
  negativePrompt: string;
  suitColor: string;
  tieColor: string;
  shirtColor: string;
  lighting: Lighting;
  expression: Expression;
  clothingReferenceImage?: string;
  batikPatternImage?: string;
  showNameTag: boolean;
  nameTagName: string;
  showPin: boolean;
  pinReferenceImage?: string;
  faceAccuracy: number;
  zoomOut: number;
  headAccessory: HeadAccessory;
  headAccessoryReferenceImage?: string;
  hasGlasses: boolean;
  hairStyle: string;
}
