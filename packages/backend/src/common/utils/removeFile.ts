import * as path from 'path';
import * as fs from 'fs';

export const removeFile = (fileName: string, filePath?: string) => {
  if (filePath) {
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log('Cannot remove file', filePath);
      return error;
    }
  }

  return fs.unlink(
    path.join(__dirname, '../..', './uploads', fileName),
    (err) => {
      if (err) {
        console.error(err);
        console.log(
          'Cannot remove file',
          path.join(__dirname, '../..', './uploads'),
        );
        return err;
      }
    },
  );
};
