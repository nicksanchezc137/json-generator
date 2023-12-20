import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import { CONFIG_FILE_PATH_KEY, Model, NEXT_JSON, getStore, handleRequest } from "../../utils/general.utils";

const TableRow = ({ name, fields, belongsTo }: Model) => {
  return (
    <tr>
      <td className="border border-secondary h-auto p-5">{name}</td>
      <td className="border border-secondary h-auto p-5">
        <ul className="flex flex-col flex-grow">
          {fields.map(({ name }) => (
            <li>{name}</li>
          ))}
        </ul>
      </td>
      <td className="flex flex-col border border-secondary h-auto p-5">
        {" "}
        <ul className="flex-grow">
          {belongsTo.map((modelName) => (
            <li>{modelName}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};
export default function verify() {
  
  const [store, setStore] = useState<NEXT_JSON>();
  useEffect(() => {
    const store = getStore();
    if (store) {
      setStore(store);
    }
  }, []);
 function  generateProject(){
    handleRequest("/projects","POST",{
      path:localStorage.getItem(CONFIG_FILE_PATH_KEY),
      json:store
    }).then((res)=>{
      alert(`Generation complete. To get started run cd ${localStorage.getItem(CONFIG_FILE_PATH_KEY)}/${getStore()?.projectName} && npm run dev`)
    })
  }
  return (
    <MainLayout>
      <div className="flex flex-col items-start min-h-[100vh] justify-start w-full text-secondary">
        <h1 className="text-[2rem] font-bold mt-7 text-left block">Verify</h1>

        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left border border-gray">Model</th>
              <th className="text-left border border-gray">Fields</th>
              <th className="text-left border border-gray">Belongs To</th>
            </tr>
          </thead>
          <tbody>{store?.models.map((model) => TableRow(model))}</tbody>
        </table>
        <Button
          buttonClassName="self-end mt-7"
          onButtonClick={() => generateProject()}
          caption="Generate Project"
        />
      </div>
    </MainLayout>
  );
}
