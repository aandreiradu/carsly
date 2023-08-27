import { Skeleton } from '@mui/material';
import AdSellerDetails from './adSellerDetails.component';

interface AdCarShortDetailsProps {
  title: string;
  year: number;
  KM: number;
  fuelType: string;
  bodyType: string;
  price: number;
  currency: string;
  isNegotiable?: boolean | null;
  sellerCity: string;
  sellerFullName: string;
  sellerPhoneNumber: string;
  isLoading?: boolean;
}

const AdCarShortDetails = ({
  title,
  year,
  fuelType,
  bodyType,
  KM,
  currency,
  price,
  isNegotiable,
  sellerCity,
  sellerFullName,
  sellerPhoneNumber,
  isLoading = false,
}: AdCarShortDetailsProps) => {
  if (isLoading) {
    return (
      <div className="w-full md:w-[25%] h-[100px] md:h-[300px] my-1 md:my-0">
        <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" animation="wave" width="100%" height="100%" />
      </div>
    );
  }

  return (
    <div className="w-full md:w-[25%] h-full px-2  flex-1 flex-col  md:sticky md:top-0 md:right-0">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-base font-semibold capitalize">
        {year} &#8226; {KM} &#8226; {fuelType} &#8226; {bodyType}
      </p>
      <p className="mt-3 font-bold text-2xl text-red-500">
        {price} <span className="text-base">{currency}</span>
      </p>
      {isNegotiable && <span className="text-base text-[#f9fdff] capitalize">{isNegotiable}</span>}
      <AdSellerDetails
        sellerCity={sellerCity ?? ''}
        sellerName={sellerFullName ?? ''}
        sellerPhoneNumber={sellerPhoneNumber ?? ''}
      />
    </div>
  );
};

export default AdCarShortDetails;
