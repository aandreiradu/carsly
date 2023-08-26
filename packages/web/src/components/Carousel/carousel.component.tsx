import { useRef, useState, ReactNode, FC } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

export type CarouselProps = {
  imagesSource: imagesSource[];
  classNames?: string;
};

type imagesSource = {
  path: string;
};

const Carousel = ({ imagesSource, classNames }: CarouselProps) => {
  const [currentCarouselImage, setCurrentCarouselImage] = useState('');
  const [carouselImagesLen, _setCarouselImagesLen] = useState(imagesSource?.length || 0);
  const [carouselImages, _setCarouselImages] = useState<typeof imagesSource>([]);
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);

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

  return (
    <div className="flex flex-col  relative">
      <div className="w-full bg-yellow-400 flex items-center justify-center">
        <ArrowLeft
          onClick={handleImageChange.bind(this, 'LEFT')}
          className="absolute top-1/2 left-0 -translate-y-1/2"
          height={'30px'}
          width={'60px'}
        />
        <img className="h-[445px] w-[850px] bg-cover" src={`${import.meta.env.VITE_BACKEND_URL}/${currentCarouselImage}`} />
        <ArrowRight
          onClick={handleImageChange.bind(this, 'RIGHT')}
          className="absolute top-1/2 right-0 -translate-y-1/2"
          height={'30px'}
          width={'60px'}
        />
      </div>
      <button className="absolute bottom-1/4 right-6 p-1">{`${carouselCurrentIndex} / ${carouselImagesLen}`}</button>
      <ul className="w-full  bg-green-400 flex items-center gap-3 overflow-y-auto">
        {/* {info?.images.map((img, index) => ( */}
        {carouselImages.map((img, index) => (
          <img
            className="h-32 overflow-hidden flex-shrink-0"
            key={`${index}__`}
            src={`${import.meta.env.VITE_BACKEND_URL}/${img.path}`}
          />
        ))}
      </ul>
    </div>
  );
};
export default Carousel;
