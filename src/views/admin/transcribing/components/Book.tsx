import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState } from "react";
import Page from "./Page";
import PageCover from "./PageCover";
interface BookProps {
  name: string;
  coverImage: string;
  author?: string;
}

const Book: React.FC<BookProps> = ({ name, coverImage, author }) => {
  const [selected, setSelected] = useState(0);

  const onBack = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const onNext = () => {
    setSelected((selected) => Math.min(selected + 1, 2));
  };

  return (
    <div>
      <div style={{ width: 964, height: 1368 }}>
        <FlippingPages
          direction="right-to-left"
          onSwipeEnd={setSelected}
          selected={selected}
        >
          <PageCover name={name} coverImg={coverImage} author={author} />
          <Page>Page 1</Page>
          <Page>Page 2</Page>
          <Page>Page 3</Page>
          <Page>Page 4</Page>
        </FlippingPages>
      </div>
      <button
        onClick={onBack}
        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
      >
        Next
      </button>
    </div>
  );
};

export default Book;
