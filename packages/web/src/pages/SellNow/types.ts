import { z } from 'zod';

export const sellNowStageOne = z.object({
  year: z.string().min(1, { message: 'Please choose a year' }),
  brand: z.string().min(1, { message: 'Please choose a brand' }),
});

export type SellNowStageOneProps = z.infer<typeof sellNowStageOne>;

export enum VehicleBodyType {
  Cabriolet = 'Cabriolet',
  Roadster = 'Roadster',
  Estate = 'Estate',
  Saloon = 'Saloon',
  Small = 'Small',
  Sport = 'Sport',
  Coupe = 'Coupe',
  SUV = 'SUV',
  Off_road = 'Off Road',
  Pickup_truck = 'Pickup Truck',
  Van = 'Van',
  Minibus = 'Minibus',
  Sedan = 'Sedan',
}

export enum GearboxTypes {
  Manual = 'Manual',
  Automatic = 'Automatic',
  SemiAutomatic = 'Semi-Automatic',
}

export enum TransmissionTypes {
  fourByFourAutomatic = '4x4 (Automatic)',
  fourByFourManual = '4x4 (Manual)',
  rear = 'Rear',
  front = 'Front',
}

export enum PolluationNormTypes {
  'Particle Filter' = 'ParticleFilter',
  'Euro 1' = 'Euro_1',
  'Euro 2' = 'Euro_2',
  'Euro 3' = 'Euro_3',
  'Euro 4' = 'Euro_4',
  'Euro 5' = 'Euro_5',
  'Euro 5a' = 'Euro_5a',
  'Euro 6' = 'Euro_6',
  'Euro 6b' = 'Euro_6b',
  'Euro 6c' = 'Euro_6c',
  'Euro 6d' = 'Euro_6d',
  'Euro 6d-Temp' = 'Euro_6d_Temp',
  'Non-euro' = 'Non_euro',
}

export enum CurrencyTypes {
  EUR = 'EUR',
  RON = 'RON',
  USD = 'USD',
}

export enum FuelType {
  Petrol = 'Petrol',
  Electric = 'Electric',
  LPG = 'LPG',
  CNG = 'CNG',
  Hybrid = 'Hybrid',
  Diesel = 'Diesel',
  Hydrogen = 'Hydrogen',
}

export const sellNowStageTwo = z.object({
  model: z.string().min(1, { message: 'Please choose a model' }),
  fuel: z.nativeEnum(FuelType),
});

export enum CarsColorsTypes {
  White = 'White',
  Blue = 'Blue',
  Silver = 'Silver',
  Beige = 'Beige',
  Yellow = 'Yellow',
  Gray = 'Gray',
  Brown = 'Brown',
  Black = 'Black',
  Orange = 'Orange',
  Red = 'Red',
  Green = 'Green',
  Others = 'Others',
}

export enum ColorTypes {
  Matte = 'Matte',
  Metallic = 'Metallic',
  Pearl = 'Pearl',
}

