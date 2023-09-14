import { PolluationNormTypes, VehicleBodyType } from '@prisma/client';

export const transmissionTypesLabels = {
  fourByFourAutomatic: '4x4 (Automatic)',
  fourByFourManual: '4x4 (Manual)',
  rear: 'Rear',
  front: 'Front',
};

export let polluationNormTypesLabels = {};
Object.keys(PolluationNormTypes).forEach((norm) => {
  polluationNormTypesLabels = {
    ...polluationNormTypesLabels,
    [norm]: norm.replaceAll('_', ' '),
  };
});

export let vehicleBodyTypesLabels = {};
Object.keys(VehicleBodyType).forEach((norm) => {
  vehicleBodyTypesLabels = {
    ...vehicleBodyTypesLabels,
    [norm]: norm.replaceAll('_', ' '),
  };
});
