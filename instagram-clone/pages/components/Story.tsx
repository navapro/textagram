import React from "react";

const Story = ({ img, username }: { img: any; username: any }) => {
  return (
    <div>
      <img
        src={img}
        alt="profile image"
        className="h-14 w-14 
        p-[1.5px] rounded-full
         border-red-500 border-2
          object-contain cursor-pointer
          hover:scale-110 transition 
          transform duration-200 ease-out"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
