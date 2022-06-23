import { Options, diskStorage } from "multer";
import { resolve } from "path";

export const uploadConfig = {
  dest: resolve(__dirname, "..", "..", "book_uri"),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, "public/books");
    },
    filename: (request, file, callback) => {
      const ext = file.mimetype.split("/")[1];
      callback(null, `book-${request.user.id}-${Date.now()}.${ext}`);
    },
  }),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
  fileFilter: (request, file, callback) => {
    const formats = [
      "application/pdf",
      "application/x-pdf",
      "application/acrobat",
      "applications/vnd.pdf",
      "application/x-download",
      "application/download",
      "text/pdf",
      "text/x-pdf",
    ];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Format not accepted"));
    }
  },
} as Options;
