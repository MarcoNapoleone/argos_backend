import util from "util";
import Multer from "multer";

const maxSize = 50 * 1024 * 1024;

const processFileMulter = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  }
}).single("file");

export const processFile = util.promisify(processFileMulter);



