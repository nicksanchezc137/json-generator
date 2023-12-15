import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import MainLayout from "../../components/MainLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import {
  CONFIG_FILE_PATH_KEY,
  DEFAULT_STORE,
  GeneralObject,
  getStore,
  saveInLocal,
  validateString,
} from "../../utils/general.utils";

export default function ModelSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<GeneralObject>();
  const [containsError, setContainsError] = useState(false);
  const directoryInputRef = useRef<HTMLInputElement | null>(null);
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  useEffect(() => {
    let store = getStore();
    if (store) {
      console.log(store);
      const {
        db: { database, host, user, password },
        projectName,
      } = store;
      setFormData({
        database,
        host,
        user,
        password,
        projectName,
        path: localStorage.getItem(CONFIG_FILE_PATH_KEY),
      });
    }
  }, []);

  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    if (!validateValues()) {
      setContainsError(true);
      scrollToTop();
      return;
    } else {
      setContainsError(false);
    }
    const store = getStore();
    if (store) {
      store.db.database = formData?.database;
      store.db.host = formData?.host;
      store.db.user = formData?.user;
      store.db.password = formData?.password;
      store.projectName = formData?.projectName;
      saveInLocal(store);
      localStorage.setItem(CONFIG_FILE_PATH_KEY, formData?.path);
      router.push("/wizard/model-setup");
    }else{
      alert("An error occurred. Please reach us through Github Issues.")
    }
  }
  function validateValues() {
    let isValid = true;
    let formObj = formData || {};
    Object.keys(formObj).forEach((key) => {
      if (!validateString(formObj[key])) {
        isValid = false;
      }
    });
    return isValid;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center min-h-[100vh] justify-start w-full">
        <form onSubmit={onSubmit} className="bg-gray_x p-7">
          <h1 className="text-[1.5rem] font-bold mt-7 text-secondary">
            Project Setup
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
            inputType="text"
            inputValue={formData?.projectName || ""}
            inputName="projectName"
            onInputChange={onChange}
            inputLabel="Project Name"
          />
          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputType="text"
            inputName="path"
            inputValue={formData?.path || ""}
            onInputChange={onChange}
            inputLabel="Project Path"
          />
          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputLabel="DB HOST"
            inputName="host"
            inputValue={formData?.host || ""}
            onInputChange={onChange}
            inputPlaceholder="DB Host"
          />
          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputLabel="Database"
            inputName="database"
            inputValue={formData?.database || ""}
            onInputChange={onChange}
            inputPlaceholder="Database"
          />
          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputType="text"
            inputName="user"
            inputValue={formData?.user || ""}
            onInputChange={onChange}
            inputLabel="DB USERNAME"
            inputPlaceholder="DB USERNAME"
          />
          <Input
            inputContainerClassName="w-full mt-10"
            inputClassName="px-4 py-2 w-full text-[1.2rem]"
            labelClassName="font-bold"
            inputType="password"
            inputValue={formData?.password || ""}
            inputName="password"
            onInputChange={onChange}
            inputLabel="DB PASSWORD"
            inputPlaceholder="DB PASSWORD"
          />
          <Input
            inputValue={"Next"}
            inputContainerClassName="w-full mt-10"
            inputType="submit"
          />
        </form>
      </div>
    </MainLayout>
  );
}
