import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  Field,
  NEXT_JSON,
  getFromLocal,
  saveInLocal,
} from "../../utils/general.utils";
import Select from "../../components/Select";

const DEFAULT_FIELD_INFO = {
  modelName: "",
  name: "",
  fieldType: "",
  required: "",
};
const FIELD_TYPES = [
  { label: "Date Time", value: "date_time" },
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Long Text", value: "long_text" },
];
function FieldRow(
  { name, fieldType, modelName, required }: FieldInfo,
  index: number
) {
  return (
    <li className="flex justify-between w-full">
      <span className="mr-5">{index + 1}.</span>
      <span className="font-bold mr-7 w-[3rem]">{name}</span>
      <span className="font-bold mr-7 w-[3rem]">{modelName}</span>
      <span className="mr-5">{fieldType}</span>
      <span className="mr-5">{required == "1" ? "Yes" : "No"}</span>
      <span className="underline text-secondary cursor-pointer">Edit</span>
    </li>
  );
}
type FieldInfo = {
  name: string;
  modelName: string;
  fieldType: string;
  required: string;
};
export default function start() {
  const router = useRouter();
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [fieldInfo, setFieldInfo] = useState<FieldInfo>(DEFAULT_FIELD_INFO);
  const [store, setStore] = useState<NEXT_JSON>();

  useEffect(() => {
    const store = getFromLocal();
    if (store) {
      setStore(store);
    }
  }, []);
  function addField() {
    setFields([...fields, fieldInfo]);
    setFieldInfo(DEFAULT_FIELD_INFO);
  }

  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    addField();
  }
  function onNext() {
    if (store) {
      const storeCopy = { ...store };
      storeCopy.models = storeCopy.models.map((model) => {
        model.fields = fields
          .filter((field) => field.modelName == model.name)
          .map((field) => {
            let fieldTemplate: Field = {
              name: field.name,
              required: field.required == "1",
              visibleOnList: true, //TODO:add to form
              type: field.fieldType,
            };

            return fieldTemplate;
          });
        return model;
      });
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
          <h1 className="text-[2rem] font-bold mt-7 text-secondary">
            Fields Setup
          </h1>


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

          <Input
            inputValue={"Add Field"}
            inputContainerClassName="w-full mt-10 cursor-pointer"
            inputType="submit"
          />
          <div className="flex justify-between w-full mt-[2rem]">
            <h1 className="text-[1.5rem] text-secondary font-bold mt-[4rem]">
              Fields
            </h1>
          </div>
          <ul className="flex justify-between w-full flex-col mb-[2rem]">
            {fields.map((field, i) => FieldRow(field, i))}
          </ul>
          <Button
            buttonClassName="self-end mt-[5rem]"
            onButtonClick={onNext}
            caption="Next"
          />
        </form>
      </div>
    </MainLayout>
  );
}
