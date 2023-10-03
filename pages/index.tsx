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
      <div className="flex items-center justify-start flex-col w-full bg-primary min-h-[100vh] text-white">
        <h1 className="text-[2rem] font-bold mt-7">Welcome to Next-Gen</h1>

        <h2 className="mt-3 text-secondary font-bold text-[1.5rem]">
          Speed up development time by using Next-Gen{" "}
        </h2>
        <div className="mt-10 flex flex-wrap">
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
        <Button onButtonClick={()=>router.push("/wizard")} caption="Start"/>
      </div>
    </MainLayout>
  );
}
