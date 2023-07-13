import * as path from 'path';
import * as fs from 'fs';

export const removeFile = (fileName: string) => {
  console.log('sterge de aici', path.join(__dirname, '../uploads', fileName));
  fs.unlink(path.join(__dirname, '../..', './uploads', fileName), (err) => {
    if (err) {
      throw err;
    }
    console.log('file deletedddd');
  });
};
