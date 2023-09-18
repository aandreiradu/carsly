import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  randomBytes,
  createDecipheriv,
  createCipheriv,
  createHash,
} from 'crypto';

@Injectable()
export class CryptoService {
  decrypt = (encryptedText, password) => {
    try {
      const textParts = encryptedText.split(':');
      const iv = Buffer.from(textParts.shift(), 'hex');

      const encryptedData = Buffer.from(textParts.join(':'), 'hex');
      const key = createHash('sha256')
        .update(password)
        .digest('base64')
        .substr(0, 32);
      const decipher = createDecipheriv('aes-256-cbc', key, iv);

      const decrypted = decipher.update(encryptedData);
      const decryptedText = Buffer.concat([decrypted, decipher.final()]);
      return decryptedText.toString();
    } catch (error) {
      console.log(error);
    }
  };

  encrypt = (plainText, password) => {
    try {
      const iv = randomBytes(16);
      const key = createHash('sha256')
        .update(password)
        .digest('base64')
        .substr(0, 32);
      const cipher = createCipheriv('aes-256-cbc', key, iv);

      let encrypted = cipher.update(plainText);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
      console.log(error);
    }
  };

  generateRandomBytes = (): string => {
    try {
      const bytes = randomBytes(128).toString('hex');

      return bytes;
    } catch (error) {
      console.log('error generateRandomBytes', error);
      throw new InternalServerErrorException();
    }
  };
}
