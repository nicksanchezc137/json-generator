import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import MainLayout from "../components/MainLayout";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="flex items-start justify-start flex-col w-full min-h-[100vh] text-secondary">
        <h1 className="text-[2.5rem] font-bold mt-3">Welcome to Next-Gen CMS</h1>

        <h2 className="font-bold text-[1.6rem]">
          Speed up development time by using Next-Gen{" "}
        </h2>

        <div className="mt-10 flex flex-col flex-wrap">
          <Card
            title={"Generate DB Schema"}
            content="Generate an entire Database schema based on your models and establish relationships with primary and foreign key constraints."
          />
          <Card
            title={"Generate REST API Endpoints"}
            content="Generate REST APIs for all your models with all CRUD operations."
          />{" "}
          <Card
            title={"Generate UI"}
            content="Generate an the UI to visualize all models and data."
          />
        </div>
        <Button buttonClassName="mt-7" onButtonClick={()=>router.push("/wizard")} caption="Start"/>
      </div>
    </MainLayout>
  );
}
