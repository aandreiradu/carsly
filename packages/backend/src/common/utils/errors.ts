import { NestError } from './types';

// export function isNestError(obj: any): obj is NestError {
//   return (
//     typeof obj === 'object' &&
//     'statusCode' in obj &&
//     'error' in obj &&
//     (typeof obj.statusCode === 'number' || obj.statusCode === undefined) &&
//     (typeof obj.error === 'string' || obj.error === undefined)
//   );
// }

export function isNestError(obj: any): obj is NestError {
  return (
    typeof obj === 'object' &&
    obj.response &&
    typeof obj.response.statusCode === 'number' &&
    typeof obj.response.error === 'string' &&
    typeof obj.response.message === 'string' &&
    (typeof obj.status === 'number' || obj.status === undefined)
  );
}
