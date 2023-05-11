import MainLayout from "../../components/Layouts/Main/main.layout";
import { Heart, Star } from "phosphor-react";

const categories = [
  "All Cars",
  "Electric",
  "Gasoline",
  "Hybrids",
  "Oldest",
  "Newest",
];

const Home = () => {
  return (
    <MainLayout>
      <section className="h-screen bg-red-400 flex items-center">
        <div className="h-full max-h-[700px] my-auto flex md:m-8 md:py-5 md:px-6 w-full">
          <div className="flex flex-col bg-green-400">
            <h1 className="mb-4 font-kanit text-xl md:text-4xl font-bold tracking-widest">
              Find your perfect car
            </h1>

            <div className="flex w-full space-x-4 overflow-hidden overflow-x-auto">
              {categories.map((cat) => (
                <p className="font-kanit text-lg bg-yellow-300 py-2 px-6 rounded-xl">
                  {cat}
                </p>
              ))}
            </div>

            <div className="p-4 relative mt-10 md:max-h-64 h-full w-full rounded-lg flex items-start justify-center flex-col">
              <img
                className="z-0 absolute top-0 left-0 w-full h-full object-cover items-center justify-center rounded-lg brightness-75"
                src={"./landing-1.jpg"}
              />

              <div className="z-10 text-white">
                <h2 className="font-kanit text-3xl">Top Safety Pick</h2>
                <p className="pt-3 font-kanit text-base capitalize">
                  Awarded the most 2021 <br />{" "}
                  <span className="text-sm uppercase">
                    IIHS TOP SAFETY PICK
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-purple-500 mt-4 flex items-center space-x-3 max-w-xl overflow-hidden overflow-x-auto">
              {categories.map((_) => (
                <div className="flex flex-col flex-shrink-0 relative w-44 h-64 bg-slate-500 rounded-lg">
                  <span className="absolute top-2 left-2 p-1 bg-gray-500 rounded-lg">
                    <Heart className="h-5 w-6" />
                  </span>

                  <img
                    className=" rounded-lg h-full w-full bg-cover bg-center max-h-[70%]"
                    src={"./landing-2.jpg"}
                  />

                  <div className="px-1 py-1">
                    <p className="text-sm">Mercedes Benz E300 4matic +</p>
                    <div className="flex justify-between items-center">
                      <span>petrol</span>
                      <div className="flex items-center">
                        <Star />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
