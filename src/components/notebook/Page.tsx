import { ReactNode } from "react";
import classNames from "classnames";

interface PageProps {
  children?: ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        `user-select-none absolute h-full w-full touch-none overflow-y-auto overflow-x-hidden`,
        className
      )}
      style={{ backgroundImage: "url(/page-textures/page1.png)" }}
    >
      <div className="absolute left-0 top-0 z-0 h-full w-full px-8 py-6 text-2xl">
        {children}
      </div>
    </div>
  );
};

export default Page;
