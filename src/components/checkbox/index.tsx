import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { ReactNode } from "react";
import tailwindConfig from "../../../tailwind.config";

const getColors = tailwindConfig.theme.colors as any;
const colors = getColors();

interface CheckboxProps {
  children?: ReactNode;
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({ children, ...rest }) => {
  return (
    <ChakraCheckbox
      {...rest}
      __css={{
        display: "flex",
        cursor: 'pointer',
        ".chakra-checkbox__control": {
          border: `1px solid rgb(255 255 255 / 0.1)`,
          backgroundColor: "transparent",
          width: 6,
          height: 6,
          borderRadius: 4,
          svg: {
            color: colors["primary"],
            fontSize: 12,
          },
        },
      }}
    >
      <p className="text-sm font-medium text-navy-700 dark:text-white">
        {children}
      </p>
    </ChakraCheckbox>
  );
};

export default Checkbox;
