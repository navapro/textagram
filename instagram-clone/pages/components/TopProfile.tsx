/* eslint-disable jsx-a11y/img-redundant-alt */
import { FlowLog } from "aws-cdk-lib/aws-ec2";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";

export default function Header() {
  const { data: session } = useSession() as any;
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = true;
  const following = [1];

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`${"fullName"} profile picture`}
          src={session.user.image}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{session.user.username}</p>
          <button
            className="bg-blue-400 font-bold text-sm rounded text-white w-20 h-8"
            type="button"
            onClick={handleToggleFollow}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleFollow();
              }
            }}
          >
            {isFollowingProfile ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="container flex mt-4">
          <>
            <p className="mr-10">
              <span className="font-bold">{0}</span>
              {" followers"}
            </p>
            <p className="mr-10">
              <span className="font-bold">{0}</span> following
            </p>
          </>
        </div>
        <div className="container mt-4">
          <p className="font-medium">{session.user.name}</p>
        </div>
      </div>
    </div>
  );
}
