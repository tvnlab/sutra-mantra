import React from "react";
import Dropdown from "@app/components/dropdown";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit, FiPlus } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

export enum CardMenuAction {
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
}

interface CardMenuProps {
  transparent?: boolean;
  item?: any;
  onActionClick?: (action: CardMenuAction) => void;
}

const CardMenu: React.FC<CardMenuProps> = (props) => {
  const { transparent, onActionClick } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
    >
      <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <p
          onClick={() => onActionClick(CardMenuAction.ADD)}
          className="hover:text-primary mb-4 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
        >
          <span>
            <FiPlus />
          </span>
          Add New
        </p>
        <p
          onClick={() => onActionClick(CardMenuAction.UPDATE)}
          className="hover:text-primary mb-4 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
        >
          <span>
            <FiEdit />
          </span>
          Update
        </p>
        <p
          onClick={() => onActionClick(CardMenuAction.DELETE)}
          className="hover:text-primary flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
        >
          <span>
            <AiFillDelete />
          </span>
          Delete
        </p>
      </div>
    </Dropdown>
  );
};

export default CardMenu;
