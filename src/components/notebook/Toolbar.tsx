import classNames from "classnames";
import Progress from "@app/components/progress";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface ToolbarProps {
  maxWidth?: number;
  progress?: number;
  progressLabel?: string;
  className?: string;
  onBack?: () => void;
  onNext?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBack,
  onNext,
  progress,
  progressLabel,
  maxWidth,
  className,
}) => {
  return (
    <div
      className={classNames("flex w-full items-center gap-4", className)}
      style={{
        maxWidth,
      }}
    >
      <button
        onClick={onBack}
        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
      >
        <MdNavigateBefore />
      </button>
      <Progress width="w-full" value={progress} />
      <button
        onClick={onNext}
        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
      >
        <MdNavigateNext />
      </button>
      <span className="absolute left-[47.5%] text-white">{progressLabel}</span>
    </div>
  );
};

export default Toolbar;
