import { Camera, Lightbulb } from 'phosphor-react';
import Checkbox from '../../components/UI/Checkbox/checkbox.component';
import { AdPageProps } from '../../types/ad.types';
import { Input } from '../../components/UI/Input/input.component';
import TextArea from '../../components/UI/Textarea/textarea.component';
import AdSectionHeader from '../../components/Ad/adSectionHeader.component';
import AdSectionHeaderWithImage from '../../components/Ad/adSectionHeaderWithImage.component';

const Ad = ({ title }: AdPageProps) => {
  return (
    <section className="w-full bg-white px-5 py-3 md:px-16 md:py-7 xl:px-64 xl:py-14 font-kanit text-black ">
      <h1 className=" text-xl font-bold py-4 tracking-wide lg:text-3xl lg:py-1 lg:tracking-wider">{title}</h1>

      <AdSectionHeader title="Vehicle details" />

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

      <AdSectionHeader title="General Informations" />

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
            <Input id="vin" type="number" placeholder="AAAA" className="border-none bg-gray-200 rounded-lg w-32 lg:w-20" />
          </div>
        </div>
      </div>

      <AdSectionHeader title="Technical details" />

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

      <AdSectionHeader title="Body type details" />

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

      {/* <div className="flex space-x-3 relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide">
        <h3>Images</h3>
        <div className="flex space-x-2 items-center bg-indigo-500 text-white px-2 rounded-md">
          <Camera className="h-4 w-4" />
          <span className="text-xs">0 / 5</span>
        </div>
      </div> */}

      <AdSectionHeaderWithImage title="Images" image={<Camera className="h-4 w-4" />} labelText={'0 / 5'} />

      <div className="flex space-x-4 w-full my-5">
        <Lightbulb className="w-10 h-10 lg:h-6 lg:w-6" />
        <span className="text-base font-light">
          Increase the attractiveness of the ad by adding a YouTube link with a recording of the vehicle
        </span>
      </div>

      <div className="flex flex-col w-full lg:flex-1">
        <Input
          label="Video Youtube "
          labelClasses="my-2"
          id="youtubeVideo"
          type="text"
          placeholder="Ex: https://www.youtube.com/watch?v=2g83-3j7nww&t=51s"
          className="border-none bg-gray-200 rounded-lg"
        />
      </div>

      {/* <div className="flex space-x-3 relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide">
        <h3>Vehicle description</h3>
        <div className="flex space-x-2 items-center bg-indigo-500 text-white px-2 rounded-md">
          <span className="text-xs">OPTIONAL</span>
        </div>
      </div> */}

      <AdSectionHeaderWithImage title="Vehicle description" labelText="OPTIONAL" />

      <div className="flex flex-col w-full lg:flex-1">
        <Input
          label="Short description"
          labelClasses="my-2"
          id="shortDescription"
          type="text"
          placeholder="Ex: First Owner / Battery replace, etc"
          className="border-none bg-gray-200 rounded-lg"
        />
      </div>

      <div className="flex flex-col w-full lg:flex-1 my-8">
        <TextArea maxLen={10} minLen={1} label="Description" className="bg-gray-200 rounded-md" />
      </div>

      <AdSectionHeaderWithImage title="Vehicle historic" labelText="OPTIONAL" />

      <p className="text-base lg:text-xl font-light">Origin of the vehicle</p>

      <div className="flex flex-col w-full lg:flex-1">
        <Input
          label="Vehicle origin country"
          labelClasses="my-2"
          id="VehicleOrigincountry"
          type="text"
          placeholder="Select"
          className="border-none bg-gray-200 rounded-lg w-full lg:w-1/3"
        />
      </div>

      <p className="mt-7 text-base lg:text-xl font-light">Vehicle Status</p>

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5">
        <Checkbox
          label="First owner"
          id="firstOnwer"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-6"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Without accident"
          id="withoutAccident"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-6"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Registered"
          id="isVehicleRegistered"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Service card"
          id="serviceCard"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Vintage car"
          id="vintagecAR"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Tuning"
          id="tuning"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
      </div>

      <AdSectionHeader title="Price" />

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Price*"
            id="price"
            type="number"
            placeholder="Ex: 8000 EUR"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input
            label="Currency*"
            id="currency"
            type="text"
            placeholder="EUR"
            className="border-none bg-gray-200 rounded-lg"
          />
        </div>
      </div>

      <AdSectionHeader title="Price details" />

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5">
        <Checkbox
          label="Negotiable"
          id="priceNegotiable"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
        <Checkbox
          label="Leasing"
          id="leasing"
          className="text-black focus:ring-black h-6"
          wrapperClassNames="flex items-center basis-3/6 px-3 py-3 border border-gray-200 mt-3"
          labelClassNames="text-lg"
        />
      </div>

      <AdSectionHeader title="Seller details" />

      <div className="flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-5 mt-2">
        <div className="flex flex-col w-full lg:flex-1">
          <Input label="Name" id="sellerName" type="text" className="border-none bg-gray-200 rounded-lg mt-1" />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input label="City" id="sellerCity" type="text" className="border-none bg-gray-200 rounded-lg mt-1" />
        </div>
        <div className="flex flex-col w-full lg:flex-1">
          <Input label="Phone number" id="sellerPhone" type="text" className="border-none bg-gray-200 rounded-lg mt-1" />
        </div>
      </div>

      <button className="cursor-pointer bg-indigo-500 hover:bg-indigo-800 shadow-md hover:transition-colors text-white flex items-center justify-center my-5 py-2 px-3 lg:w-48 mx-auto text-xl rounded-lg lg:my-10 lg:py-3 lg:px-5">
        Submit
      </button>
    </section>
  );
};

export default Ad;
