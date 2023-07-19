export const buildAdPageFormData = <T>(data: T) => {
  const formData = new FormData();

  for (let i in data) {
    if (typeof i === 'boolean') {
      formData.append(i, String(!!data[i]));
    } else if (typeof i === 'string') {
      formData.append(i, data[i] as string);
    } else if (typeof i === 'undefined') {
      formData.append(i, data[i]);
    }
  }

  return formData;
};
