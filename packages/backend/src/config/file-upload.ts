import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Request } from 'express';

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

    !_req.filesPaths?.length
      ? (_req.filesPaths = [fileName])
      : _req.filesPaths.push(fileName);

    cb(null, fileName);
  },
};

export const fileFilter = (req: Request, file, callback) => {
  const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg'];
  if (
    !acceptableExtensions.some(
      (extension) =>
        path.extname(file.originalname).toLowerCase() === `.${extension}`,
    )
  ) {
    return callback(
      new BadRequestException(
        `Extension not allowed. Allowed extensions: ${acceptableExtensions.join(
          ',',
        )}`,
      ),
    );
  }

  // if (req?.method === 'POST' && req.url === '/api/ad') {
  //   console.log('timestamp1', new Date().toISOString());
  //   const newBody = createAdMapFormData(req.body);
  //   console.log('new body', newBody);
  // }

  callback(null, true);
};
