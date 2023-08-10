export const buildAdPageFormData = <T extends object>(data: T) => {
  const formData = new FormData();

  for (let i in data) {
    console.log(i, data[i]);
    if (typeof data[i] === 'object') {
      formData.append(i, (data[i] as any)?.value);
    } else if (typeof i === 'boolean') {
      formData.append(i, String(!!data[i]));
    } else if (typeof i === 'string') {
      formData.append(i, data[i] as string);
    } else if (typeof i === 'undefined') {
      formData.append(i, String(!!data[i]));
    }
  }

  console.log('formdata to return', formData);

  return formData;
};
