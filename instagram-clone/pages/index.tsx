import type { NextPage } from "next";
import Head from "next/head";
import Fead from "./components/Fead";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { getSession } from "next-auth/react";
import requireAuthentication from "./utils/requireAuthentication";

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
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return requireAuthentication(session);
}
export default Home;
