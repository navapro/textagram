import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../components/Header";

const signin = ({ providers }: any) => {
  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center 
      justify-center min-h-screen py-2 -mt-56 px-14
       text-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
          alt="logo"
          className="w-80"
        />
        <p className="font-xs italic">
          This is not a REAL app, I built it as a project
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};

export default signin;
