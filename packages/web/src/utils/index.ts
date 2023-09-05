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
  return formData;
};

type QuerySearchObj = {
  value: string;
  label: string;
};

export const buildQuerySearchAd = <T extends object>(data: T): string => {
  const querySearch = new URLSearchParams();
  for (const key in data) {
    console.log({
      key,
      value: data[key],
      tok: typeof key,
      tov: typeof data[key],
    });
    if (data[key]) {
      if (typeof data[key] == 'object') {
        querySearch.set(key, (data[key] as QuerySearchObj).value);
      } else {
        querySearch.set(key, data[key] as string);
      }
    }
  }
  return querySearch.toString();
};
