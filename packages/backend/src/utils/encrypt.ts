// import crypto from 'crypto';

// const encrypt = (plainText, password) => {
//   try {
//     const iv = crypto.randomBytes(16);
//     const key = crypto
//       .createHash('sha256')
//       .update(password)
//       .digest('base64')
//       .substr(0, 32);
//     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

//     let encrypted = cipher.update(plainText);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default encrypt;

import { createCipheriv, randomBytes, createHash } from 'crypto';

const alg = 'aes-256-ctr';
let key = 'The Encryption Key';
key = createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

export const encryptData = (data) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(alg, key, iv);
  const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
  return result;
};
