import { CreateAdDTO } from 'src/ads/dto/create-ad.dto';

export const createAdMapFormData = (data: CreateAdDTO) => {
  if (!data) return;

  for (const idx in data) {
    if (data[idx] === 'undefined') {
      data[idx] = undefined;
    } else if (data[idx] === 'true') {
      data[idx] = true;
    } else if (data[idx] === 'false') {
      data[idx] = false;
    }
  }

  return {
    isDamaged: data?.isDamaged,
    isRightHandDrive: data?.isRightHandDrive,
    isImported: data?.isImported,
    VIN: data.VIN,
    KM: +data.KM,
    dayOfRegistration: +data.dayOfRegistration,
    monthOfRegistration: +data.monthOfRegistration,
    yearOfRegistration: +data.yearOfRegistration,
    year: +data.year,
    fuelType: data.fuel,
    power: +data.power,
    engineSize: +data.engineSize,
    noOfDoors: +data.noOfDoors,
    gearbox: data.gearbox,
    transmission: data.transmission,
    polluationNorm: data.polluationNorm,
    co2emissions: +data?.co2emissions,
    bodyType: data.bodyType,
    color: data.color,
    colorType: data.colorType,
    seats: +data.seats,
    youtubeVideo: data?.youtubeVideo,
    title: data.adTitle,
    description: data?.description,
    vehicleOrigin: data.vehicleOrigin,
    isFirstOwner: data.isFirstOwner,
    isWithoutAccident: data.isWithoutAccident,
    isRegistered: data.isRegistered,
    isServiceCardAvailable: data.isServiceCardAvailable,
    isVintageCar: data.isVintageCar,
    hasTuning: data.hasTuning,
    price: +data.price,
    currency: data.currency,
    isNegotiable: data?.isNegotiable,
    isLeasing: data.isLeasing,
    sellerFullName: data.sellerFullName,
    sellerCity: data.sellerCity,
    sellerPhoneNumber: data.sellerPhoneNumber,
  };
};
