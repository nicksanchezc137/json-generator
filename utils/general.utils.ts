const LOCAL_STORAGE_KEY = "NEXT_JSON_STORE";
export const CONFIG_FILE_PATH_KEY = "CONFIG_FILE_PATH_KEY";
export type GeneralObject = { [key: string]: any };
export type Field = {
  name: string;
  type: "text" | "number" | "date_time" | "long_text" | string;
  required: boolean;
  visibleOnList: boolean;
};
export type Model = {
  name: string;
  includeTimeStamps: boolean;
  belongsTo: string[];
  fields: Field[];
  operations: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
};
export type NEXT_JSON = {
  projectName: string;
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  dropTables: true;
  models: Model[];
};
export const DEFAULT_STORE: NEXT_JSON = {
  projectName: "",
  db: {
    host: "",
    user: "",
    password: "",
    database: "",
  },
  dropTables: true,
  models: [],
};

export function getFromLocal(): NEXT_JSON | null {//TODO:rename to getStoreFromLocal
  try {
    const store = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (store) {
      return JSON.parse(store);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
export function saveInLocal(store: NEXT_JSON) {//TODO:rename to setStoreInLocal
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

type GenericObject = { [key: string]: any };
export function handleRequest(
  path: string,
  requestType: string,
  body: GenericObject
) {
  return new Promise((resolve, reject) => {
    let obj: GenericObject = {
      method: requestType,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (obj.method == "GET") {
      delete obj.body;
    }

    //TODO: read url and port from config file
    fetch(`http://localhost:3000/api/${path}`, obj)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}
