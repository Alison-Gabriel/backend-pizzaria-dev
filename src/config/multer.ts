import multer from "multer";

export default {
  storage: multer.memoryStorage(),
  limit: {
    fileSizes: 4 * 1024 * 1024,
  },
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Unexpected file type, please try one of this: PNG, JPEG or JPG"
      )
    );
  },
};
