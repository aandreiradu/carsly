import { useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import BackupImage from '../../assets/missing-image.jpg';
import { Image } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import { cn } from '../../utils/styling.utils';

export type ImageSlideShow = {
  imagesSource: {
    path: string;
  }[];
  classNames?: string;
  isLoading?: boolean;
};

const ImageSlideShow = ({ imagesSource, classNames, isLoading = false }: ImageSlideShow) => {
  const [currentCarouselImage, setCurrentCarouselImage] = useState('');
  const [carouselImagesLen, _setCarouselImagesLen] = useState(imagesSource?.length || 0);
  const [carouselImages, _setCarouselImages] = useState<typeof imagesSource | []>([]);
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(1);

  useEffect(() => {
    _setCarouselImagesLen(imagesSource?.length ?? 0);
    _setCarouselImages(imagesSource ?? []);
    setCurrentCarouselImage(imagesSource[0]?.path ?? '');
  }, [imagesSource]);

  const handleImageChange = (direction: 'LEFT' | 'RIGHT') => {
    switch (direction) {
      case 'RIGHT': {
        if (+carouselCurrentIndex + 1 <= carouselImagesLen) {
          setCarouselCurrentIndex((prev) => +prev + 1);
          setCurrentCarouselImage(carouselImages[carouselCurrentIndex].path);
        } else {
          setCarouselCurrentIndex(1);
          setCurrentCarouselImage(carouselImages[0].path);
        }

        return;
      }

      case 'LEFT': {
        if (carouselCurrentIndex === 1) {
          setCarouselCurrentIndex(carouselImagesLen);
          setCurrentCarouselImage(carouselImages[carouselImagesLen - 1].path);
        } else {
          setCurrentCarouselImage(carouselImages[carouselCurrentIndex - 2].path);
          setCarouselCurrentIndex((prev) => +prev - 1);
        }
        return;
      }

      default: {
        console.log('unhandled direction');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-[300px] w-full md:w-[75%]">
        <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" animation="wave" width="100%" height="100%" />
      </div>
    );
  }

  return (
    <div className={`${cn('flex flex-col relative ', classNames)}`}>
      <div className="w-full bg-gray-100 flex items-center justify-center">
        {carouselImagesLen > 1 && (
          <div
            className={`w-10 h-10 lg:w-14 lg:h-14 absolute cursor-pointer top-[50%] -translate-y-[50%] md:top-[35%] md:-translate-y-[35%] left-0 bg-white rounded-md`}
          >
            <CaretLeft
              onClick={handleImageChange.bind(this, 'LEFT')}
              className="absolute cursor-pointer top-[35%] left-0 -translate-y-[35%]"
              height={'full'}
              width={'full'}
            />
          </div>
        )}
        <img
          id={`${new Date().toISOString()}`}
          className="h-[250px] w-full md:h-[450px] md:w-[650px] bg-contain bg-no-repeat bg-center"
          src={currentCarouselImage ? `${import.meta.env.VITE_BACKEND_URL}/${currentCarouselImage}` : BackupImage}
        />
        {carouselImagesLen > 1 && (
          <div className="w-10 h-10 lg:w-14 lg:h-14 absolute cursor-pointer top-[50%] -translate-y-[50%] md:top-[35%] md:-translate-y-[35%] right-0 bg-white rounded-md">
            <CaretRight onClick={handleImageChange.bind(this, 'RIGHT')} height={'full'} width={'full'} />
          </div>
        )}
      </div>
      <button
        className={`flex items-center gap-2 bg-[#1f1f1f] rounded-md px-3  text-white absolute 
          bottom-5 md:${carouselImagesLen > 0 ? 'bottom-1/4' : 'bottom-5'}
          right-1 md:right-6 
          p-1`}
      >
        <Image />
        {`${carouselCurrentIndex} / ${carouselImagesLen || 1}`}
      </button>
      {carouselImagesLen > 1 && (
        <ul className="hidden md:flex mt-2 w-fullbg-green-400 items-center gap-3 overflow-y-auto">
          {carouselImages.map((img, index) => (
            <img
              id={`${index}`}
              className="h-32 overflow-hidden flex-shrink-0"
              key={`${index}__`}
              src={img?.path ? `${import.meta.env.VITE_BACKEND_URL}/${img.path}` : BackupImage}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default ImageSlideShow;
