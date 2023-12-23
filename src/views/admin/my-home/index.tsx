import Banner from "./components/Banner";
// import avatar1 from "@app/assets/img/avatars/avatar1.png";
// import avatar2 from "@app/assets/img/avatars/avatar2.png";
// import avatar3 from "@app/assets/img/avatars/avatar3.png";

import TopicCard from "@app/components/card/TopicCard";
// import topicData from "@app/variables/topicData";

const MyHomes = () => {
  return (
    <div className="col-span-1 mt-3 h-fit w-full xl:col-span-1 2xl:col-span-2">
      {/* Discover Banner */}
      <Banner />

      {/* NFt Header */}
      <h4 className="my-4 ml-1 text-2xl font-bold text-navy-700 dark:text-white">
        Popular Topics
      </h4>

      {/* NFTs trending card */}
      <div className="z-20 flex flex-wrap gap-5">
        {/* {topicData.map((item, index) => (
          <TopicCard
            id={item.id}
            key={index}
            bidders={[avatar1, avatar2, avatar3]}
            title={item.title}
            author={item.author}
            image={item.image}
          />
        ))} */}
      </div>
    </div>
  );
};

export default MyHomes;
