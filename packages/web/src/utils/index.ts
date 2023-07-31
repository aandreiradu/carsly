export const buildAdPageFormData = <T extends object>(data: T) => {
  const formData = new FormData();

  for (let i in data) {
    console.log(i, data[i]);
    if (typeof data[i] === 'object') {
      console.log('e object ', i);
      formData.append(i, (data[i] as any)?.name);
    } else if (typeof i === 'boolean') {
      formData.append(i, String(!!data[i]));
    } else if (typeof i === 'string') {
      formData.append(i, data[i] as string);
    } else if (typeof i === 'undefined') {
      formData.append(i, String(!!data[i]));
    }
  }

  return formData;
};
