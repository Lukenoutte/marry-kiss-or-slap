import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

export default function CardSkeleton() {
  return (
    <Card className="w-[265px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[200px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
}
