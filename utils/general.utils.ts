import { MAIN_PORT } from "../constants/general.constants";
import { FieldInfo } from "../pages/wizard/fields-setup";
var pluralize = require("pluralize");

const LOCAL_STORAGE_KEY = "NEXT_JSON_STORE";
export const CONFIG_FILE_PATH_KEY = "CONFIG_FILE_PATH_KEY";
export type GeneralObject = { [key: string]: any };
export type Field = {
  name: string;
  type: "text" | "number" | "date_time" | "long_text" | string;
  required: boolean;
  visibleOnList: boolean;
  isIdentifier?: boolean;
};
export type Model = {
  name: string;
  includeTimeStamps: boolean;
  belongsTo: string[];
  fields: Field[];
  operations: {
    CREATE: boolean;
    READ: boolean;
    UPDATE: boolean;
    DELETE: boolean;
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
export const DEFAULT_MODEL_INFO = {
  name: "",
  operations: { CREATE: true, READ: true, UPDATE: true, DELETE: true },
  fields: [],
  includeTimeStamps: true,
  belongsTo: [],
};

export function getStore(): NEXT_JSON | null {
  //TODO:rename to getStoreFromLocal
  try {
    const store = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (store) {
      return JSON.parse(store);
    } else {
      return DEFAULT_STORE;
    }
  } catch (error) {
    return null;
  }
}
export function clearStore() {
  localStorage.clear();
}
export function saveInLocal(store: NEXT_JSON) {
  //TODO:rename to setStoreInLocal
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

    //TODO: READ url and port from config file
    fetch(`http://localhost:${MAIN_PORT}/api/${path}`, obj)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

export function validateString(input: string): boolean {
  if (!input) return false;
  const regex: RegExp = /^[a-zA-Z0-9_\/]+$/;
  const sqlKeywords: string[] = [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "JOIN",
    "AND",
    "OR",
    "NOT",
    "IN",
    "LIKE",
  ];
  return (
    regex.test(input) &&
    !sqlKeywords.some((keyword) => input.toUpperCase() == keyword)
  );
}

export function getFieldsFromModels(models: Model[]) {
  let fields: FieldInfo[] = [];
  models.forEach((model) => {
    model.fields.forEach(
      ({ name, isIdentifier, required, visibleOnList, type }) => {
        fields.push({
          name,
          isIdentifier: isIdentifier ? "1" : "0",
          required: required ? "1" : "0",
          visibleOnList: visibleOnList ? "1" : "0",
          modelName: model.name,
          fieldType: type,
        });
      }
    );
  });
  return fields;
}

export function hasMainIdentifier(modelName: string, models: Model[]): boolean {
  return (
    models
      .find((model) => modelName == model.name)
      ?.fields.some((field) => field.isIdentifier) || false
  );
}

export function trimString(string: string, maxLength: number) {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string;
}
