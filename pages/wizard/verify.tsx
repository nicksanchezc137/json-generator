import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import { Model, NEXT_JSON, getFromLocal } from "../../utils/general.utils";

const TableRow = ({ name, fields, belongsTo }: Model) => {
  return (
    <tr>
      <td className="border border-white h-auto p-5">{name}</td>
      <td className="border border-white h-auto p-5">
        <ul className="flex flex-col flex-grow">
          {fields.map(({ name }) => (
            <li>{name}</li>
          ))}
        </ul>
      </td>
      <td className="flex flex-col border border-white h-auto p-5">
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
  const router = useRouter();
  const [store, setStore] = useState<NEXT_JSON>();
  useEffect(() => {
    const store = getFromLocal();
    if (store) {
      setStore(store);
    }
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col items-center min-h-[100vh] justify-start w-full">
        <h1 className="text-[2rem] font-bold mt-7 text-white text-left block">Verify</h1>

        <table className="text-white w-full table-auto">
          <thead>
            <tr>
              <th className="text-left border border-white">Model</th>
              <th className="text-left border border-white">Fields</th>
              <th className="text-left border border-white">Belongs To</th>
            </tr>
          </thead>
          <tbody>{store?.models.map((model) => TableRow(model))}</tbody>
        </table>
        <Button
          buttonClassName="self-end mt-7"
          onButtonClick={() => router.push("/wizard/verify")}
          caption="Generate Project"
        />
      </div>
    </MainLayout>
  );
}
