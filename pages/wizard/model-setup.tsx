import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useState,
} from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  DEFAULT_MODEL_INFO,
  Field,
  GeneralObject,
  Model,
  getFromLocal,
  saveInLocal,
  validateString,
} from "../../utils/general.utils";

function ModelRow(
  { name, fields, operations }: Model,
  index: number,
  onEditClick: MouseEventHandler<HTMLSpanElement>
) {
  console.log(operations);
  return (
    <li className="flex justify-between w-full text-secondary">
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
      <span
        onClick={onEditClick}
        className="underline text-secondary cursor-pointer"
      >
        Edit
      </span>
    </li>
  );
}
export default function start() {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [modelInfo, setModelInfo] = useState<Model>(DEFAULT_MODEL_INFO);
  const [containsError, setContainsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedModelIndex, setEditedModelIndex] = useState(0);

  function addModel() {
    if (isEdit) {
      let editedModels = models.map((model, i) => {
        let editedModel = model;
        if (editedModelIndex == i) {
          editedModel = modelInfo;
        }
        return editedModel;
      });
      setModels(editedModels);
    } else {
      setModels([...models, modelInfo]);
    }
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
    if (!validateString(modelInfo.name)) {
      setContainsError(true);
      scrollToTop();
      return;
    } else {
      setContainsError(false);
      setIsEdit(false);
      addModel();
    }
  }
  function onNext() {
    if (!models.length) return;
    let store = getFromLocal();
    if (store) {
      store.models = models;
      saveInLocal(store);
      router.push("/wizard/fields-setup");
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <MainLayout>
      <div className="flex text-white flex-col items-center min-h-[100vh] justify-start w-full">
        <form onSubmit={onSubmit}>
          <div className="bg-gray_x p-7">
            <h1 className="text-[1.5rem] font-bold mt-7 text-secondary">
              Model Setup
            </h1>
            {containsError ? (
              <h4 className="text-red w-[22rem]">
                Input contains spaces, non-alphanumeric characters (except
                underscores), starts with a number, or includes SQL keywords.
              </h4>
            ) : null}

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
              <h1 className="text-[1.2rem] text-secondary font-bold mt-[4rem]">
                CRUD Operations
              </h1>
            </div>
            <div className="flex flex-col justify-between w-full">
              <Input
                inputContainerClassName="w-full mt-10 flex px-3"
                inputClassName="px-4 py-2 w-full text-[1.2rem]"
                labelClassName="font-bold"
                inputType="checkbox"
                checked={modelInfo.operations.CREATE}
                inputName="CREATE"
                onInputChange={handleModelCheckbox}
                inputLabel="Create"
              />
              <Input
                inputContainerClassName="w-full mt-10 flex px-3"
                inputClassName="px-4 py-2 w-full text-[1.2rem]"
                labelClassName="font-bold"
                inputType="checkbox"
                checked={modelInfo.operations.READ}
                inputName="READ"
                onInputChange={handleModelCheckbox}
                inputLabel="Read"
              />
              <Input
                inputContainerClassName="w-full mt-10 flex px-3"
                inputClassName="px-4 py-2 w-full text-[1.2rem]"
                labelClassName="font-bold"
                inputType="checkbox"
                checked={modelInfo.operations.UPDATE}
                inputName="UPDATE"
                onInputChange={handleModelCheckbox}
                inputLabel="Update"
              />
              <Input
                inputContainerClassName="w-full mt-10 flex px-3"
                inputClassName="px-4 py-2 w-full text-[1.2rem]"
                labelClassName="font-bold"
                inputType="checkbox"
                checked={modelInfo.operations.DELETE}
                inputName="DELETE"
                onInputChange={handleModelCheckbox}
                inputLabel="Delete"
              />
            </div>
            <Input
              inputValue={"Save Model"}
              inputContainerClassName="w-full mt-10 cursor-pointer"
              inputType="submit"
            />
          </div>

          <div className="bg-gray_x p-7 mt-[2rem]">
            <div className="flex justify-between w-full">
              <h1 className="text-[1.2rem] text-secondary font-bold mt-3">
                Models
              </h1>
            </div>
            <ul className="flex justify-between w-full flex-col mb-[2rem] min-w-[32rem]">
              {models.map((model, i) =>
                ModelRow(model, i, () => {
                  setIsEdit(true);
                  setEditedModelIndex(i);
                  setModelInfo(
                    models.find((model, index) => index == i) ||
                      DEFAULT_MODEL_INFO
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
