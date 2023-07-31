import { TransmissionTypes } from '../pages/SellNow/types';

export const convertToEnumKey = (userReadableFormat: TransmissionTypes) => {
  switch (userReadableFormat) {
    case TransmissionTypes.fourByFourAutomatic:
      return 'fourByFourAutomatic';
    case TransmissionTypes.fourByFourManual:
      return 'fourByFourManual';
    case TransmissionTypes.rear:
      return 'rear';
    case TransmissionTypes.front:
      return 'front';
    default:
      // Handle invalid data or throw an error
      break;
  }
};