export enum CountriesTypes {
  AFGHANISTAN = 'AFGHANISTAN',
  ALBANIA = 'ALBANIA',
  ALGERIA = 'ALGERIA',
  ANDORRA = 'ANDORRA',
  ANGOLA = 'ANGOLA',
  ANTIGUA_AND_BARBUDA = 'ANTIGUA AND BARBUDA',
  ARGENTINA = 'ARGENTINA',
  ARMENIA = 'ARMENIA',
  AUSTRALIA = 'AUSTRALIA',
  AUSTRIA = 'AUSTRIA',
  AZERBAIJAN = 'AZERBAIJAN',
  BAHAMAS = 'BAHAMAS',
  BAHRAIN = 'BAHRAIN',
  BANGLADESH = 'BANGLADESH',
  BARBADOS = 'BARBADOS',
  BELARUS = 'BELARUS',
  BELGIUM = 'BELGIUM',
  BELIZE = 'BELIZE',
  BENIN = 'BENIN',
  BHUTAN = 'BHUTAN',
  BOLIVIA = 'BOLIVIA',
  BOSNIA_AND_HERZEGOVINA = 'BOSNIA AND HERZEGOVINA',
  BOTSWANA = 'BOTSWANA',
  BRAZIL = 'BRAZIL',
  BRUNEI = 'BRUNEI',
  BULGARIA = 'BULGARIA',
  BURKINA_FASO = 'BURKINA_FASO',
  BURUNDI = 'BURUNDI',
  COTE_DIVOIRE = 'COTE DIVOIRE',
  CABO_VERDE = 'CABO VERDE',
  CAMBODIA = 'CAMBODIA',
  CAMEROON = 'CAMEROON',
  CANADA = 'CANADA',
  CENTRAL_AFRICAN_REPUBLIC = 'CENTRAL AFRICAN REPUBLIC',
  CHAD = 'CHAD',
  CHILE = 'CHILE',
  CHINA = 'CHINA',
  COLOMBIA = 'COLOMBIA',
  COMOROS = 'COMOROS',
  CONGO = 'CONGO',
  COSTA_RICA = 'COSTA RICA',
  CROATIA = 'CROATIA',
  CUBA = 'CUBA',
  CYPRUS = 'CYPRUS',
  CZECH_REPUBLIC = 'CZECH REPUBLIC',
  DEMOCRATIC_REPUBLIC_OF_THE_CONGO = 'DEMOCRATIC REPUBLIC OF THE CONGO',
  DENMARK = 'DENMARK',
  DJIBOUTI = 'DJIBOUTI',
  DOMINICA = 'DOMINICA',
  DOMINICAN_REPUBLIC = 'DOMINICAN REPUBLIC',
  ECUADOR = 'ECUADOR',
  EGYPT = 'EGYPT',
  EL_SALVADOR = 'EL SALVADOR',
  EQUATORIAL_GUINEA = 'EQUATORIAL GUINEA',
  ERITREA = 'ERITREA',
  ESTONIA = 'ESTONIA',
  ESWATINI = 'ESWATINI',
  ETHIOPIA = 'ETHIOPIA',
  FIJI = 'FIJI',
  FINLAND = 'FINLAND',
  FRANCE = 'FRANCE',
  GABON = 'GABON',
  GAMBIA = 'GAMBIA',
  GEORGIA = 'GEORGIA',
  GERMANY = 'GERMANY',
  GHANA = 'GHANA',
  GREECE = 'GREECE',
  GRENADA = 'GRENADA',
  GUATEMALA = 'GUATEMALA',
  GUINEA = 'GUINEA',
  GUINEA_BISSAU = 'GUINEA BISSAU',
  GUYANA = 'GUYANA',
  HAITI = 'HAITI',
  HOLY_SEE = 'HOLY SEE',
  HONDURAS = 'HONDURAS',
  HUNGARY = 'HUNGARY',
  ICELAND = 'ICELAND',
  INDIA = 'INDIA',
  INDONESIA = 'INDONESIA',
  IRAN = 'IRAN',
  IRAQ = 'IRAQ',
  IRELAND = 'IRELAND',
  ISRAEL = 'ISRAEL',
  ITALY = 'ITALY',
  JAMAICA = 'JAMAICA',
  JAPAN = 'JAPAN',
  JORDAN = 'JORDAN',
  KAZAKHSTAN = 'KAZAKHSTAN',
  KENYA = 'KENYA',
  KIRIBATI = 'KIRIBATI',
  KUWAIT = 'KUWAIT',
  KYRGYZSTAN = 'KYRGYZSTAN',
  LAOS = 'LAOS',
  LATVIA = 'LATVIA',
  LEBANON = 'LEBANON',
  LESOTHO = 'LESOTHO',
  LIBERIA = 'LIBERIA',
  LIBYA = 'LIBYA',
  LIECHTENSTEIN = 'LIECHTENSTEIN',
  LITHUANIA = 'LITHUANIA',
  LUXEMBOURG = 'LUXEMBOURG',
  MADAGASCAR = 'MADAGASCAR',
  MALAWI = 'MALAWI',
  MALAYSIA = 'MALAYSIA',
  MALDIVES = 'MALDIVES',
  MALI = 'MALI',
  MALTA = 'MALTA',
  MARSHALL_ISLANDS = 'MARSHALL ISLANDS',
  MAURITANIA = 'MAURITANIA',
  MAURITIUS = 'MAURITIUS',
  MEXICO = 'MEXICO',
  MICRONESIA = 'MICRONESIA',
  MOLDOVA = 'MOLDOVA',
  MONACO = 'MONACO',
  MONGOLIA = 'MONGOLIA',
  MONTENEGRO = 'MONTENEGRO',
  MOROCCO = 'MOROCCO',
  MOZAMBIQUE = 'MOZAMBIQUE',
  MYANMAR = 'MYANMAR',
  NAMIBIA = 'NAMIBIA',
  NAURU = 'NAURU',
  NEPAL = 'NEPAL',
  NETHERLANDS = 'NETHERLANDS',
  NEW_ZEALAND = 'NEW ZEALAND',
  NICARAGUA = 'NICARAGUA',
  NIGER = 'NIGER',
  NIGERIA = 'NIGERIA',
  NORTH_KOREA = 'NORTH KOREA',
  NORTH_MACEDONIA = 'NORTH MACEDONIA',
  NORWAY = 'NORWAY',
  OMAN = 'OMAN',
  PAKISTAN = 'PAKISTAN',
  PALAU = 'PALAU',
  PALESTINE_STATE = 'PALESTINE STATE',
  PANAMA = 'PANAMA',
  PAPUA_NEW_GUINEA = 'PAPUA NEW_GUINEA',
  PARAGUAY = 'PARAGUAY',
  PERU = 'PERU',
  PHILIPPINES = 'PHILIPPINES',
  POLAND = 'POLAND',
  PORTUGAL = 'PORTUGAL',
  QATAR = 'QATAR',
  ROMANIA = 'ROMANIA',
  RUSSIA = 'RUSSIA',
  RWANDA = 'RWANDA',
  SAINT_KITTS_AND_NEVIS = 'SAINT KITTS AND NEVIS',
  SAINT_LUCIA = 'SAINT_LUCIA',
  SAINT_VINCENT_AND_THE_GRENADINES = 'SAINT VINCENT AND THE GRENADINES',
  SAMOA = 'SAMOA',
}

export type SellNowStageTwoProps = z.infer<typeof sellNowStageTwo>;

export const fuelTypeDictionary = Object.entries(FuelType).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const gearboxDictionary = Object.entries(GearboxTypes).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const transmissionDictionary = Object.entries(TransmissionTypes).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const polluationNormDictionary = Object.entries(PolluationNormTypes).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const bodyTypeDictionary = Object.entries(VehicleBodyType).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const carsColorsDictionary = Object.entries(CarsColorsTypes).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const carsColorsTypesDictionary = Object.entries(ColorTypes).map(([key, value]) => ({
  value: value,
  label: key,
}));

export const countriesDictionary = Object.entries(CountriesTypes).map(([_key, value]) => ({
  value: value,
  label: value,
}));

export const currencyDictionary = Object.entries(CurrencyTypes).map(([key, value]) => ({
  value: value,
  label: key,
}));
