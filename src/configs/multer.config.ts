import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';

const MAX_SIZE_IMAGE = Number(process.env.MAX_SIZE_IMAGE) || 10;

export const multerConfig: multer.Options = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE_IMAGE * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new BadRequestException('Only image files are allowed'));
    }
    cb(null, true);
  },
};
