import classNames from "classnames";

interface PageCoverProps {
  className?: string;
  name: string;
  coverImg: string;
  author?: string;
}

const PageCover: React.FC<PageCoverProps> = ({ className, coverImg, name, author }) => {
  return (
    <div className={classNames("relative h-full w-full flex justify-center items-center px-4", className)}>
       <div className="backdrop-brightness-50 backdrop-blur-sm absolute top-0 left-0 w-full h-full"/>
       <img src={coverImg} width="100%" height="100%" alt=""/>
       <h1 className="absolute text-8xl text-yellow-300 text-center z-10 uppercase">{name}</h1>
       <h3 className="absolute text-5xl text-secondary text-center z-10 translate-y-[10rem]">Translator: {author}</h3>
    </div>
  );
};

export default PageCover;
