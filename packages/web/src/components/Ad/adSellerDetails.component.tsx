import { MapPin, Phone } from 'phosphor-react';
import { cn } from '../UI/Checkbox/checkbox.component';
import { Link } from 'react-router-dom';

interface AdSellerDetailsProps {
  sellerName: string;
  sellerPhoneNumber: string;
  sellerCity: string;
  header?: string;
  className?: string;
}

const AdSellerDetails = ({ sellerName, sellerCity, sellerPhoneNumber, header, className }: AdSellerDetailsProps) => {
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
      </div>
    </div>
  );
};

export default AdSellerDetails;
