import * as path from 'path';
import * as fs from 'fs';

export const removeFile = (fileName: string, filePath?: string) => {
  if (filePath) {
    // fs.unlink(path.join(__dirname, '../..', './uploads', fileName), (err) => {
    //   if (err) {
    //     throw err;
    //   }
    // });

    try {
      fs.unlinkSync(path.join(__dirname, '../..', './uploads'));
    } catch (error) {
      throw error;
    }
  }

  return fs.unlink(
    path.join(__dirname, '../..', './uploads', fileName),
    (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    },
  );
};
