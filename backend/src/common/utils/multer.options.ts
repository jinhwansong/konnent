import { BadRequestException } from '@nestjs/common';
import multer from 'multer';
import path from 'path';

export const multerImage = {
  storage: multer.diskStorage({
    // 업로드 위치
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    // 파일명 조작
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 각 파일 당 2mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('지원하지 않는 이미지 형식입니다'), false);
    }
  },
};
