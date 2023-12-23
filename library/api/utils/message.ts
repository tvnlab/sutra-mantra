import { HttpStatusCode } from "@library/api/utils/constants";

interface MessageLog {
  success: {
    createdMessage: (model: string) => void;
    updatedMessage: (model: string) => void;
    deletedMessage: (model: string) => void;
  };
  error: {
    [key: string]: any;
  };
}

const message: MessageLog = {
  success: {
    createdMessage: (model: string) => `${model} created successfully`,
    updatedMessage: (model: string) => `${model} updated successfully`,
    deletedMessage: (model: string) => `${model} deleted successfully`,
  },
  error: {
    [HttpStatusCode.InternalServerError]: "Internal Server Error",
    [HttpStatusCode.MethodNotAllowed]: "Method Not Allowed",
    [HttpStatusCode.NotFound]: (model: string) => `${model} Not Found`,
    require: (model: string) => `${model} is not empty`,
  },
};

export default message;
