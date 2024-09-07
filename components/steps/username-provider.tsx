import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { FormEvent } from "react";

import { CloudIcon, AtIcon, ErrorIcon } from "@/components/icons";
import { errorMessage } from "@/utils";

export default function UsernameProvider({
  serviceName,
  setServiceName,
  username,
  setUsername,
  onSubmit,
  errorHandler,
}: UsernameCardProps) {
  function someFieldIsEmpty() {
    let isEmpty = false;

    errorHandler.setMessageError(errorMessage.empty);
    if (!username.trim()) {
      errorHandler.setUsernameError(true);
      isEmpty = true;
    }

    if (!serviceName.trim()) {
      errorHandler.setServiceNameError(true);
      isEmpty = true;
    }

    return isEmpty;
  }

  function beforeOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (someFieldIsEmpty()) return;
    onSubmit();
  }

  function onChangeUsername(username: string) {
    errorHandler.setUsernameError(false);
    errorHandler.setMessageError("");
    setUsername(username);
  }

  function onChangeServiceName(serviceName: string) {
    errorHandler.setMessageError("");
    errorHandler.setServiceNameError(false);
    setServiceName(serviceName);
  }

  return (
    <Card>
      <CardBody className="p-5 h-[215px] flex justify-end">
        {errorHandler.messageError && (
          <div className="flex items-center justify-center">
            <div className="mr-1">
              <ErrorIcon color="#f76a6a" />
            </div>
            <span className="text-tiny text-red-400">
              {errorHandler.messageError}
            </span>
          </div>
        )}
        <form className="mt-3" onSubmit={(e) => beforeOnSubmit(e)}>
          <Input
            isInvalid={errorHandler.usernameError}
            labelPlacement="inside"
            placeholder="Username"
            startContent={<AtIcon />}
            type="text"
            value={username}
            onValueChange={onChangeUsername}
          />
          <Input
            isClearable
            className="mt-3"
            isInvalid={errorHandler.serviceNameError}
            labelPlacement="inside"
            placeholder="Service"
            startContent={<CloudIcon />}
            type="text"
            value={serviceName}
            onValueChange={onChangeServiceName}
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
  errorHandler: {
    usernameError: boolean;
    setUsernameError: (hasError: boolean) => void;
    serviceNameError: boolean;
    setServiceNameError: (hasError: boolean) => void;
    messageError: string;
    setMessageError: (message: string) => void;
  };
};
