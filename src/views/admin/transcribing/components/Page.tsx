import { ReactNode } from "react";
import classNames from "classnames";
// import pageTexture1 from "@app/assets/img/page-textures/page1.png";

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "user-select-none absolute h-full w-full touch-none bg-white",
        className
      )}
    >
      {/* <img
        className="absolute left-0 top-0"
        src={pageTexture1}
        width="100%"
        height="100%"
        alt=""
        style={{objectFit: 'cover', objectPosition: 'center'}}
      /> */}
      {children}
    </div>
  );
};

export default Page;
