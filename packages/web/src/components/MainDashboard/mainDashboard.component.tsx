import { ReactNode } from 'react';
import Carousel from '../Carousel/carousel.component';

const categories = ['All Cars', 'Electric', 'Gasoline', 'Hybrids', 'Oldest', 'Newest'];

interface MainDashboardProps {
  children?: ReactNode;
}

const MainDashboard = ({ children }: MainDashboardProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <h1 className="text-white mb-4 font-kanit text-xl md:text-4xl font-bold tracking-widest">Find your perfect car</h1>
      <Carousel className="flex text-center items-center w-full space-x-4 overflow-hidden overflow-x-auto">
        {categories.map((cat, index) => (
          <div
            key={'carousel-image--' + index}
            className="select-none cursor-pointer flex flex-shrink-0 justify-center items-center w-24 h-12 md:w-36  font-kanit text-base md:text-lg bg-yellow-400 py-2 rounded-xl"
          >
            {cat}
          </div>
        ))}
      </Carousel>

      <div className=" relative p-4 mt-10 h-72 w-full md:h-full md:max-h-80 rounded-lg flex items-start justify-center flex-col">
        <img
          className="z-0 absolute top-0 left-0 w-full h-full object-cover object-bottom rounded-lg brightness-75"
          src={'./landing-1.jpg'}
        />

        <div className="z-10 text-white">
          <h2 className="font-kanit text-3xl">Top Safety Pick</h2>
          <p className="pt-3 font-kanit text-base capitalize">
            Awarded the most 2021 <br /> <span className="text-sm uppercase">IIHS TOP SAFETY PICK</span>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainDashboard;
