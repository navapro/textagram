import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "./components/Header";
import Fead from "./components/Fead";
import Modal from "./components/Modal";

const Home: NextPage = () => (
  <div className=" bg-gray-50 h-screen overflow-y-scroll">
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Fead />
    <Modal />
  </div>
);

export default Home;
