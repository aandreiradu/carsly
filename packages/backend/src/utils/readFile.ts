import * as path from 'path';
import * as fs from 'fs/promises';

export const readFileUtf8 = async <T>(filePath: string) => {
  const rawData = await fs.readFile(path.join(filePath), {
    encoding: 'utf-8',
  });
  const parsedData: T = JSON.parse(rawData);

  return parsedData;
};
