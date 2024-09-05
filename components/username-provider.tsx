"use client";

import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { CloudIcon, AtIcon } from "@/components/icons";

export default function UsernameProvider(props: UsernameCardProps) {
  return (
    <Card>
      <CardBody className="p-5">
        <form onSubmit={props.onSubmit}>
          <Input
            labelPlacement="inside"
            placeholder="Username"
            startContent={<AtIcon />}
            type="text"
            value={props.username}
            onValueChange={props.setUsername}
          />
          <Input
            className="mt-3"
            labelPlacement="inside"
            placeholder="Service"
            startContent={<CloudIcon />}
            type="text"
            value={props.serviceName}
            onValueChange={props.setServiceName}
          />
          <Button
            className="w-full bg-gradient-to-tr from-[#0072F5] to-[#5EA2EF] text-white shadow-lg mt-4"
            color="primary"
            radius="full"
            type="submit"
            variant="shadow"
          >
            Continue
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

type UsernameCardProps = {
  serviceName: string;
  setServiceName: (name: string) => void;
  username: string;
  setUsername: (name: string) => void;
  onSubmit: () => void;
};
