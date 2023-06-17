type AdSectionHeader = {
  title: string;
};

const AdSectionHeader = ({ title }: AdSectionHeader) => {
  return (
    <h3 className="inline-block my-4 relative text-xl font-bold /*py-2*/ tracking-wide lg:my-4 lg:text-xl /*lg:py-4*/ after:absolute after:-bottom-1 after:h-[2px] after:bg-black/40 after:w-3/6 after:hover:w-4/5 after:transition-all after:duration-300  after:right-0 after:left-0 after:mx-auto after:my-0">
      {title}
    </h3>
  );
};

export default AdSectionHeader;
