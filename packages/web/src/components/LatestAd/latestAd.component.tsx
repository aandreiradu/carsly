import { Heart } from 'phosphor-react';
import { type LatestAd } from '../../store/ad/ad.slice';
import BackUpAdImage from '../../assets/missing-image.jpg';

interface ILatestAd extends LatestAd {}

const LatestAd = ({ adId, currency, name, price, thumbnail, location }: ILatestAd) => {
  return (
    <div key={adId} className="flex flex-col flex-shrink-0 relative w-52 h-64 bg-[#2f2e2e] text-white rounded-lg">
      <span className="absolute cursor-pointer top-2 left-2 p-1 bg-[#2f2e2e] rounded-lg">
        <Heart className="h-5 w-6" />
      </span>

      <img
        className="select-none pointer-events-none rounded-lg h-full w-full bg-cover bg-center max-h-[70%]"
        src={thumbnail ? `${import.meta.env.VITE_BACKEND_URL}/${thumbnail}` : BackUpAdImage}
      />

      <div className="px-2 py-1 select-none h-full max-h-[30%]">
        <p className="text-sm">{name}</p>
        <div className="flex justify-between items-center h-full">
          <span className="text-base capitalize h-5 overflow-hidden text-ellipsis">{location}</span>
          <span className="text-xl font-kanit font-semibold flex items-center flex-col-reverse pb-2">
            {price || 0} <small className="text-sm mr-1">{currency || 'N/A'}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LatestAd;

169208;
