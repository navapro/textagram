import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const Suggessions = () => {
  const [suggestions, setSuggestions] = useState([] as any);

  useEffect(() => {
    const fakeSuggestions = [...Array(5)].map((_, i) => ({
      _id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }));
    setSuggestions(fakeSuggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3
          className="text-sm font-bold
         text-gray-400"
        >
          suggestions for you
        </h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {suggestions.map((profile: any) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt=""
          />
          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold">
              {profile.firstName + profile.lastName}
            </h2>
          </div>
          <button className="text-blue-400 text-s">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggessions;
