"use client";

import {Input} from "@nextui-org/input";
import {Card, CardBody} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import { CloudIcon, AtIcon } from "@/components/icons";

export default function UsernameCard(props: UsernameCardProps) {

  return (
    <Card>
        <CardBody className="p-4">
        <Input
            value={props.serviceName}
            onValueChange={props.setServiceName}
            type="text"
            placeholder="Service"
            labelPlacement="inside"
            startContent={
            <CloudIcon />
            }
        />
        <Input
            value={props.username}
            onValueChange={props.setUsername}
            type="text"
            className="mt-3"
            placeholder="Username"
            labelPlacement="inside"
            startContent={
            <AtIcon />
            }
        />
            <Button
                onClick={props.onClickContinue}
                radius="full"
                className="w-full bg-gradient-to-tr from-[#0072F5] to-[#5EA2EF] text-white shadow-lg mt-4">
                Continue
            </Button>
        </CardBody>
    </Card>
  );
}

type UsernameCardProps = {
    serviceName: string,
    setServiceName: (name: string) => void,
    username: string,
    setUsername: (name: string) => void,
    onClickContinue: () => void
}