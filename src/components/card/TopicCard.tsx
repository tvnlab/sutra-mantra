import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "@app/components/card";
import { useRouter, useSearchParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { Routes } from "@app/utils/routes";

const TopicCard = (props: {
  id?: string;
  image: string | StaticImageData;
  title: string;
  author: string;
  bidders: Array<string|StaticImageData>;
  download?: string;
  extra?: string;
}) => {
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const { title, author, image, bidders, extra, id } = props;
  const [heart, setHeart] = useState(true);

  const handleStartTranscribing = (id?: string) => {
   
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('id', id);
    } else {
      params.delete('id');
    }
    navigate.push(`${Routes.TRANSCRIBING}?${params.toString()}`);
  };

  return (
    <Card
      extra={`flex flex-col w-[355px] h-[450px] !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <Image
            src={image}
            className="mb-3 h-full w-full rounded-md object-cover"
            style={{ aspectRatio: "321/228" }}
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute right-3 top-3 flex items-center justify-center rounded-md bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-md text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex flex-col items-start justify-start px-1">
          <div className="mb-2 h-full w-full">
            <p className="h-14 text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border border-white dark:!border-navy-800"
              >
                <Image
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                  width={32} 
                  height={32}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="linear rounded-md bg-gray-100 px-4 py-2 text-base font-medium text-orange-600 transition duration-200 hover:bg-brand-900 hover:text-white active:bg-brand-700 dark:bg-white dark:hover:bg-brand-400 dark:active:opacity-90">
            Learn More
          </button>
          <button
            className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={() => handleStartTranscribing(id)}
          >
            Start Transcribing
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
