import Carousel from '../../components/Carousel/carousel.component';
import MainLayout from '../../components/Layouts/Main/main.layout';
import { Heart, Star, ShoppingCart } from 'phosphor-react';
import Nav from '../../components/Nav/nav.component';

const categories = ['All Cars', 'Electric', 'Gasoline', 'Hybrids', 'Oldest', 'Newest'];

const Home = () => {
  return (
    <MainLayout>
      <Nav />
      <section className="px-2 gap-4 lg:gap-0 md:px-0 my-6 md:my-0 h-full max-h-[98%] flex flex-wrap items-center w-full overflow-auto  xl:space-x-5 2xl:space-x-7">
        {/* LEFT */}
        <div className="flex md:h-full w-full shadow-xl bg-default-gray rounded-2xl md:max-h-[800px] md:my-auto py-3 px-2 m-0 lg:m-5 lg:py-5 lg:px-6 md:max-w-[600px] xl:max-w-[1000px]">
          <div className="w-full h-full flex flex-col overflow-hidden">
            <h1 className="text-white mb-4 font-kanit text-xl md:text-4xl font-bold tracking-widest">
              Find your perfect car
            </h1>
            <Carousel className="flex text-center items-center w-full space-x-4 overflow-hidden overflow-x-auto">
              {categories.map((cat) => (
                <div className="select-none cursor-pointer flex flex-shrink-0 justify-center items-center w-24 h-12 md:w-36  font-kanit text-base md:text-lg bg-yellow-300 py-2 rounded-xl">
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

            <Carousel className="cursor-grab mt-10 px-1 md:pl-1 md:pr-4 flex items-center space-x-3 overflow-x-auto overflow-y-hidden">
              {categories.map((_) => (
                <div className="flex flex-col flex-shrink-0 relative w-52 h-64 bg-[#2f2e2e] text-white rounded-lg">
                  <span className="absolute cursor-pointer top-2 left-2 p-1 bg-[#2f2e2e] rounded-lg">
                    <Heart className="h-5 w-6" />
                  </span>

                  <img
                    className="select-none pointer-events-none rounded-lg h-full w-full bg-cover bg-center max-h-[70%]"
                    src={'./landing-2.jpg'}
                  />

                  <div className="px-2 py-1 select-none ">
                    <p className="text-sm">Mercedes Benz AMG GTR PRO +</p>
                    <div className="flex justify-between items-center">
                      <span className="text-base capitalize">petrol</span>
                      <div className="flex items-center">
                        <Star />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative m-0 lg:m-5 my-8 md:my-0 shadow-xl bg-default-gray w-full h-full overflow-y-auto max-h-[420px] md:h-full md:max-w-md md:max-h-[800px] flex flex-col rounded-2xl">
          <img
            className="z-0 w-full h-fit md:h-full md:max-h-[40%] object-cover object-bottom rounded-lg brightness-75"
            src={'./amg.jpg'}
          />
          <div className="my-4 p-2 px-4 flex flex-col text-white">
            <h2 className="font-kanit text-2xl font-bold tracking-wider">Mercedes AMG GTR</h2>
            <p className="my-1 tracking-wide">Petrol</p>

            <div className="flex items-center my-3 space-x-4">
              <div className="bg-[#2f2e2e] flex flex-col p-3 rounded-lg">
                <span>396 mi</span>
                <span>Range (EPA est.)</span>
              </div>
              <div className="bg-[#2f2e2e] flex flex-col p-3 rounded-lg">
                <span>1.99s</span>
                <span>0 - 60 mph*</span>
              </div>
              <div className="bg-[#2f2e2e] flex flex-col p-3 rounded-lg">
                <span>200mph</span>
                <span>Top Speed*</span>
              </div>
            </div>

            <p className="my-2 text-base leading-loose">
              The Mercedes-AMG GT (C190 / R190) is a grand tourer produced in coupé and roadster bodystyles by German
              automobile manufacturer Mercedes-AMG. The car was introduced on 9 September 2014 and was officially unveiled to
              the public in October 2014 at the Paris Motor Show.
            </p>

            <div className="w-full flex items-center">
              <span className="flex-1 h-[1px] bg-default-yellow"></span>
              <span className="px-4 transform rotate-90 text-2xl">〈 〉</span>
              <span className="flex-1 h-[1px] bg-default-yellow"></span>
            </div>

            <div className="sticky w-full py-4 bottom-0 left-0 bg-default-gray flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-kanit text-lg font-light">Price</span>
                <span className="text-2xl font-kanit font-bold">
                  <small className="text-sm mr-1">$</small>199 99
                </span>
              </div>
              <button className="flex items-center justify-center gap-2 first-letter:cursor-pointer bg-yellow-400 p-2 w-36 rounded-3xl text-xl text-black font-kanit active:outline-none focus:outline-none">
                Buy
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
