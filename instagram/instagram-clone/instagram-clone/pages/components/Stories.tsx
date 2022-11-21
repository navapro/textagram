import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState([] as any);
  const { data: session } = useSession() as any;
  useEffect(() => {
    const fakeSuggestions = [...Array(20)].map((_, i) => ({
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
    <div
      className="flex space-x-2 p-6 bg-white mt-8
     border-gray-200 border rounded-sm overflow-x-scroll
     scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile: any) => {
        return (
          <Story
            key={profile._id}
            img={profile.avatar}
            username={profile.firstName + profile.lastName}
          />
        );
      })}
    </div>
  );
}

export default Stories;
