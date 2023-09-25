import { CaretRight, MapPin, Phone } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { cn } from '../../utils/styling.utils';

interface AdSellerDetailsProps {
  sellerName: string;
  sellerPhoneNumber: string;
  sellerCity: string;
  header?: string;
  className?: string;
  isLoading?: boolean;
  userId: string;
}

const AdSellerDetails = ({
  sellerName,
  sellerCity,
  sellerPhoneNumber,
  header,
  className,
  isLoading = false,
  userId,
}: AdSellerDetailsProps) => {
  if (isLoading) {
    return (
      <div className="flex md:hidden w-full flex-col p-2 my-4">
        <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" animation="wave" width="100%" height="80px" />
      </div>
    );
  }

  return (
    <div className={`${cn('hidden md:flex w-full flex-col border border-black p-2 my-4', className)}`}>
      {header && <p className="text-base leading-6 mb-4 text-gray-600">{header}</p>}
      <p className="font-bold font-kanit text-xl mb-3">{sellerName}</p>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <Phone />
          <Link className="text-blue-500" to={`tel:${sellerPhoneNumber}`}>
            {sellerPhoneNumber}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin />
          <p>{sellerCity}</p>
        </div>
        <div className="flex justify-start md:justify-center my-5">
          <Link
            to={`/user/${userId}/ads`}
            state={{ sellerName: sellerName }}
            className="flex items-center md:justify-center gap-1 text-sm relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#1f1f1f] after:hover:w-full after:hover:transition-width after:hover:ease-linear duration-1000"
          >
            More ads from this seller
            <CaretRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdSellerDetails;
