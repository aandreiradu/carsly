export enum VehicleCategory {
  car,
  motorbike,
  motorhome,
  truck,
}

export enum PowerCategory {
  hp,
  kw,
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
  'ParticleFilter' = 'Particle Filter',
  'Euro-1' = 'Euro 1',
  'Euro-2' = 'Euro 2',
  'Euro-3' = 'Euro 3',
  'Euro-4' = 'Euro 4',
  'Euro-5' = 'Euro 5',
  'Euro-5a' = 'Euro 5a',
  'Euro-5b' = 'Euro 5a',
  'Euro-6' = 'Euro 6',
  'Euro-6b' = 'Euro 6b',
  'Euro-6c' = 'Euro 6c',
  'Euro-6d' = 'Euro 6d',
  'Euro-6d-temp' = 'Euro 6d-Temp',
  'Non-euro' = 'Non-euro',
}

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
  AFGHANISTAN = 'Afghanistan',
  ALBANIA = 'Albania',
  ALGERIA = 'Algeria',
  ANDORRA = 'Andorra',
  ANGOLA = 'Angola',
  ANTIGUA_AND_BARBUDA = 'Antigua and Barbuda',
  ARGENTINA = 'Argentina',
  ARMENIA = 'Armenia',
  AUSTRALIA = 'Australia',
  AUSTRIA = 'Austria',
  AZERBAIJAN = 'Azerbaijan',
  BAHAMAS = 'Bahamas',
  BAHRAIN = 'Bahrain',
  BANGLADESH = 'Bangladesh',
  BARBADOS = 'Barbados',
  BELARUS = 'Belarus',
  BELGIUM = 'Belgium',
  BELIZE = 'Belize',
  BENIN = 'Benin',
  BHUTAN = 'Bhutan',
  BOLIVIA = 'Bolivia',
  BOSNIA_AND_HERZEGOVINA = 'Bosnia and Herzegovina',
  BOTSWANA = 'Botswana',
  BRAZIL = 'Brazil',
  BRUNEI = 'Brunei',
  BULGARIA = 'Bulgaria',
  BURKINA_FASO = 'Burkina Faso',
  BURUNDI = 'Burundi',
  COTE_DIVOIRE = "Côte d'Ivoire",
  CABO_VERDE = 'Cabo Verde',
  CAMBODIA = 'Cambodia',
  CAMEROON = 'Cameroon',
  CANADA = 'Canada',
  CENTRAL_AFRICAN_REPUBLIC = 'Central African Republic',
  CHAD = 'Chad',
  CHILE = 'Chile',
  CHINA = 'China',
  COLOMBIA = 'Colombia',
  COMOROS = 'Comoros',
  CONGO = 'Congo',
  COSTA_RICA = 'Costa Rica',
  CROATIA = 'Croatia',
  CUBA = 'Cuba',
  CYPRUS = 'Cyprus',
  CZECH_REPUBLIC = 'Czech Republic',
  DEMOCRATIC_REPUBLIC_OF_THE_CONGO = 'Democratic Republic of the Congo',
  DENMARK = 'Denmark',
  DJIBOUTI = 'Djibouti',
  DOMINICA = 'Dominica',
  DOMINICAN_REPUBLIC = 'Dominican Republic',
  ECUADOR = 'Ecuador',
  EGYPT = 'Egypt',
  EL_SALVADOR = 'El Salvador',
  EQUATORIAL_GUINEA = 'Equatorial Guinea',
  ERITREA = 'Eritrea',
  ESTONIA = 'Estonia',
  ESWATINI = 'Eswatini',
  ETHIOPIA = 'Ethiopia',
  FIJI = 'Fiji',
  FINLAND = 'Finland',
  FRANCE = 'France',
  GABON = 'Gabon',
  GAMBIA = 'Gambia',
  GEORGIA = 'Georgia',
  GERMANY = 'Germany',
  GHANA = 'Ghana',
  GREECE = 'Greece',
  GRENADA = 'Grenada',
  GUATEMALA = 'Guatemala',
  GUINEA = 'Guinea',
  GUINEA_BISSAU = 'Guinea-Bissau',
  GUYANA = 'Guyana',
  HAITI = 'Haiti',
  HOLY_SEE = 'Holy See',
  HONDURAS = 'Honduras',
  HUNGARY = 'Hungary',
  ICELAND = 'Iceland',
  INDIA = 'India',
  INDONESIA = 'Indonesia',
  IRAN = 'Iran',
  IRAQ = 'Iraq',
  IRELAND = 'Ireland',
  ISRAEL = 'Israel',
  ITALY = 'Italy',
  JAMAICA = 'Jamaica',
  JAPAN = 'Japan',
  JORDAN = 'Jordan',
  KAZAKHSTAN = 'Kazakhstan',
  KENYA = 'Kenya',
  KIRIBATI = 'Kiribati',
  KUWAIT = 'Kuwait',
  KYRGYZSTAN = 'Kyrgyzstan',
  LAOS = 'Laos',
  LATVIA = 'Latvia',
  LEBANON = 'Lebanon',
  LESOTHO = 'Lesotho',
  LIBERIA = 'Liberia',
  LIBYA = 'Libya',
  LIECHTENSTEIN = 'Liechtenstein',
  LITHUANIA = 'Lithuania',
  LUXEMBOURG = 'Luxembourg',
  MADAGASCAR = 'Madagascar',
  MALAWI = 'Malawi',
  MALAYSIA = 'Malaysia',
  MALDIVES = 'Maldives',
  MALI = 'Mali',
  MALTA = 'Malta',
  MARSHALL_ISLANDS = 'Marshall Islands',
  MAURITANIA = 'Mauritania',
  MAURITIUS = 'Mauritius',
  MEXICO = 'Mexico',
  MICRONESIA = 'Micronesia',
  MOLDOVA = 'Moldova',
  MONACO = 'Monaco',
  MONGOLIA = 'Mongolia',
  MONTENEGRO = 'Montenegro',
  MOROCCO = 'Morocco',
  MOZAMBIQUE = 'Mozambique',
  MYANMAR = 'Myanmar',
  NAMIBIA = 'Namibia',
  NAURU = 'Nauru',
  NEPAL = 'Nepal',
  NETHERLANDS = 'Netherlands',
  NEW_ZEALAND = 'New Zealand',
  NICARAGUA = 'Nicaragua',
  NIGER = 'Niger',
  NIGERIA = 'Nigeria',
  NORTH_KOREA = 'North Korea',
  NORTH_MACEDONIA = 'North Macedonia',
  NORWAY = 'Norway',
  OMAN = 'Oman',
  PAKISTAN = 'Pakistan',
  PALAU = 'Palau',
  PALESTINE_STATE = 'Palestine State',
  PANAMA = 'Panama',
  PAPUA_NEW_GUINEA = 'Papua New Guinea',
  PARAGUAY = 'Paraguay',
  PERU = 'Peru',
  PHILIPPINES = 'Philippines',
  POLAND = 'Poland',
  PORTUGAL = 'Portugal',
  QATAR = 'Qatar',
  ROMANIA = 'Romania',
  RUSSIA = 'Russia',
  RWANDA = 'Rwanda',
  SAINT_KITTS_AND_NEVIS = 'Saint Kitts and Nevis',
  SAINT_LUCIA = 'Saint Lucia',
  SAINT_VINCENT_AND_THE_GRENADINES = 'Saint Vincent and the Grenadines',
  SAMOA = 'Samoa',
}

export enum CurrencyTypes {
  EUR = 'EUR',
  RON = 'RON',
  USD = 'USD',
}

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
}
