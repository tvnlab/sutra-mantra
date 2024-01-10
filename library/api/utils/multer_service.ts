import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser
  },
};

const uploadMiddleware = upload.single("file");

export default uploadMiddleware;
