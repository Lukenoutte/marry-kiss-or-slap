import { Card } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

import { UserType } from "@/types";

export default function PhraseCard({ user, phrase }: PhraseCardProps) {
  return (
    <div>
      <Card className="border-none px-4 py-4" radius="lg">
        <div className="flex justify-start">
          <User
            avatarProps={{
              src: user.avatar,
            }}
            className="mr-6 w-1/3 flex justify-start"
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
          <div className="border-l border-gray-300 pl-4">{phrase}</div>
        </div>
      </Card>
    </div>
  );
}

type PhraseCardProps = {
  user: UserType;
  phrase: string;
};
