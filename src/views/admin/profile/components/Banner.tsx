import avatar from "@app/assets/img/avatars/avatar11.png";
import banner from "@app/assets/img/profile/banner.png";
import Card from "@app/components/card";
import useAuthStore from "@app/hooks/stores/useAuthStore";
// import { Avatar } from "@chakra-ui/react";

const Banner = () => {
  const { user } = useAuthStore();

  const getAnonymousName = () => {
    const inputString = user?.displayName;

    if (!user?.isAnonymous) return inputString;

    const regexPattern = /^(.).*(.{5})$/;

    const matchResult = inputString.match(regexPattern);
    if (matchResult) {
      const firstCharacter = matchResult[1];
      const lastFiveCharacters = matchResult[2];

      const resultString = firstCharacter + lastFiveCharacters;
      return resultString;
    }
  };

  const displayName = getAnonymousName();

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
          {/* <Avatar name={user?.displayName || ''} src='https://bit.ly/tioluwani-kolawole' /> */}
          {displayName?.charAt(0) + displayName?.charAt(displayName?.length - 1)}
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {displayName}
        </h4>
        <p className="text-base font-normal text-gray-600 capitalize">{user?.role.toLowerCase()}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Completed Topics</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">In-Progress Topics</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
