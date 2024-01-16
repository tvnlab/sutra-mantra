import { HttpStatusCode } from "@library/api/utils/constants";

interface MessageLog {
  success: {
    createdMessage: (model: string) => void;
    updatedMessage: (model: string) => void;
    deletedMessage: (model: string) => void;
    registerSuccess: string;
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
    registerSuccess: "User registered successfully",
  },
  error: {
    [HttpStatusCode.InternalServerError]: "Internal Server Error",
    [HttpStatusCode.MethodNotAllowed]: "Method Not Allowed",
    [HttpStatusCode.Unauthorized]: "Invalid credential",
    [HttpStatusCode.NotFound]: (model: string) => `${model} Not Found`,
    require: (model: string) => `${model} is not empty`,
    existing: (model: string) => `${model} already exists`,
    expired: (model: string) => `${model} has expired`,
    invalid: (model: string) => `Invalid ${model}"`,
    noToken: "Token is not provided",
  },
};

export default message;
