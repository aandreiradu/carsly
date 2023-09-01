import { useRef, useState } from 'react';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Skeleton } from '@mui/material';
import { type AdTechnicalDetailsProps } from '../../pages/AdDetails/adDetails.page';

const AdTechnicalDetails = (props: AdTechnicalDetailsProps) => {
  const [showFullDetais, setShowFullDetails] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  let contentLoading = (
    <div className={`w-full  md:w-1/2 overflow-hidden flex flex-col my-2`}>
      <div className="mx-2 md:mx-0">
        <Skeleton className="" sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="30%" height="30px" />
      </div>
      <div
        className={`grid grid-cols-2 ${
          !showFullDetais ? 'h-[200px]' : 'h-[600px]'
        } overflow-hidden animate-expendHeight transition-height px-2 md:px-0`}
      >
        <div className="flex flex-col gap-1">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="70%" height="32px" />
            ))}
        </div>
        <div className="flex flex-col gap-1 ">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="100%" height="32px" />
            ))}
        </div>
      </div>
      <div className="px-2 mt-6 w-full">
        <div className="my-2">
          <Skeleton sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="40%" height="30px" />
        </div>
        <Skeleton className="overflow-hidden" variant="rectangular" animation="wave" height="176px" />
      </div>
      <div className="px-2 mt-2 w-full">
        <div className="my-2">
          <Skeleton sx={{ bgcolor: 'grey.400' }} variant="text" animation="wave" width="40%" height="30px" />
        </div>
        <Skeleton className="overflow-hidden" variant="rectangular" animation="wave" height="100px" />
      </div>
    </div>
  );

  if (props.isLoading) {
    return contentLoading;
  }

  return (
    <div className={`w-full  md:w-1/2 overflow-hidden flex flex-col my-2`}>
      <p className="my-2 font-bold leading-4 text-base px-2 md:px-0">Details</p>
      <div
        className={`grid grid-cols-2 ${
          !showFullDetais ? 'h-44 overflow-hidden' : 'h-[444px] overflow-y-auto'
        } overflow-hidden animate-expendHeight transition-height px-2 md:px-0`}
      >
        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-sm h-8">Brand</p>
          <p className="overflow-hidden text-sm h-8">Model</p>
          <p className="overflow-hidden text-sm h-8">Year</p>
          <p className="overflow-hidden text-sm h-8">KM</p>
          <p className="overflow-hidden text-sm h-8">Fuel</p>
          <p className="overflow-hidden text-sm h-8">Engine size</p>
          <p className="overflow-hidden text-sm h-8">Transmission</p>
          <p className="overflow-hidden text-sm h-8">Polluation norm</p>
          <p className="overflow-hidden text-sm h-8">Gearbox</p>
          <p className="overflow-hidden text-sm h-8">Body type</p>
          <p className="overflow-hidden text-sm h-8">Doors</p>
          <p className="overflow-hidden text-sm h-8">Color</p>
          <p className="overflow-hidden text-sm h-8">Seats</p>
          <p className="overflow-hidden text-sm h-8">Color type</p>
          <p className="overflow-hidden text-sm h-8">Registered</p>
          <p className="overflow-hidden text-sm h-8">Without accident</p>
          <p className="overflow-hidden text-sm h-8">Service card</p>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="overflow-hidden text-sm h-8">{props?.brandName}</p>
          <p className="overflow-hidden text-sm h-8">{props?.modelName}</p>
          <p className="overflow-hidden text-sm h-8">{props?.year}</p>
          <p className="overflow-hidden text-sm h-8">{props?.KM}</p>
          <p className="overflow-hidden text-sm h-8">{props?.fuelType}</p>
          <p className="overflow-hidden text-sm h-8">{props?.engineSize}</p>
          <p className="overflow-hidden text-sm h-8">{props?.transmission}</p>
          <p className="overflow-hidden text-sm h-8">{props?.polluationNorm}</p>
          <p className="overflow-hidden text-sm h-8">{props?.gearbox}</p>
          <p className="overflow-hidden text-sm h-8">{props?.bodyType}</p>
          <p className="overflow-hidden text-sm h-8">{props?.noOfDoors}</p>
          <p className="overflow-hidden text-sm h-8">{props?.color}</p>
          <p className="overflow-hidden text-sm h-8">{props?.seats}</p>
          <p className="overflow-hidden text-sm h-8">{props?.colorType}</p>
          <p className="overflow-hidden text-sm h-8">{props?.isRegistered ? 'Yes' : 'No'}</p>
          <p className="overflow-hidden text-sm h-8">{props?.isWithoutAccident ? 'Yes' : 'No'}</p>
          <p className="overflow-hidden text-sm h-8">{props?.isServiceCardAvailable ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {!props.isLoading && (
        <button
          onClick={() => setShowFullDetails((prev) => !prev)}
          className="px-2 md:px-0 h-9 flex items-center justify-start gap-1 my-1 text-sm text-blue-500"
        >
          {!showFullDetais ? `Show more` : `Hide`}
          {!showFullDetais ? <CaretDown /> : <CaretUp />}
        </button>
      )}

      {props?.description && (
        <>
          <p className="my-2 font-bold leading-4 text-base px-2 md:px-0">Description</p>
          <textarea
            ref={descriptionRef}
            readOnly={true}
            defaultValue={props.description}
            className={`outline-none resize-none border-none focus:outline-none focus:border-none active:border-none overflow-hidden text-black px-2 md:px-0 mt-2 text-base animate-expendHeight transition-height
            ${!showFullDescription ? 'h-20 overflow-hidden' : 'h-[300px] overflow-y-auto'} `}
          />
          {!props.isLoading && (
            <button
              onClick={() =>
                setShowFullDescription((prev) => {
                  if (prev) {
                    descriptionRef.current?.scrollTo(0, 0);
                  }
                  return !prev;
                })
              }
              className="px-2 md:px-0 h-9 flex items-center justify-start gap-1 mb-1 text-sm text-blue-500"
            >
              {!showFullDescription ? `Show more` : `Hide`}
              {!showFullDescription ? <CaretDown /> : <CaretUp />}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AdTechnicalDetails;
