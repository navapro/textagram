import type { NextPage } from "next";
import Head from "next/head";
import Header from "./components/Header";
import Photos from "./components/Photos";
import TopProfile from "./components/TopProfile";
import { getSession } from "next-auth/react";
import requireAuthentication from "./utils/requireAuthentication";
import { getAllPosts } from "./utils/apiCalls";
import Posts from "./components/Posts";

const Home: NextPage = (props: any) => (
  <div className=" bg-gray-50 h-screen overflow-y-scroll">
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <TopProfile />
    <Photos />
  </div>
);
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return requireAuthentication(session);
}
export default Home;
