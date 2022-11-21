import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";

import axios from "axios";
import { useSession } from "next-auth/react";
import { createPostInDataBase, getFileUrl } from "../utils/apiCalls";

const Modal = () => {
  const { data: session } = useSession() as any;
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const generateImage = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = (await axios.get("http://35.234.246.234/", {
        params: { prompt },
      })) as any;

      const fileUrl = await getFileUrl(data.filename);
      createPostInDataBase({
        image: fileUrl,
        caption: prompt,
        userName: session.user.username,
        userImg: session.user.image,
      });
      setLoading(false);
      setPrompt("");
      setOpen(false);
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
            }
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm: translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom
               bg-white rounded-lg px-4 pt-5 pb-4 text-left
               overflow-hidden shadow-xl transform transition-all
               sm:my-8 sm:align-middle sm:max-w-sm sm:w-full
               sm:p-6"
              >
                {" "}
                <label className="block mb-2 text-sm font-medium text-gray-90">
                  Prompt for AI
                </label>
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  type="text"
                  className="bg-gray-50 border ring-transparent border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p className="mt-2 text-sm text-gray-500 pb-5">
                  Please be as detailed as possible.
                </p>
                <button
                  onClick={() => generateImage()}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent
                  shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-800 
                  focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm
                  disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  {loading ? <>Creating Image...</> : <>Create Image</>}
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
