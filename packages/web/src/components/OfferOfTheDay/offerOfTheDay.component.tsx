import { Heart } from 'phosphor-react';
import { CurrencyTypes, FuelType } from '../../pages/SellNow/types';

interface OfferOfTheDayProps {
  imageURL: string;
  title: string;
  fuel: FuelType;
  price: number;
  currency: CurrencyTypes;
  year: number;
  km: number;
  engineSize: number;
  description?: string;
  details?: {
    text: string;
    values: string | number;
  }[];
}

const OfferOfTheDay = ({
  currency,
  description,
  engineSize,
  fuel,
  imageURL,
  km,
  price,
  title,
  year,
}: OfferOfTheDayProps) => {
  return (
    <div className="relative my-6 md:my-0 shadow-xl bg-default-gray w-full h-fit md:h-full md:max-h-[800px] md:max-w-md flex flex-col rounded-2xl">
      <p className="absolute z-10 -top-4  left-1/2 -translate-x-1/2 text-black font-bold capitalize bg-yellow-400 p-2 rounded-lg">
        Offer of the day
      </p>
      <img
        className="z-0 w-full h-fit md:h-full md:max-h-[40%] object-cover object-bottom rounded-lg brightness-75"
        src={imageURL}
      />
      <div className="relative h-full mt-4 px-4 flex flex-col text-white overflow-auto">
        <h2 className="font-kanit text-2xl font-bold tracking-wider">{title}</h2>
        <ul className="flex items-center my-3 space-x-4 overflow-x-auto overflow-y-hidden">
          <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
            <span className="text-sm">KM</span>
            <span className="text-base font-bold">{km}</span>
          </li>
          <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
            <span className="text-sm">Fuel</span>
            <span className="text-base font-bold">{fuel}</span>
          </li>
          <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
            <span className="text-sm">Year</span>
            <span className="text-base font-bold">{year}</span>
          </li>
          <li className="bg-[#2f2e2e] w-24 flex items-center justify-center text-center flex-col p-3 rounded-lg">
            <span className="text-sm">Engine</span>
            <span className="text-base font-bold">{engineSize}cm3</span>
          </li>
        </ul>

        <p className="my-2 text-base leading-loose h-full max-h-48 overflow-auto">{description}</p>

        <div className="mt-auto w-full py-4 px-1 bg-default-gray flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-kanit text-lg font-light">Price</span>
            <span className="text-2xl font-kanit font-bold">
              <small className="text-sm mr-1">{currency}</small>
              {price}
            </span>
          </div>
          <button className="flex items-center justify-center gap-1 first-letter:cursor-pointer bg-yellow-400 py-2 px-3 rounded-3xl text-xl text-black font-kanit active:outline-none focus:outline-none">
            Add to favorite
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferOfTheDay;
