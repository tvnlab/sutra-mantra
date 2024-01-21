import classNames from "classnames";
import TextAreaField from "@app/components/fields/TextAreaField";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { ReactNode, useState } from "react";
import Toolbar from "./Toolbar";
import { ITopic } from "@library/api/dto/topic.dto";

const NOTEBOOK_WIDTH = 964;
// const NOTEBOOK_HEIGHT = 1368;

interface NotebookProps {
  className?: string;
  children?: ReactNode;
  progress?: number;
  progressLabel?: string;
  topic: ITopic;
}

const Notebook: React.FC<NotebookProps> = ({
  className,
  children,
  progress = 0,
  progressLabel,
  topic,
}) => {
  
  const [selected, setSelected] = useState(0);

  const onBack = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const onNext = () => {
    setSelected((selected) => Math.min(selected + 1, 2));
  };

  const onChange = (value: string)=>{

  }

  return (
    <div className={classNames("relative w-full", className)}>
      <div className="flex flex-col items-center justify-center">
        {topic.title && <h1 className="mb-4 text-primary text-3xl text-center">{topic.title}</h1>}
        <Toolbar
          className="mb-4"
          maxWidth={NOTEBOOK_WIDTH}
          progress={progress}
          progressLabel={progressLabel}
          onBack={onBack}
          onNext={onNext}
        />
        <FlippingPages
          direction="right-to-left"
          onSwipeEnd={setSelected}
          selected={selected}
          containerProps={{
            style: {
              width: NOTEBOOK_WIDTH,
              height: "calc(100vh - 320px)",
            },
          }}
        >
          {children}
        </FlippingPages>

        <TextAreaField
          variant="auth"
          extra={`absolute -bottom-24 w-full mx-auto max-w-[964px]`}
          label=""
          placeholder="Enter your sentences here..."
          id="sentence"
          cols={20}
          rows={3}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Notebook;
