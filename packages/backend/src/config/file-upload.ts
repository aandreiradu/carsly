import { ForbiddenException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export const storage = {
  destination: async (_req, _file, cb) => {
    try {
      fs.accessSync(
        path.join(__dirname, '..', '../uploads'),
        fs.constants.F_OK,
      );
      cb(null, path.join(__dirname, '..', '../uploads'));
    } catch (error) {
      await fs.mkdirSync(path.join(__dirname, '..', '../uploads'));
      cb(null, path.join(__dirname, '..', '../uploads'));
    }
  },
  filename: (_req, file, cb) => {
    const fileName =
      _req?.user?.sub +
      '-' +
      file.fieldname +
      '-' +
      Date.now() +
      path.extname(file.originalname);
    _req.fileInsert = true;
    cb(null, fileName);
  },
};

export const fileFilter = (_req, file, callback) => {
  const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg'];
  if (
    !acceptableExtensions.some(
      (extension) =>
        path.extname(file.originalname).toLowerCase() === `.${extension}`,
    )
  ) {
    return callback(
      new ForbiddenException(
        `Extension not allowed, accepted extensions are ${acceptableExtensions.join(
          ',',
        )}`,
      ),
    );
  }
  callback(null, true);
};
