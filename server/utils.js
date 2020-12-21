import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import fs from "fs/promises";

export const UPLOAD_DIRECTORY = "./uploads";

const checkIfDirectoryExists = async () => {
  try {
    await fs.stat(UPLOAD_DIRECTORY);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(UPLOAD_DIRECTORY);
    }
  }
};

const storage = multer.diskStorage({
  async destination(req, file, callback) {
    try {
      await checkIfDirectoryExists();
      callback(null, UPLOAD_DIRECTORY);
    } catch (err) {
      callback(err);
    }
  },

  async filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${v4()}${fileExtension}`;
    callback(null, fileName);
  },
});

export const uploader = multer({ storage });

export const getUploadedFiles = async () => {
  return await fs.readdir(UPLOAD_DIRECTORY);
};

export const findUploadedFile = async (fileName) => {
  const info = await fs.stat(path.resolve(UPLOAD_DIRECTORY, fileName));
  return info;
};
