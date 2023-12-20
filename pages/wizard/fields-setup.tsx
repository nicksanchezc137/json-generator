import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  Field,
  GeneralObject,
  Model,
  NEXT_JSON,
  getFieldsFromModels,
  getStore,
  hasMainIdentifier,
  saveInLocal,
  validateString,
} from "../../utils/general.utils";
import Select from "../../components/Select";

const DEFAULT_FIELD_INFO = {
  modelName: "",
  name: "",
  fieldType: "",
  required: "",
  isIdentifier: "",
  visibleOnList: "",
};
const FIELD_TYPES = [
  { label: "Date Time", value: "date_time" },
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Long Text", value: "long_text" },
];
const IS_IDENTIFIER = {
  yes: "1",
  no: "0",
};
function FieldRow(
  { name, fieldType, modelName, required }: FieldInfo,
  index: number,
  onEditClick: MouseEventHandler<HTMLSpanElement>
) {
  return (
    <li className="flex items-start  w-full text-secondary">
      <span className="mr-5 w-[1rem]">{index + 1}.</span>
      <span className="font-bold mr-7 w-[5rem] text-left">{name}</span>
      <span className="font-bold mr-7 w-[5rem]">{modelName}</span>
      <span className="mr-5 w-[4rem]">{fieldType}</span>
      <span className="mr-5 w-[4rem]">{required == "1" ? "Yes" : "No"}</span>
      <span
        className="underline text-secondary cursor-pointer w-[4rem]"
        onClick={onEditClick}
      >
        Edit
      </span>
    </li>
  );
}
function FieldHeader() {
  return (
    <li className="flex items-start w-full text-secondary">
      <span className="mr-5 w-[1rem]">#</span>
      <span className="font-bold mr-7 w-[5rem]">Name</span>
      <span className="font-bold mr-7 w-[5rem]">Model</span>
      <span className="mr-5 w-[4rem]">Type</span>
      <span className="mr-5 w-[4rem]">Required</span>
      <span className="underline text-secondary cursor-pointer w-[4rem]">
        Action
      </span>
    </li>
  );
}
export type FieldInfo = {
  name: string;
  modelName: string;
  fieldType: string;
  required: string;
  isIdentifier: string;
  visibleOnList: string;
};
export default function start() {
  const router = useRouter();
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [fieldInfo, setFieldInfo] = useState<FieldInfo>(DEFAULT_FIELD_INFO);
  const [store, setStore] = useState<NEXT_JSON>();
  const [containsError, setContainsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedModelIndex, setEditedModelIndex] = useState(0);
  const [showIsIdentifierField, setShowIsIdentifierField] = useState(true);

  useEffect(() => {
    const store = getStore();
    if (store) {
      setStore(store);
      const fields = getFieldsFromModels(store.models);
      setFields(fields);
    }
  }, []);
  function addField() {
    if (isEdit) {
      let editedFields = fields.map((field, i) => {
        let editedField = field;
        if (editedModelIndex == i) {
          editedField = fieldInfo;
        }
        return editedField;
      });
      setFields(editedFields);
    } else {
      setFields([...fields, fieldInfo]);
    }
    setFieldInfo(DEFAULT_FIELD_INFO);
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (isEdit && fieldInfo.isIdentifier == IS_IDENTIFIER.yes) {
      setShowIsIdentifierField(true);
    } else if (
      (isEdit && !fieldInfo.isIdentifier) ||
      fieldInfo.isIdentifier == IS_IDENTIFIER.no
    ) {
      setShowIsIdentifierField(false);
    } else {
      setShowIsIdentifierField(
        !hasMainIdentifier(fieldInfo.modelName, store?.models || [])
      );
    }
  }, [fieldInfo.modelName, fieldInfo.name]);

  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    if (!validateValues()) {
      setContainsError(true);
      scrollToTop();
      return;
    } else {
      setContainsError(false);
    }
    addField();
  }
  function validateValues() {
    let isValid = true;
    let formObj: GeneralObject = fieldInfo || {};
    Object.keys(formObj).forEach((key) => {
      if (!validateString(formObj[key])) {
        isValid = false;
      }
    });

    return isValid;
  }
  function modelHasIdentifier(model: Model, models: Model[]) {
    let hasIdentifier = false;
    model.fields.forEach((field) => {
      if (hasMainIdentifier(model.name, models)) {
        hasIdentifier = true;
      }
    });
    return hasIdentifier;
  }
  function validateHasIdentifier(models: Model[]) {
    let invalidModelNames: string[] = [];
    models.forEach((model) => {
      if (!modelHasIdentifier(model, models)) {
        invalidModelNames.push(model.name);
      }
    });
    return invalidModelNames;
  }
  function onNext(formEvent: FormEvent) {
    formEvent.preventDefault();
    if (!fields.length) {
      alert("Fields missing.");
    }

    if (store) {
      const storeCopy = { ...store };
      storeCopy.models = storeCopy.models.map((model) => {
        model.fields = fields
          .filter((field) => field.modelName == model.name)
          .map((field) => {
            let fieldTemplate: Field = {
              name: field.name,
              required: field.required == "1",
              visibleOnList: field.visibleOnList == "1", //TODO:add to form
              type: field.fieldType,
              isIdentifier: field.isIdentifier == IS_IDENTIFIER.yes,
            };

            return fieldTemplate;
          });
        return model;
      });
      let invalidModelNames = validateHasIdentifier(storeCopy.models);
      if (invalidModelNames.length) {
        alert(
          `Missing main identifier(s) for the model(s) ${invalidModelNames.join(
            ","
          )}.`
        );
        return;
      }
      saveInLocal(storeCopy);
      router.push("/wizard/relationships");
    }
  }
  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFieldInfo({ ...fieldInfo, [event.target.name]: event.target.value });
  };
  return (
    <MainLayout>
      <div className="flex text-white flex-col items-center min-h-[100vh] justify-start w-full">
        <form onSubmit={onSubmit}>
          <div className="bg-gray_x p-7">
            <h1 className="text-[1.5rem] font-bold mt-7 text-secondary">
              Fields Setup
            </h1>
            {containsError ? (
              <h4 className="text-red w-[22rem]">
                Input contains spaces, non-alphanumeric characters (except
                underscores), starts with a number, or includes SQL keywords.
              </h4>
            ) : null}

            <Select
              labelClassName="font-bold"
              selectContainerClassName="w-full mt-10"
              selectClassName="px-4 py-2 w-full text-[1.2rem]"
              label="Model"
              selectValue={fieldInfo.modelName}
              onSelectChange={handleChange}
              selectName="modelName"
              options={
                store?.models.map(({ name }) => {
                  return { label: name, value: name };
                }) || []
              }
            />

            <Input
              inputContainerClassName="w-full mt-10"
              inputClassName="px-4 py-2 w-full text-[1.2rem]"
              labelClassName="font-bold"
              inputLabel="Field Name"
              inputName="name"
              inputValue={fieldInfo.name}
              onInputChange={handleChange}
              inputPlaceholder="Field Name"
            />

            <Select
              labelClassName="font-bold"
              selectContainerClassName="w-full mt-10"
              selectClassName="px-4 py-2 w-full text-[1.2rem]"
              label="Field Type"
              selectValue={fieldInfo.fieldType}
              onSelectChange={handleChange}
              selectName="fieldType"
              options={FIELD_TYPES}
            />
            <Select
              labelClassName="font-bold"
              selectContainerClassName="w-full mt-10"
              selectClassName="px-4 py-2 w-full text-[1.2rem]"
              label="Required"
              selectValue={fieldInfo.required}
              onSelectChange={handleChange}
              selectName="required"
              options={[
                { label: "Required", value: "1" },
                { label: "Not Required", value: "0" },
              ]}
            />

            {showIsIdentifierField ? (
              <Select
                labelClassName="font-bold"
                selectContainerClassName="w-full mt-10"
                selectClassName="px-4 py-2 w-full text-[1.2rem]"
                label="Is Identifier"
                selectValue={fieldInfo.isIdentifier}
                onSelectChange={handleChange}
                selectName="isIdentifier"
                options={[
                  { label: "Yes", value: IS_IDENTIFIER.yes },
                  { label: "No", value: IS_IDENTIFIER.no },
                ]}
              />
            ) : null}
            <Select
              labelClassName="font-bold"
              selectContainerClassName="w-full mt-10"
              selectClassName="px-4 py-2 w-full text-[1.2rem]"
              label="Visible on list"
              selectValue={fieldInfo.visibleOnList}
              onSelectChange={handleChange}
              selectName="visibleOnList"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />

            <Input
              inputValue={"Save Field"}
              inputContainerClassName="w-full mt-10 cursor-pointer"
              inputType="submit"
            />
          </div>
          <div className="bg-gray_x p-7 mt-[2rem]">
            <div className="flex justify-between w-full">
              <h1 className="text-[1.2rem] text-secondary font-bold">Fields</h1>
            </div>
            <ul className="flex justify-between w-full flex-col mb-[2rem] min-w-[32rem]">
              {FieldHeader()}
              {fields.map((field, i) =>
                FieldRow(field, i, () => {
                  setIsEdit(true);
                  setEditedModelIndex(i);
                  setFieldInfo(
                    fields.find((field, index) => index == i) ||
                      DEFAULT_FIELD_INFO
                  );
                })
              )}
            </ul>
            <Button
              buttonClassName="self-end mt-[5rem]"
              onButtonClick={onNext}
              caption="Next"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
