import React, { ChangeEvent, FormEvent, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  Field,
  Model,
  getFromLocal,
  saveInLocal,
} from "../../utils/general.utils";

//type FieldInfo = { name: string; isAlias: boolean; type: string, visibleOnList:boolean };

const DEFAULT_MODEL_INFO = {
  name: "",
  operations: { create: true, read: true, update: true, delete: true },
  fields: [],
  includeTimeStamps: true,
  belongsTo: [],
};

function ModelRow({ name, fields, operations }: Model, index: number) {
  console.log(operations);
  return (
    <li className="flex justify-between w-full">
      <span className="mr-5">{index + 1}.</span>
      <span className="font-bold mr-7 w-[3rem]">{name}</span>
      <span className="mr-5">
        {Object.keys(operations)
          .map(
            (key: string) =>
              `${key}:${
                operations[key as keyof typeof operations] ? "Yes" : "No"
              }`
          )
          .join(",")}
      </span>
      <span className="underline text-secondary cursor-pointer">Edit</span>
    </li>
  );
}
export default function start() {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [modelInfo, setModelInfo] = useState<Model>(DEFAULT_MODEL_INFO);

  function addModel() {
    setModels([...models, modelInfo]);
    setModelInfo(DEFAULT_MODEL_INFO);
  }
  function onModelInputChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    setModelInfo({ ...modelInfo, [event.target.name]: event.target.value });
  }

  function handleModelCheckbox(event: ChangeEvent<HTMLInputElement>) {
    setModelInfo({
      ...modelInfo,
      operations: {
        ...modelInfo.operations,
        [event.target.name]: event.target.checked,
      },
    });
  }
  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    addModel();
  }
  function onNext() {
    let store = getFromLocal();
    if (store) {
      store.models = models;
      saveInLocal(store);
      router.push("/wizard/fields-setup");
    }
  }
  return (
    <MainLayout>
      <div className="flex text-white flex-col items-center min-h-[100vh] justify-start w-full">
        <form onSubmit={onSubmit}>
          <h1 className="text-[2rem] font-bold mt-7 text-secondary">
            Model Setup
          </h1>

          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputLabel="Model Name"
            inputName="name"
            inputValue={modelInfo.name}
            onInputChange={onModelInputChange}
            inputPlaceholder="Model Name"
          />
          <div className="flex justify-between w-full">
            <h1 className="text-[1.5rem] text-secondary font-bold mt-[4rem]">
              Operations
            </h1>
          </div>
          <div className="flex justify-between w-full">
            <Input
              inputContainerClassName="w-full mt-10 flex px-3"
              inputClassName="px-4 py-2 w-full text-[1.2rem]"
              labelClassName="font-bold"
              inputType="checkbox"
              checked={modelInfo.operations.create}
              inputName="create"
              onInputChange={handleModelCheckbox}
              inputLabel="Create"
            />
            <Input
              inputContainerClassName="w-full mt-10 flex px-3"
              inputClassName="px-4 py-2 w-full text-[1.2rem]"
              labelClassName="font-bold"
              inputType="checkbox"
              checked={modelInfo.operations.read}
              inputName="read"
              onInputChange={handleModelCheckbox}
              inputLabel="Read"
            />
            <Input
              inputContainerClassName="w-full mt-10 flex px-3"
              inputClassName="px-4 py-2 w-full text-[1.2rem]"
              labelClassName="font-bold"
              inputType="checkbox"
              checked={modelInfo.operations.update}
              inputName="update"
              onInputChange={handleModelCheckbox}
              inputLabel="Update"
            />
            <Input
              inputContainerClassName="w-full mt-10 flex px-3"
              inputClassName="px-4 py-2 w-full text-[1.2rem]"
              labelClassName="font-bold"
              inputType="checkbox"
              checked={modelInfo.operations.delete}
              inputName="delete"
              onInputChange={handleModelCheckbox}
              inputLabel="Delete"
            />
          </div>
          <Input
            inputValue={"Add Model"}
            inputContainerClassName="w-full mt-10 cursor-pointer"
            inputType="submit"
          />
          <div className="flex justify-between w-full mt-[2rem]">
            <h1 className="text-[1.5rem] text-secondary font-bold mt-[4rem]">
              Models
            </h1>
          </div>
          <ul className="flex justify-between w-full flex-col mb-[2rem]">
            {models.map((model, i) => ModelRow(model, i))}
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
