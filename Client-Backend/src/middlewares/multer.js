import multer from "multer";

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("file");

export const multipleUpload = multer({ storage }).array("files", 5);

export default singleUpload;
