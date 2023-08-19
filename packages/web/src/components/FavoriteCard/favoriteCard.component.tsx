import { Heart } from 'phosphor-react';
import { FavoriteCarAd } from '../../store/favorites/favorites.slice';

const FavoriteCardItem = ({ currency, name, price, thumbnail, location }: FavoriteCarAd) => {
  return (
    <div className="w-full border border-red-500 rounded-md cursor-pointer">
      <div className="h-48 w-full">
        <img
          className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
          src={`http://localhost:5174/${thumbnail}` ?? ''}
          alt="name"
        />
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex items-start justify-between gap-4">
          <p className="text-base h-10 overflow-hidden text-ellipsis leading-5">{name}</p>
          <button className="flex w-fit items-center p-0 bg-none ">
            <Heart weight="fill" color="red" className="h-6 w-6" />
          </button>
        </div>
        <p className="text-sm leading-4 h-9 text-ellipsis overflow-hidden">{location}</p>
        <p className="leading-4 text-lg text-red-500">
          {price} {currency}
        </p>
      </div>
    </div>
  );
};

export default FavoriteCardItem;
