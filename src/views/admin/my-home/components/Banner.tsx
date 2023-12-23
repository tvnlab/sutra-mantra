
const Banner = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-md bg-gradient-to-r from-orange-600 to-yellow-600 bg-cover px-[30px] py-[30px] md:flex-row-reverse md:px-[40px] md:py-[40px] xl:flex-col 2xl:flex-row-reverse">
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:max-w-[55%] md:text-3xl md:leading-[42px]">
          Embark on a Journey of Mindfulness and Discovery
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:max-w-[75%]">
          Immerse yourself in the world of mindfulness. Explore the path to
          inner peace and start your meditation journey today!
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button className="text-black linear rounded-md bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Get Started
          </button>
          <button className="text-base font-medium text-white hover:underline 2xl:ml-2">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
