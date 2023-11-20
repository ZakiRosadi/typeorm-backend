import { Request, Response, NextFunction } from "express";
import multer = require("multer");
import path = require("path");


const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage })

const uploadFile = (fieldname) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return upload.single(fieldname)(req, res, (error) => {
      if (error) {
        console.log(error);

        return res.status(404).json({
          message: error
        })

      }

      return next()
    })
  }
}


export default uploadFile;
