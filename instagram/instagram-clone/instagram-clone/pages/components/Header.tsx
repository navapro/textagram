import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://tinyurl.com/mr2hhsvn"
            layout="fill"
            alt="instagram logo"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden flex-shrink-0 w-10 cursor-pointer"
        >
          <Image
            src="https://tinyurl.com/bddt4kyp"
            layout="fill"
            alt="instagram logo"
            objectFit="contain"
          />
        </div>
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 
        sm:text-sm border-gray-300 rounded-md
         focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          {session ? (
            <>
              {/* Right */}

              <HomeIcon onClick={() => router.push("/")} className="navBtn" />
              <MenuIcon className="h-6 md:hidden cursor-pointer" />
              <PaperAirplaneIcon className="navBtn rotate-45" />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut as any}
                src={session?.user?.image || ""}
                alt="profile pic"
                className="rounded-full cursor-pointer h-10"
              />
            </>
          ) : (
            <button onClick={signIn as any}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;