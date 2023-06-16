import { Lightbulb } from 'phosphor-react';
import Checkbox from '../../components/Checkbox/checkbox.component';
import { AdPageProps } from '../../types/ad.types';
import { Input } from '../../components/UI/Input/input.component';

const Ad = ({ title }: AdPageProps) => {
  return (
    <section className="w-full bg-white px-5 py-3 md:px-16 md:py-7 xl:px-64 xl:py-14 font-kanit text-black ">
      <h1 className=" text-xl font-bold py-4 tracking-wide lg:text-3xl lg:py-1 lg:tracking-wider">{title}</h1>

      <h3 className="inline-block relative text-xl font-bold /*py-2*/ tracking-wide my-1 lg:text-xl /*lg:py-4*/ lg:my-3 after:absolute after:-bottom-1 after:h-[2px] after:bg-black/40 after:w-3/6 after:hover:w-4/5 after:transition-all after:duration-300  after:right-0 after:left-0 after:mx-auto after:my-0">
        Vehicle details
      </h3>

      <p className="text-gray-500 text-base font-bold mt-1 tracking-wide lg:text-base">Status</p>

      <div className="flex flex-col">
        <div className="flex gap-5">
          <Checkbox
            label="Damaged"
            id="damaged"
            className="text-black focus:ring-black h-6"
            wrapperClassNames="flex items-center basis-3/6 px-3 py-1 border border-gray-200 mt-6"
            labelClassNames="text-lg"
          />
          <div className="flex basis-3/6 ">
            <div className="flex flex-col w-full">
              <label htmlFor="imported p-1">Imported*</label>
              <div className="flex items-center justify-between w-full">
                <button className="relative flex justify-center items-center w-full bg-gray-200 m-0 px-3 py-2 text-black font-bold cursor-pointer leading-6 hover:bg-indigo-600 focus:bg-indigo-600 group">
                  No
                  {/* <span className="absolute h-4 inline-block right-0 w-[1px] bg-gray-500 group-hover:hidden group-focus:hidden"></span> */}
                </button>
                <button className="relative flex justify-center items-center w-full bg-gray-200 m-0 px-3 py-2 text-black font-bold cursor-pointer leading-6 hover:bg-indigo-600 focus:bg-indigo-600">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:w-[49%] mt-6">
          <Checkbox
            label="Right hand drive"
            id="rightHandDrive"
            className="text-black focus:ring-black h-6"
            wrapperClassNames="w-full px-3 py-1 border border-gray-200"
            labelClassNames="text-lg"
          />
        </div>
      </div>

      {/* <h3 className="relative text-xl font-bold py-2 tracking-wide my-1 lg:text-xl lg:py-4 lg:my-3">General Informations</h3> */}
      <h3 className="inline-block relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide after:absolute after:-bottom-1 after:h-[2px] after:bg-black/40 after:w-3/6 after:hover:w-4/5 after:transition-all after:duration-300  after:right-0 after:left-0 after:mx-auto after:my-0">
        General Informations
      </h3>

      <div className="flex space-x-4 w-full">
        <Lightbulb className="w-10 h-10 lg:h-6 lg:w-6" />
        <span className="text-base font-light">
          Enter the VIN code (chassis series) and we will automatically fill in the information for you whenever possible.
        </span>
      </div>

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="VIN (chassis series)"
            labelClasses="my-2"
            id="vin"
            type="text"
            placeholder="ex: 1FTPW14V88FC22108"
            maxLength={17}
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="KM*"
            labelClasses="my-2"
            id="km"
            type="number"
            placeholder="ex: 100 000"
            maxLength={17}
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col w-full lg:flex-1">
          <label className="my-2">Date of first registration</label>
          <div className="flex items-center gap-2">
            <Input id="vin" type="number" placeholder="ZZ" className="border-none bg-gray-200 rounded-lg w-28 lg:w-16" />
            {' / '}
            <Input id="vin" type="number" placeholder="LL" className="border-none bg-gray-200 rounded-lg w-28 lg:w-16" />
            {' / '}
            <Input id="vin" type="number" placeholder="AA" className="border-none bg-gray-200 rounded-lg w-28 lg:w-16" />
          </div>
        </div>
      </div>

      {/* <h3 className="relative text-xl font-bold tracking-wide my-1 lg:text-xl mt-5 lg:mt-10">Technical details</h3> */}

      <h3 className="inline-block relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide after:absolute after:-bottom-1 after:h-[2px] after:bg-black/40 after:w-3/6 after:hover:w-4/5 after:transition-all after:duration-300  after:right-0 after:left-0 after:mx-auto after:my-0">
        Technical details
      </h3>

      <p className="text-sm lg:text-base font-light">
        Please check the details of the vehicle before publishing the ad. You can change mistakes regarding VIN, make, model,
        year <b>only during the first 24 hours from the moment of adding the ad.</b>
      </p>

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Year*"
            labelClasses="my-2"
            id="year"
            type="number"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Brand*"
            labelClasses="my-2"
            id="brand"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Model*"
            labelClasses="my-2"
            id="model"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Fuel*"
            labelClasses="my-2"
            id="fuel"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Power*"
            labelClasses="my-2"
            id="power"
            type="text"
            placeholder="Ex: 150"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Engine size*"
            labelClasses="my-2"
            id="engineSize"
            type="text"
            placeholder="Ex: 1 395 cm3"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="No of doors*"
            labelClasses="my-2"
            id="noOfDoors"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Gearbox*"
            labelClasses="my-2"
            id="gearbox"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Transmission*"
            labelClasses="my-2"
            id="transmission"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Polluation Norm*"
            labelClasses="my-2"
            id="polluationNorm"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="CO2 Emissions"
            labelClasses="my-2"
            id="co2emissions"
            type="text"
            placeholder="g/km"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
      </div>

      <h3 className="inline-block relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide after:absolute after:-bottom-1 after:h-[2px] after:bg-black/40 after:w-3/6 after:hover:w-4/5 after:transition-all after:duration-300  after:right-0 after:left-0 after:mx-auto after:my-0">
        Body type details
      </h3>

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col w-full lg:flex-1 col-span-2">
          <Input
            label="Body type*"
            labelClasses="my-2"
            id="bodyType"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Color*"
            labelClasses="my-2"
            id="color"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Seats*"
            labelClasses="my-2"
            id="seats"
            type="text"
            placeholder="Select"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Ad;
