import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "@app/assets/img/profile/image1.png";
import Card from "@app/components/card";

const ProjectItem = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <div className="flex items-center">
        <div className="">
          {/* <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" /> */}
        </div>
        <div className="ml-4">
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Technology behind the Blockchain
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Project #1 .
            <a
              className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              href=" "
            >
              See product details
            </a>
          </p>
        </div>
      </div>
      <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white hover:cursor-pointer">
        <MdModeEditOutline />
      </div>
    </div>
  );
};

const Project = () => {
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Topics
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can find more details about your topics for the Sutra Mantra. Keep you user
          engaged by providing meaningful information.
        </p>
      </div>
      {/* Project 1 */}
      <ProjectItem />
    </Card>
  );
};

export default Project;
