import * as path from 'path';
import * as fs from 'fs';

export const removeFile = (fileName: string, filePath?: string) => {
  console.log('remove fiel args', fileName);
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

  console.log('sterge de aici', path.join(__dirname, '../uploads', fileName));
  return fs.unlink(
    path.join(__dirname, '../..', './uploads', fileName),
    (err) => {
      if (err) {
        console.log('eroare', err);
        throw err;
      }
      console.log('file deletedddd');
    },
  );
};
