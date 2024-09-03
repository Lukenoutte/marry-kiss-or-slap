import {Input} from "@nextui-org/input";
import {Card, CardBody} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import { CloudIcon, AtIcon } from "@/components/icons";

export default function Home() {
  const serviceName = "bsky.social"

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-md text-center justify-center">
        <h1 className="text-4xl">👰‍♀️🔪💋</h1>
        <Card className="mt-8">
          <CardBody className="p-4">
            <Input
              value={serviceName}
              type="text"
              placeholder="Service"
              labelPlacement="inside"
              startContent={
                <CloudIcon />
              }
            />
            <Input
              type="text"
              className="mt-3"
              placeholder="Username"
              labelPlacement="inside"
              startContent={
                <AtIcon />
              }
            />
            <Button 
              radius="full" 
              className="bg-gradient-to-tr from-blue-500 to-blue-800 text-white shadow-lg mt-4">
              Continue
            </Button>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
