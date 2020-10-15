export const parseList = (response: any) => {
  if (response.status !== 200) throw Error(response.message);
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response: any, code: number) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

export const parseItemString = (response: any, code: number) => {
  if (response.status !== code) throw Error(response.message);
  return response.data;
};