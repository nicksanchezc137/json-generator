import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  Field,
  Model,
  NEXT_JSON,
  getFromLocal,
  saveInLocal,
} from "../../utils/general.utils";
import MultiSelectInput, { Option } from "../../components/MultiSelectInput";

//type FieldInfo = { name: string; isAlias: boolean; type: string, visibleOnList:boolean };

const DEFAULT_MODEL_INFO = {
  name: "",
  operations: { create: true, read: true, update: true, delete: true },
  fields: [],
  includeTimeStamps: true,
  belongsTo: [],
};

function ModelRow(
  models: Model[],
  { name, fields, operations }: Model,
  index: number,
  onChange: Function
) {
  return (
    <li className="flex justify-between w-full mt-10">
      <span className="mr-5">{index + 1}.</span>
      <span className="font-bold mr-7">{name}</span>
      <span>
        <MultiSelectInput
          onChange={onChange}
          options={models
            .filter((model) => model.name !== name)
            .map(({ name }) => {
              return {
                name,
                id: name,
              };
            })}
        />
      </span>
    </li>
  );
}
export default function start() {
  const router = useRouter();
  const [store, setStore] = useState<NEXT_JSON>();

  useEffect(() => {
    const store = getFromLocal();
    if (store) {
      setStore(store);
    }
  }, []);

  function onNext() {
    if (store) {
      saveInLocal(store);
      router.push("/wizard/verify");
    }
  }
  function addModelRelationship(
    modelName: string,
    selectedRelationshipOptions: Option[]
  ) {
    let storeCopy = { ...store };
    if (storeCopy) {
      storeCopy.models = storeCopy.models?.map((model) => {
        if (model.name == modelName) {
          model.belongsTo = selectedRelationshipOptions.map(
            (relationship) => relationship.name
          );
        }
        return model;
      });
      setStore(storeCopy as NEXT_JSON);
    }
  }
  return (
    <MainLayout>
      <div className="flex text-white flex-col items-center min-h-[100vh] justify-start w-full">
        <form>
          <h1 className="text-[2rem] font-bold mt-7 text-secondary">
            Relationships Setup
          </h1>

          <div className="flex justify-between w-full">
            <h1 className="text-[1.5rem] text-secondary font-bold mt-[4rem]">
              Models
            </h1>
          </div>
          <ul className="flex justify-between w-full flex-col mb-[2rem]">
            {store?.models.map((model, i) =>
              ModelRow(store?.models, model, i, (selectedList: Option[]) =>
                addModelRelationship(model.name, selectedList)
              )
            )}
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
