import { cloneDeep } from "lodash";

export const omitProperties = async (object: any, keys: Array<string>) => {
  return new Promise((resolve) => {
    const data = cloneDeep(object);
    keys.forEach((k, i) => {
      delete data[k];

      if (i === keys.length - 1) resolve(data);
    });
  });
};
