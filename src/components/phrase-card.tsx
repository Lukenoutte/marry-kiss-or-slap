import { Card } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

import { UserType } from "@/src/types";

export default function PhraseCard({ user, phrase }: PhraseCardProps) {
  return (
    <Card className="border-none px-4 py-4" radius="lg">
      <div className="flex flex-col lg:flex-row justify-start">
        <User
          avatarProps={{
            src: user.avatar,
          }}
          className="mr-6 flex justify-start"
          description={
            <Link
              isExternal
              href={`https://bsky.app/profile/${user.handle}`}
              size="sm"
            >
              {user.handle}
            </Link>
          }
          name={user.displayName}
        />
        <div className="flex text-start mt-3 pt-3 border-t lg:border-t-0 lg:mt-0 lg:border-l border-gray-300 lg:pl-4">
          {phrase(user.displayName)}
        </div>
      </div>
    </Card>
  );
}

type PhraseCardProps = {
  user: UserType;
  phrase: (user: string) => string;
};
